import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-light mb-4">404</h1>
        <p className="text-xl text-foreground/60 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-foreground/20 rounded-lg font-light text-sm hover:border-foreground/40 transition-all"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

