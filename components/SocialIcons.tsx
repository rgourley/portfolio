import { SOCIAL } from "@/lib/links";

/** Simple line icons, drawn in the text color so they follow light and dark mode. */
const ICONS: Record<string, JSX.Element> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75V21h-4v-5.1c0-1.22-.02-2.78-1.78-2.78-1.78 0-2.05 1.3-2.05 2.7V21h-4V9.75Z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
    </svg>
  ),
};

/** Instagram, LinkedIn and X as small icon links: in the top nav on a desktop, and in the menu sheet on a phone. */
export default function SocialIcons({ className }: { className: string }) {
  return (
    <span className={className}>
      {SOCIAL.filter(([, url]) => url).map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener" aria-label={name} title={name}>
          {ICONS[name]}
        </a>
      ))}
    </span>
  );
}
