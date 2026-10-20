import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site, telHref, whatsappLink } from "@/config/site";


export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const L = dict.products.labels;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-blue text-white">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/90 blur-0 md:-right-10"
          style={{ clipPath: "circle(50%)" }}
        />
        <div aria-hidden className="absolute -right-40 top-40 h-72 w-72 rounded-full border-[40px] border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
              {dict.hero.eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {dict.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/apply`} className="btn-red">
                {dict.hero.primary}
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
                {dict.hero.secondary}
              </a>
            </div>
          </div>
          <dl className="grid gap-3 self-end sm:grid-cols-3 md:grid-cols-1">
            {dict.hero.stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 text-brand-blue shadow-lg sm:block md:p-5">
                <dt className="text-xs font-medium text-muted md:text-sm">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-brand-red md:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold text-brand-blue">{dict.products.title}</h2>
          <p className="mt-2 text-muted">{dict.products.subtitle}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {dict.products.items.map((p) => (
              <article
                key={p.key}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-brand-blue">{p.name}</h3>
                <p className="mt-2 text-muted">{p.description}</p>
                <div className="mt-5 rounded-xl bg-brand-sky p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{L.rate}</p>
                  <p className="text-3xl font-extrabold text-brand-red">
                    {p.rate} <span className="text-sm font-semibold text-muted">{L.perMonth}</span>
                  </p>
                  {p.amount && (
                    <p className="mt-2 text-sm text-ink">
                      <span className="text-muted">{L.amount}: </span>
                      <strong>{p.amount}</strong>
                    </p>
                  )}
                  <p className="mt-1 text-sm text-ink">
                    <span className="text-muted">{L.guarantee}: </span>
                    <strong>{dict.products.guarantee}</strong>
                  </p>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">{L.documents}</p>
                <ul className="mt-2 flex-1 space-y-1.5 text-sm text-ink">
                  {p.docs.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden className="font-bold text-brand-red">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <Link href={`/${lang}/apply?product=${p.key}`} className="btn-red mt-6">
                  {dict.products.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + how it works */}
      <section id="how" className="scroll-mt-20 bg-brand-sky px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue">{dict.how.title}</h2>
            <p className="mt-2 text-muted">{dict.how.subtitle}</p>
            <ul className="mt-6 space-y-3">
              {dict.how.requirements.map((r) => (
                <li key={r} className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold text-brand-blue shadow-sm">
                  <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-red text-sm text-white">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue">{dict.how.stepsTitle}</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {dict.how.steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-blue font-bold text-white">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-brand-blue">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue">{dict.about.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{dict.about.text}</p>
          </div>
          <div aria-hidden className="relative h-64 overflow-hidden rounded-3xl bg-brand-blue">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-red" />
            <div className="absolute inset-y-0 left-1/3 w-1/3 bg-white" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="rounded-2xl bg-white px-6 py-4 text-4xl font-extrabold text-brand-blue shadow-xl">
                NRP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-brand-sky px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold text-brand-blue">{dict.contact.title}</h2>
          <p className="mt-2 text-muted">{dict.contact.subtitle}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactItem label={dict.contact.phone}>
              {site.phones.map((ph) => (
                <a key={ph} href={telHref(ph)} className="block hover:text-brand-red">
                  {ph}
                </a>
              ))}
            </ContactItem>
            <ContactItem label={dict.contact.whatsapp}>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">
                {site.phones[0]}
              </a>
            </ContactItem>
            <ContactItem label={dict.contact.email}>
              <a href={`mailto:${site.email}`} className="break-all hover:text-brand-red">
                {site.email}
              </a>
            </ContactItem>
            <ContactItem label={dict.contact.address}>
              {site.address}
              <span className="mt-1 block text-sm font-normal text-muted">{site.hours[lang]}</span>
            </ContactItem>
          </dl>
        </div>
      </section>
    </>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 font-semibold text-brand-blue">{children}</dd>
    </div>
  );
}
