import { buttonGhost, buttonGhostLight, buttonPrimary } from "@/components/ui/styles";

const PROFILE_HREF = "/FintiQ-Solutions-Company-Profile.pdf";

type ProfileDownloadProps = {
  variant?: "primary" | "ghost" | "ghostLight" | "text" | "chip";
  className?: string;
  label?: string;
};

const variantClass = {
  primary: buttonPrimary,
  ghost: buttonGhost,
  ghostLight: buttonGhostLight,
  text: "draw-link inline-flex text-sm font-semibold text-navy hover:text-signal-deep",
  chip: "inline-flex h-10 items-center rounded-full border border-navy/15 px-4 text-sm font-semibold text-navy transition hover:border-teal hover:text-signal-deep",
} as const;

export function ProfileDownload({
  variant = "ghost",
  className = "",
  label = "Download company profile",
}: ProfileDownloadProps) {
  return (
    <a
      href={PROFILE_HREF}
      download="FintiQ-Solutions-Company-Profile.pdf"
      className={`${variantClass[variant]} ${className}`.trim()}
    >
      {label}
    </a>
  );
}
