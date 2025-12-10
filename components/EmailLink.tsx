"use client";

import { trackEmailClick } from "@/lib/analytics";

interface EmailLinkProps {
  email: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}

export default function EmailLink({ email, location, className, children }: EmailLinkProps) {
  const handleClick = () => {
    trackEmailClick(email, location);
  };

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}


