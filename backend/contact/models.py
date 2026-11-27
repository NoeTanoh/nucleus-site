from django.db import models


class ContactRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Nouveau"
        IN_PROGRESS = "in_progress", "En cours"
        CLOSED = "closed", "Clôturé"

    name = models.CharField("nom", max_length=120)
    email = models.EmailField("e-mail")
    organisation = models.CharField("organisation", max_length=160, blank=True)
    poles = models.JSONField("pôles concernés", default=list, blank=True)
    message = models.TextField("message")
    locale = models.CharField("langue", max_length=2, default="fr")
    status = models.CharField("statut", max_length=20, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField("reçu le", auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "demande de contact"
        verbose_name_plural = "demandes de contact"

    def __str__(self) -> str:
        return f"{self.name} <{self.email}>"
