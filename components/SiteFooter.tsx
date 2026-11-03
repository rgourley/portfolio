import Link from "next/link";
import { R } from "@/lib/links";

export default function SiteFooter() {
  return (
    <footer className="sfoot">
      <Link href={R.leadership}>Leadership</Link>
      <Link href={R.services}>Services</Link>
      <Link href={R.contact}>Contact</Link>
      <Link href={R.coaster}>Market Coaster</Link>
      <Link href={R["font-sizes"]}>Font size checker</Link>
      <a href="https://www.robertcreative.com">robertcreative.com</a>
      <span>Robert Gourley, 2026</span>
    </footer>
  );
}
