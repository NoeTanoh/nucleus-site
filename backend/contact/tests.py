from django.core import mail
from django.core.cache import cache
from django.test import override_settings
from django.urls import reverse
from rest_framework.test import APITestCase

from .models import ContactRequest

URL = "/api/contact/"


def payload(**over):
    data = {
        "name": "Awa Koné",
        "email": "awa@example.org",
        "organisation": "Projet test",
        "poles": ["statistics-data-analytics", "training-capacity-building"],
        "message": "Nous cherchons un appui pour analyser une enquête de terrain.",
        "locale": "fr",
        "website": "",
    }
    data.update(over)
    return data


class ContactApiTests(APITestCase):
    def setUp(self):
        cache.clear()

    def test_valid_request_is_stored(self):
        res = self.client.post(URL, payload(), format="json")
        self.assertEqual(res.status_code, 201, res.data)
        self.assertEqual(res.data, {"ok": True})
        obj = ContactRequest.objects.get()
        self.assertEqual(obj.email, "awa@example.org")
        self.assertEqual(obj.poles, ["statistics-data-analytics", "training-capacity-building"])
        self.assertEqual(obj.locale, "fr")

    def test_organisation_and_poles_are_optional(self):
        res = self.client.post(URL, payload(organisation="", poles=[]), format="json")
        self.assertEqual(res.status_code, 201, res.data)

    def test_missing_required_fields_are_rejected(self):
        res = self.client.post(URL, {"locale": "fr"}, format="json")
        self.assertEqual(res.status_code, 400)
        for field in ("name", "email", "message"):
            self.assertIn(field, res.data)
        self.assertFalse(ContactRequest.objects.exists())

    def test_invalid_email_is_rejected(self):
        res = self.client.post(URL, payload(email="not-an-email"), format="json")
        self.assertEqual(res.status_code, 400)
        self.assertIn("email", res.data)

    def test_unknown_pole_is_rejected(self):
        res = self.client.post(URL, payload(poles=["astrology"]), format="json")
        self.assertEqual(res.status_code, 400)
        self.assertIn("poles", res.data)

    def test_duplicate_poles_are_collapsed(self):
        res = self.client.post(
            URL, payload(poles=["training-capacity-building", "training-capacity-building"]), format="json"
        )
        self.assertEqual(res.status_code, 201)
        self.assertEqual(ContactRequest.objects.get().poles, ["training-capacity-building"])

    def test_too_short_message_is_rejected(self):
        res = self.client.post(URL, payload(message="Bonjour"), format="json")
        self.assertEqual(res.status_code, 400)
        self.assertIn("message", res.data)

    def test_too_long_message_is_rejected(self):
        res = self.client.post(URL, payload(message="x" * 5001), format="json")
        self.assertEqual(res.status_code, 400)

    def test_unknown_locale_is_rejected(self):
        res = self.client.post(URL, payload(locale="de"), format="json")
        self.assertEqual(res.status_code, 400)

    def test_honeypot_returns_success_but_stores_nothing(self):
        res = self.client.post(URL, payload(website="http://spam.example"), format="json")
        self.assertEqual(res.status_code, 201)
        self.assertFalse(ContactRequest.objects.exists())

    def test_get_is_not_allowed(self):
        self.assertEqual(self.client.get(URL).status_code, 405)

    @override_settings(CONTACT_NOTIFY_EMAILS=["team@example.org"])
    def test_notification_email_is_sent_when_configured(self):
        self.client.post(URL, payload(), format="json")
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("Awa Koné", mail.outbox[0].subject)
        self.assertEqual(mail.outbox[0].reply_to, ["awa@example.org"])

    def test_no_email_without_recipients(self):
        self.client.post(URL, payload(), format="json")
        self.assertEqual(len(mail.outbox), 0)

    def test_rate_limit(self):
        codes = [self.client.post(URL, payload(), format="json").status_code for _ in range(6)]
        self.assertEqual(codes[:5], [201] * 5)
        self.assertEqual(codes[5], 429)


class HealthTests(APITestCase):
    def test_health(self):
        res = self.client.get(reverse("health"))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), {"status": "ok"})
