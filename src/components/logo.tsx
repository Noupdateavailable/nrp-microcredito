import Image from "next/image";
import logo from "../../public/nrp-logo.png";

export function Logo({ onDark = false, className = "h-10 w-auto" }: { onDark?: boolean; className?: string }) {
  const img = <Image src={logo} alt="NRP Microcrédito E.I" priority className={className} />;
  // The logo has black lettering, so on dark backgrounds it sits on a white chip.
  return onDark ? <span className="inline-flex rounded-xl bg-white px-3 py-2">{img}</span> : img;
}
