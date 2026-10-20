import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site, whatsappLink } from "@/config/site";

const productKeys = ["business", "salary", "emergency"] as const;
const productIcons = ["🏪", "💼", "⚡"];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

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
          <dl className="grid grid-cols-3 gap-3 self-end md:grid-cols-1">
            {dict.hero.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-4 text-brand-blue shadow-lg md:p-5">
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
            {dict.products.items.map((p, i) => (
              <article
                key={p.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span aria-hidden className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-sky text-2xl">
                  {productIcons[i]}
                </span>
                <h3 className="text-xl font-bold text-brand-blue">{p.name}</h3>
                <p className="mt-2 flex-1 text-muted">{p.description}</p>
                <Link
                  href={`/${lang}/apply?product=${productKeys[i]}`}
                  className="mt-6 font-semibold text-brand-red hover:underline"
                >
                  {dict.products.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 bg-brand-sky px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold text-brand-blue">{dict.how.title}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {dict.how.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-red font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold text-brand-blue">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
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
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactItem label={dict.contact.phone}>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-red">
                {site.phone}
              </a>
            </ContactItem>
            <ContactItem label={dict.contact.whatsapp}>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">
                {site.phone}
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
