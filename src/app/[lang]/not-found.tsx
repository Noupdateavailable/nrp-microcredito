import Link from "next/link";

// Shown inside the site layout. It can't read the language segment, so it speaks both.
export default function NotFound() {
  return (
    <section className="grid place-items-center bg-brand-sky px-6 py-24 text-center">
      <div className="max-w-md">
        <p className="text-6xl font-extrabold text-brand-red">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-brand-blue">Página não encontrada</h1>
        <p className="mt-1 text-muted">Page not found</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/pt" className="btn-red">
            Voltar ao início
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            Go to home page
          </Link>
        </div>
      </div>
    </section>
  );
}
