import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { absolute: dict.staff.metaTitle },
    robots: { index: false, follow: false },
  };
}

// The staff pages depend on the signed-in user, so they are allowed to block.
export const instant = false;

export default async function StaffLayout({ children }: LayoutProps<"/[lang]/staff">) {
  const lang = await getLocale();
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <Logo href={`/${lang}`} />
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
