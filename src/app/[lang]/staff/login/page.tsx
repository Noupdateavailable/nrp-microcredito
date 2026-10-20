import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const dict = await getDictionary();
  const lang = await getLocale();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line">
        <h1 className="mb-6 text-2xl font-bold text-brand-blue">{dict.staff.loginTitle}</h1>
        <LoginForm lang={lang} t={dict.staff} />
      </div>
    </div>
  );
}
