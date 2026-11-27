"use client";

import { useId, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type State = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({
  lang,
  t,
  poles,
  preselect,
}: {
  lang: Locale;
  t: Dict["contact"]["form"];
  poles: { slug: string; label: string }[];
  preselect?: string;
}) {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) e.name = t.required;
    if (!email) e.email = t.required;
    else if (!EMAIL.test(email)) e.email = t.badEmail;
    if (!message) e.message = t.required;
    else if (message.length < 20) e.message = t.tooShort;
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const local = validate(data);
    setErrors(local);
    if (Object.keys(local).length) {
      setStatus(t.invalid);
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setState("sending");
    setStatus(t.sending);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          organisation: String(data.get("organisation") ?? "").trim(),
          poles: data.getAll("poles").map(String),
          message: String(data.get("message")).trim(),
          locale: lang,
          website: String(data.get("website") ?? ""),
        }),
      });
      if (res.status === 201) {
        setState("sent");
        setStatus(t.sent);
        form.reset();
        return;
      }
      if (res.status === 400) {
        const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
        const server: Errors = {};
        if (body.name) server.name = t.required;
        if (body.email) server.email = t.badEmail;
        if (body.message) server.message = t.tooShort;
        setErrors(server);
        setState("error");
        setStatus(t.invalid);
        return;
      }
      setState("error");
      setStatus(res.status === 429 ? t.rateLimited : t.failed);
    } catch {
      setState("error");
      setStatus(t.failed);
    }
  }

  if (state === "sent") {
    return (
      <div className="contact-form contact-sent" role="status">
        <p>{t.sent}</p>
        <button type="button" className="button button-ink" onClick={() => setState("idle")}>
          {t.another}
        </button>
      </div>
    );
  }

  const field = (name: Field, label: string, input: React.ReactNode, hint?: string) => (
    <div className="field" data-invalid={!!errors[name]}>
      <label htmlFor={`${id}-${name}`}>{label}</label>
      {input}
      {(errors[name] || hint) && (
        <span id={`${id}-${name}-msg`} className="field-msg">
          {errors[name] ?? hint}
        </span>
      )}
    </div>
  );
  const aria = (name: Field, hasHint = false) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] || hasHint ? `${id}-${name}-msg` : undefined,
  });

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        {field("name", t.name, <input {...aria("name")} autoComplete="name" maxLength={120} required />)}
        {field(
          "email",
          t.email,
          <input {...aria("email")} type="email" autoComplete="email" maxLength={254} required />,
        )}
      </div>
      <div className="field">
        <label htmlFor={`${id}-organisation`}>{t.organisation}</label>
        <input id={`${id}-organisation`} name="organisation" autoComplete="organization" maxLength={160} />
      </div>
      <fieldset className="field">
        <legend>{t.poles}</legend>
        <div className="chips">
          {poles.map((p) => (
            <label key={p.slug} className="chip">
              <input type="checkbox" name="poles" value={p.slug} defaultChecked={p.slug === preselect} />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {field(
        "message",
        t.message,
        <textarea {...aria("message", true)} rows={5} minLength={20} maxLength={5000} required />,
        t.messageHint,
      )}
      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-foot">
        <button type="submit" className="button button-ink" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.submit}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {state !== "idle" || Object.keys(errors).length ? status : ""}
        </p>
      </div>
    </form>
  );
}
