export function ContactBlock({ t }: { t: { title: string; body: string; pending: string } }) {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="section-title">
          {t.title}
        </h2>
        <p>{t.body}</p>
        <p className="pending">{t.pending}</p>
      </div>
    </section>
  );
}
