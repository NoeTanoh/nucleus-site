from django.contrib import admin

from .models import ContactRequest


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("created_at", "name", "email", "organisation", "status", "locale")
    list_filter = ("status", "locale", "created_at")
    search_fields = ("name", "email", "organisation", "message")
    list_editable = ("status",)
    readonly_fields = ("name", "email", "organisation", "poles", "message", "locale", "created_at")
    date_hierarchy = "created_at"
