import Link from "next/link";
import { products, site } from "@/config/site";
import { fill, getDictionary, getLocale } from "@/i18n/dictionaries";

const productAccent = {
  business: "bg-brand-red",
  personal: "bg-brand-blue",
  entrepreneur: "bg-brand-red-dark",
} as const;

export default async function HomePage() {
  const dict = await getDictionary();
  const lang = await getLocale();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-blue text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-red/25 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {dict.hero.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {dict.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-white/80">
              {fill(dict.hero.subtitle)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/apply`}
                className="rounded-full bg-brand-red px-6 py-3 font-semibold text-white shadow-lg shadow-black/20 hover:bg-brand-red-dark"
              >
                {dict.hero.cta}
              </Link>
              <Link
                href={`/${lang}#products`}
                className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                {dict.hero.secondary}
              </Link>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {dict.hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                <dt className="text-sm text-white/70">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight">{fill(stat.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading title={dict.products.title} subtitle={dict.products.subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((key) => {
            const item = dict.products.items[key];
            return (
              <article
                key={key}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span aria-hidden className={`mb-5 h-1.5 w-12 rounded-full ${productAccent[key]}`} />
                <h3 className="text-xl font-bold text-brand-blue">{item.name}</h3>
                <p className="mt-3 flex-1 text-muted">{item.description}</p>
                <Link
                  href={`/${lang}/apply?product=${key}`}
                  className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-red hover:text-brand-red-dark"
                >
                  {dict.products.cta} <span aria-hidden>→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionHeading title={dict.how.title} />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.how.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
                <span className="grid size-10 place-items-center rounded-full bg-brand-blue-soft font-bold text-brand-blue">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{fill(step.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading title={dict.requirements.title} subtitle={dict.requirements.subtitle} align="left" />
          <ul className="grid gap-3">
            {dict.requirements.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-line p-4">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-red-soft text-sm font-bold text-brand-red"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <SectionHeading title={dict.faq.title} />
          <div className="mt-10 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
            {dict.faq.items.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden className="text-brand-red transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted">{fill(item.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading title={dict.contact.title} subtitle={dict.contact.subtitle} />
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <ContactItem label={dict.contact.phone}>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-red">
              {site.phone}
            </a>
          </ContactItem>
          <ContactItem label={dict.contact.whatsapp}>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:text-brand-red-dark"
            >
              {dict.contact.whatsappCta}
            </a>
          </ContactItem>
          <ContactItem label={dict.contact.email}>
            <a href={`mailto:${site.email}`} className="break-all hover:text-brand-red">
              {site.email}
            </a>
          </ContactItem>
          <ContactItem label={dict.contact.address}>{site.address}</ContactItem>
          <ContactItem label={dict.contact.hours}>{site.hours[lang]}</ContactItem>
        </dl>
      </section>

      {/* Final call to action */}
      <section className="bg-brand-red">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-2xl font-bold tracking-tight">{dict.hero.title}</p>
          <Link
            href={`/${lang}/apply`}
            className="rounded-full bg-white px-6 py-3 font-semibold text-brand-red hover:bg-brand-red-soft"
          >
            {dict.hero.cta}
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-pretty text-lg text-muted">{subtitle}</p> : null}
    </div>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-2 font-medium text-ink">{children}</dd>
    </div>
  );
}
