import Link from "next/link";
import { PACK_URL, R } from "@/lib/links";

export default function SiteFooter() {
  return (
    <footer className="sfoot">
      <Link href={R.leadership} prefetch={false}>Leadership</Link>
      <Link href={R.services} prefetch={false}>Services</Link>
      <Link href={R.contact} prefetch={false}>Contact</Link>
      <Link href={R.coaster} prefetch={false}>Market Coaster</Link>
      <a href={PACK_URL}>Film Looks pack</a>
      <a href="https://www.robertcreative.com">robertcreative.com</a>
      <span>Robert Gourley, 2026</span>
    </footer>
  );
}
