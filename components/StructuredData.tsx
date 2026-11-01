interface StructuredDataProps {
  data: Record<string, unknown>;
}

// Rendered as a plain server-side tag so crawlers see it in the initial HTML.
// `<` is escaped so content can never close the script element early.
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
