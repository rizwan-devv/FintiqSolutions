import { company } from "@/content/site";

export function ContactEmails({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const label = tone === "dark" ? "text-teal" : "text-signal-deep";
  const link = tone === "dark" ? "text-white hover:text-teal" : "text-navy hover:text-signal-deep";

  return (
    <ul className="space-y-3">
      {company.emails.map((item) => (
        <li key={`${item.label}-${item.address}`}>
          <p className={`font-mono text-[11px] uppercase ${label}`}>{item.label}</p>
          <a href={`mailto:${item.address}`} className={`draw-link mt-1 inline-flex text-sm font-semibold ${link}`}>
            {item.address}
          </a>
        </li>
      ))}
    </ul>
  );
}
