import logging

from django.conf import settings
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .serializers import ContactRequestSerializer

log = logging.getLogger(__name__)


class ContactThrottle(AnonRateThrottle):
    scope = "contact"


class ContactCreateView(APIView):
    """POST /api/contact/ — store a contact request and notify the team."""

    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.validated_data.get("website"):
            log.info("Contact honeypot triggered; request discarded.")
            return Response({"ok": True}, status=status.HTTP_201_CREATED)

        obj = serializer.save()
        notify(obj)
        return Response({"ok": True}, status=status.HTTP_201_CREATED)


def notify(obj) -> None:
    recipients = settings.CONTACT_NOTIFY_EMAILS
    if not recipients:
        return
    body = "\n".join(
        [
            f"Nom : {obj.name}",
            f"E-mail : {obj.email}",
            f"Organisation : {obj.organisation or '—'}",
            f"Pôles : {', '.join(obj.poles) or '—'}",
            f"Langue : {obj.locale}",
            "",
            obj.message,
        ]
    )
    try:
        EmailMessage(
            subject=f"[NUCLÉUS] Nouvelle demande de {obj.name}",
            body=body,
            to=recipients,
            reply_to=[obj.email],
        ).send()
    except Exception:  # the request is saved; a mail outage must not fail the form
        log.exception("Could not send contact notification for request %s", obj.pk)


@require_GET
def health(request):
    return JsonResponse({"status": "ok"})
