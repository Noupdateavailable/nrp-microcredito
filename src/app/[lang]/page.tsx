import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site, telHref, whatsappLink } from "@/config/site";
import { productOrder } from "@/config/loans";
import type { Product } from "@/lib/loan-schema";
import { Simulator, SimulateLink } from "@/components/simulator";
import { ContactForm } from "@/components/contact-form";
import { CheckIcon, ClockIcon, GrowthIcon, MailIcon, PersonIcon, PhoneIcon, PinIcon, StoreIcon } from "@/components/icons";

const productIcon: Record<Product, { Icon: typeof PersonIcon; bg: string }> = {
  personal: { Icon: PersonIcon, bg: "bg-brand-red" },
  business: { Icon: StoreIcon, bg: "bg-brand-blue" },
  entrepreneur: { Icon: GrowthIcon, bg: "bg-brand-blue-mid" },
};

// Shared section shell: 1200px column, 24px gutter, 96/72/56px vertical rhythm.
const sec = "mx-auto max-w-[1200px] px-6 py-14 sm:py-[72px] lg:py-24";
const h2 = "m-0 text-[28px] leading-[1.15] font-extrabold text-brand-blue sm:text-[34px] lg:text-[40px]";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { hero, products: pr, how, requirements: rq, about, trust, contact, talk } = dict;
  const names = Object.fromEntries(pr.items.map((p) => [p.key, p.short])) as Record<Product, string>;
  const items = productOrder.map((k) => pr.items.find((p) => p.key === k)!);

  return (
    <>
      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden bg-brand-blue text-white">
        <div aria-hidden className="nrp-float-a absolute -top-[100px] -right-[100px] h-[220px] w-[220px] rounded-full bg-brand-red opacity-90 sm:h-80 sm:w-80 lg:-top-[120px] lg:-right-[120px] lg:h-[420px] lg:w-[420px]" />
        <div aria-hidden className="nrp-float-b absolute right-[120px] -bottom-40 hidden h-[280px] w-[280px] rounded-full border-[40px] border-brand-blue-mid sm:block" />
        <div aria-hidden className="nrp-float-c absolute bottom-8 left-6 hidden h-[154px] w-[220px] bg-[radial-gradient(rgba(255,255,255,0.22)_1.6px,transparent_1.8px)] bg-[length:22px_22px] sm:block" />
        <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-8 px-6 pt-10 pb-14 sm:gap-12 sm:pt-16 sm:pb-[72px] lg:pt-[88px] lg:pb-24">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
            <span className="nrp-in nrp-d1 flex items-center gap-2.5 self-start rounded-full bg-white px-3.5 py-2 text-sm font-bold text-brand-red">
              <span aria-hidden className="nrp-ping inline-block h-2 w-2 rounded-full bg-brand-red" />
              {hero.badge}
            </span>
            <h1 className="nrp-in nrp-d2 m-0 text-4xl leading-[1.08] font-extrabold tracking-[-0.5px] sm:text-[46px] lg:text-[56px] lg:tracking-[-1px]">
              {hero.titleStart} <span className="nrp-underline">{hero.titleHighlight}</span>
            </h1>
            <p className="nrp-in nrp-d3 m-0 max-w-[540px] text-[17px] leading-[1.55] text-mist sm:text-xl">{hero.subtitle}</p>
            <div className="nrp-in nrp-d4 flex flex-wrap gap-3.5">
              <a href="#pedido" className="nrp-btn flex-[1_1_100%] rounded-full bg-brand-red px-7 py-4 text-center text-[17px] font-bold text-white no-underline hover:text-white sm:flex-none">
                {hero.primary}
              </a>
              <a href="#como-funciona" className="nrp-btn nrp-btn-ghost flex-[1_1_100%] rounded-full border-2 border-white px-[26px] py-3.5 text-center text-[17px] font-bold text-white no-underline hover:text-white sm:flex-none">
                {hero.secondary}
              </a>
            </div>
            <dl className="nrp-in nrp-d5 m-0 flex flex-wrap gap-x-8 gap-y-4 pt-3">
              {hero.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-sm text-mist">{s.label}</dt>
                  <dd className="m-0 text-[22px] font-extrabold sm:text-[26px]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="pedido" className="nrp-pop min-w-0 flex-[1_1_380px] scroll-mt-4 rounded-[18px] bg-white p-[22px] text-ink shadow-[0_24px_60px_rgba(4,18,48,0.35)] sm:rounded-[20px] sm:p-8 lg:max-w-[460px]">
            <Simulator lang={lang} t={dict.sim} names={names} />
          </div>
        </div>
      </section>

      {/* Moving ticker */}
      <div className="nrp-marquee overflow-hidden border-b border-line bg-white py-[22px]">
        <div className="nrp-marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex items-center gap-7 pr-7 text-[17px] font-extrabold whitespace-nowrap text-brand-blue sm:gap-10 sm:pr-10 sm:text-[22px]"
            >
              {dict.ticker.map((item) => (
                <span key={item} className="flex items-center gap-7 sm:gap-10">
                  <span>{item}</span>
                  <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-brand-red" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Loans */}
      <section id="produtos" className="scroll-mt-4 bg-white">
        <div className={`${sec} flex flex-col gap-8 sm:gap-12`}>
          <div className="nrp-reveal flex max-w-[640px] flex-col gap-3">
            <span className="eyebrow">{pr.eyebrow}</span>
            <h2 className={h2}>{pr.title}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {items.map((p) => {
              const { Icon, bg } = productIcon[p.key as Product];
              return (
                <article
                  key={p.key}
                  className="nrp-lift nrp-reveal flex min-w-0 flex-col gap-4 rounded-[20px] border border-line bg-white p-6 sm:p-8"
                >
                  <div className={`nrp-icon flex h-14 w-14 items-center justify-center rounded-[14px] ${bg}`}>
                    <Icon />
                  </div>
                  <h3 className="m-0 text-[22px] leading-tight font-extrabold text-ink">{p.name}</h3>
                  <p className="m-0 text-base leading-relaxed text-muted">{p.description}</p>
                  <div className="flex flex-col gap-1 rounded-[14px] bg-brand-sky p-4">
                    <span className="text-xs font-bold tracking-[1px] text-muted uppercase">{pr.labels.rate}</span>
                    <span className="text-[30px] leading-tight font-extrabold text-brand-red">
                      {p.rate} <span className="text-sm font-semibold text-muted">{pr.labels.perMonth}</span>
                    </span>
                    {p.amount && (
                      <span className="text-[15px] font-bold text-brand-blue">
                        <span className="font-medium text-muted">{pr.labels.amount}: </span>
                        {p.amount}
                      </span>
                    )}
                    <span className="text-[15px] font-bold text-brand-blue">
                      <span className="font-medium text-muted">{pr.labels.guarantee}: </span>
                      {pr.guarantee}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <span className="text-xs font-bold tracking-[1px] text-muted uppercase">{pr.labels.documents}</span>
                    <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px] text-ink">
                      {p.docs.map((d) => (
                        <li key={d} className="flex items-center gap-2">
                          <CheckIcon size={18} color="#C8102E" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <SimulateLink product={p.key as Product}>
                      {pr.simulate} <span className="nrp-arrow-i">→</span>
                    </SimulateLink>
                    <Link
                      href={`/${lang}/apply?product=${p.key}`}
                      className="nrp-btn inline-flex min-h-11 items-center rounded-full bg-brand-red px-5 text-[15px] font-bold text-white no-underline hover:text-white"
                    >
                      {pr.apply}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="scroll-mt-4 bg-brand-sky">
        <div className={`${sec} flex flex-col gap-8 sm:gap-12`}>
          <div className="nrp-reveal flex max-w-[640px] flex-col gap-3">
            <span className="eyebrow">{how.eyebrow}</span>
            <h2 className={h2}>{how.title}</h2>
          </div>
          <ol className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {how.steps.map((s, i) => (
              <li key={s.title} className="nrp-lift nrp-reveal flex flex-col gap-3.5 rounded-[20px] bg-white p-7">
                <span className="nrp-num flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="m-0 text-[19px] font-extrabold">{s.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements */}
      <section id="requisitos" className="scroll-mt-4 bg-white">
        <div className={`${sec} flex flex-wrap items-start gap-8 sm:gap-12`}>
          <div className="nrp-reveal flex min-w-0 flex-[1_1_380px] flex-col gap-4">
            <span className="eyebrow">{rq.eyebrow}</span>
            <h2 className={h2}>{rq.title}</h2>
            <p className="m-0 text-[17px] leading-relaxed text-muted">{rq.text}</p>
          </div>
          <ul className="m-0 flex min-w-0 flex-[1_1_460px] list-none flex-col gap-3.5 p-0">
            {rq.items.map((r) => (
              <li key={r} className="nrp-row nrp-reveal flex items-center gap-3.5 rounded-[14px] border border-line bg-white px-5 py-[18px] text-[17px] font-semibold">
                <CheckIcon color="#C8102E" className="shrink-0" />
                {r}
              </li>
            ))}
            <li className="nrp-row nrp-reveal flex items-center gap-3.5 rounded-[14px] border border-dashed border-line-strong bg-brand-sky px-5 py-[18px] text-[15px] font-semibold text-brand-blue">
              <StoreIcon size={22} color="#0B2E6F" className="shrink-0" />
              {rq.business}
            </li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="sobre-nos" className="scroll-mt-4 bg-brand-sky">
        <div className={`${sec} flex flex-col gap-8 sm:gap-12`}>
          <div className="flex flex-wrap items-start gap-8 sm:gap-12">
            <div className="nrp-reveal flex min-w-0 flex-[1_1_420px] flex-col gap-4">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 className={h2}>{about.title}</h2>
            </div>
            <div className="nrp-reveal flex min-w-0 flex-[1_1_460px] flex-col gap-4">
              {about.paragraphs.map((t) => (
                <p key={t} className="m-0 text-[17px] leading-[1.7] text-muted">{t}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {about.cards.map((c) => (
              <div key={c.title} className="nrp-lift nrp-reveal flex flex-col gap-3 rounded-[20px] bg-white p-7">
                <h3 className="m-0 text-xl font-extrabold text-brand-blue">{c.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="bg-brand-red text-white">
        <div className="nrp-reveal mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 px-6 py-14">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-2.5">
            <h2 className="m-0 text-2xl leading-tight font-extrabold sm:text-[30px]">{trust.title}</h2>
            <p className="m-0 text-[17px] leading-relaxed text-brand-red-soft">{trust.text}</p>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="nrp-btn nrp-btn-ghost flex-[1_1_100%] rounded-full bg-white px-7 py-4 text-center text-[17px] font-extrabold text-brand-red no-underline hover:text-brand-red sm:flex-none"
          >
            {trust.cta}
          </a>
        </div>
      </section>

      {/* Contact: start an application */}
      <section id="contacto" className="scroll-mt-4 bg-white">
        <div className={`${sec} flex flex-wrap gap-8 sm:gap-12`}>
          <div className="nrp-reveal flex min-w-0 flex-[1_1_380px] flex-col gap-5">
            <span className="eyebrow">{contact.eyebrow}</span>
            <h2 className={h2}>{contact.title}</h2>
            <p className="m-0 text-[17px] leading-relaxed text-muted">{contact.text}</p>
            <dl className="m-0 flex flex-col gap-3.5 text-base">
              <Info label={contact.office}>
                {site.address.street}, {site.address.city}
              </Info>
              <Info label={contact.whatsapp}>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-blue no-underline hover:text-brand-red inline-flex min-h-10 items-center">
                  {site.whatsappDisplay}
                </a>
              </Info>
              <Info label={contact.email}>
                <a href={`mailto:${site.email}`} className="font-semibold break-all text-brand-blue no-underline hover:text-brand-red inline-flex min-h-10 items-center">
                  {site.email}
                </a>
              </Info>
              <Info label={contact.hours}>{site.hours[lang]}</Info>
            </dl>
          </div>

          {/* Plain GET form: no script needed; it opens the full application with these answers filled in. */}
          <form
            action={`/${lang}/apply`}
            method="get"
            className="nrp-reveal flex min-w-0 flex-[1_1_460px] flex-col gap-[18px] rounded-[20px] bg-brand-sky p-6 sm:p-8"
          >
            <QuickField id="q-name" label={contact.quick.name}>
              <input id="q-name" name="fullName" autoComplete="name" placeholder={contact.quick.namePh} className="field" />
            </QuickField>
            <QuickField id="q-phone" label={contact.quick.phone}>
              <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder={contact.quick.phonePh} className="field" />
            </QuickField>
            <QuickField id="q-product" label={contact.quick.product}>
              <select id="q-product" name="product" defaultValue="personal" className="field">
                {items.map((p) => (
                  <option key={p.key} value={p.key}>{p.name}</option>
                ))}
              </select>
            </QuickField>
            <QuickField id="q-amount" label={contact.quick.amount}>
              <input id="q-amount" name="amount" type="number" inputMode="numeric" min={1000} max={500000} step={500} placeholder={contact.quick.amountPh} className="field" />
            </QuickField>
            <button type="submit" className="nrp-btn cursor-pointer rounded-xl border-0 bg-brand-blue p-4 text-[17px] font-bold text-white">
              {contact.quick.submit} →
            </button>
            <p className="m-0 text-[13px] text-muted">{contact.quick.note}</p>
          </form>
        </div>
      </section>

      {/* Talk to us */}
      <section id="fale-connosco" className="scroll-mt-4 bg-brand-sky">
        <div className="mx-auto max-w-[1200px] px-6 py-14 sm:py-20">
          <div className="nrp-reveal flex flex-wrap gap-8 rounded-3xl border border-line bg-white p-6 shadow-[0_12px_40px_rgba(11,46,111,0.08)] sm:gap-12 sm:p-10">
            <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
              <span className="eyebrow">{talk.eyebrow}</span>
              <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold text-brand-blue sm:text-[36px]">{talk.title}</h2>
              <p className="m-0 text-[17px] leading-relaxed text-muted">{talk.text}</p>
              <div className="flex flex-col gap-4 pt-2 text-base">
                <IconRow icon={<PhoneIcon color="#C8102E" />} label={talk.phone}>
                  <a href={telHref(site.phones[0])} className="font-semibold text-brand-blue no-underline inline-flex min-h-10 flex-wrap items-center gap-x-1.5">
                    {site.phones[0]} <span className="font-medium text-muted">{talk.callAndWa}</span>
                  </a>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="nrp-arrow text-[15px] font-bold text-brand-red no-underline inline-flex min-h-10 items-center">
                    {talk.openWa} <span className="nrp-arrow-i">→</span>
                  </a>
                  <a href={telHref(site.phones[1])} className="font-semibold text-brand-blue no-underline inline-flex min-h-10 items-center">{site.phones[1]}</a>
                </IconRow>
                <IconRow icon={<MailIcon color="#C8102E" />} label={talk.email}>
                  <a href={`mailto:${site.email}`} className="font-semibold break-all text-brand-blue no-underline inline-flex min-h-10 items-center">{site.email}</a>
                </IconRow>
                <IconRow icon={<PinIcon color="#C8102E" />} label={talk.address}>
                  <span className="leading-normal text-muted">
                    {site.address.street}
                    <br />
                    {site.address.city}
                  </span>
                </IconRow>
                <IconRow icon={<ClockIcon color="#C8102E" />} label={contact.hours}>
                  <span className="text-muted">{site.hours[lang]}</span>
                </IconRow>
              </div>
            </div>
            <ContactForm t={talk} lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-bold">{label}</dt>
      <dd className="m-0 text-muted">{children}</dd>
    </div>
  );
}

function QuickField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold">{label}</label>
      {children}
    </div>
  );
}

function IconRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex-none">{icon}</span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-bold">{label}</span>
        {children}
      </div>
    </div>
  );
}
