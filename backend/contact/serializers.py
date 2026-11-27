from rest_framework import serializers

from .models import ContactRequest
from .poles import POLE_SLUGS


class ContactRequestSerializer(serializers.ModelSerializer):
    poles = serializers.ListField(
        child=serializers.ChoiceField(choices=POLE_SLUGS), required=False, max_length=len(POLE_SLUGS)
    )
    message = serializers.CharField(min_length=20, max_length=5000, trim_whitespace=True)
    locale = serializers.ChoiceField(choices=["fr", "en"], default="fr")
    # Honeypot: hidden in the form, real people leave it empty.
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactRequest
        fields = ["name", "email", "organisation", "poles", "message", "locale", "website"]
        extra_kwargs = {"organisation": {"required": False, "allow_blank": True}}

    def validate_poles(self, value):
        return list(dict.fromkeys(value))  # drop duplicates, keep order

    def create(self, validated_data):
        validated_data.pop("website", None)
        return super().create(validated_data)
