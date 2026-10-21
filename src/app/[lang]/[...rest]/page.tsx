import { notFound } from "next/navigation";

// Any unknown path under /pt or /en renders the site's own 404 inside the layout.
export default function CatchAll() {
  notFound();
}
