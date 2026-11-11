import { Logo } from "@/components/brand/Logo";
import { cardCompany, memberInitials, type TeamMember } from "@/content/team";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cardCompany.mapsQuery)}`;

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.8c.4-.4 1-.5 1.5-.3l2.3 1c.5.2.8.7.8 1.2v2.3c0 .4-.2.8-.6 1-.9.5-1.4 1.4-1.2 2.4.5 2.3 2.3 4.1 4.6 4.6 1 .2 1.9-.3 2.4-1.2.2-.4.6-.6 1-.6h2.3c.5 0 1 .3 1.2.8l1 2.3c.2.5.1 1.1-.3 1.5l-1.2 1.2c-.4.4-1 .6-1.6.5C11.4 19.2 4.8 12.6 3.9 5.6c-.1-.6.1-1.2.5-1.6L6.6 3.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 7.5 12 13l7.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 3.2A8.75 8.75 0 0 0 3.9 16.4L3 21l4.72-.86A8.75 8.75 0 1 0 12.04 3.2Zm0 1.6a7.15 7.15 0 0 1 0 14.3c-1.24 0-2.42-.32-3.47-.92l-.25-.14-2.8.51.53-2.73-.16-.27a7.15 7.15 0 0 1 6.15-10.75Zm4.1 9.55c-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.11-.14.22-.57.71-.7.86-.13.14-.26.16-.48.05-.22-.11-.93-.34-1.77-1.1-.65-.58-1.1-1.3-1.23-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.14-.22.22-.37.07-.14.04-.27-.02-.38-.05-.11-.5-1.2-.68-1.64-.18-.44-.36-.37-.5-.38h-.42c-.14 0-.38.05-.58.27-.2.22-.76.74-.76 1.8 0 1.06.78 2.08.89 2.22.11.14 1.53 2.34 3.7 3.28 2.18.94 2.18.63 2.57.59.39-.04 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.1-.2-.16-.42-.27Z" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.75 12h16.5M12 3.75c2.4 2.6 2.4 13.9 0 16.5M12 3.75c-2.4 2.6-2.4 13.9 0 16.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconMap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10.2A6 6 0 1 0 6 10.8C6 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v10m0 0 3.5-3.5M12 14 8.5 10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 17.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const actionClass =
  "flex min-h-12 w-full items-center gap-3 rounded-[14px] border border-[#C9D6DF] bg-white px-4 py-3 text-left text-[15px] font-medium text-[#102458] shadow-[0_4px_16px_rgb(16_36_88/0.05)] transition hover:border-[#00B0A4]/55 hover:bg-[#F4F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0A4] focus-visible:ring-offset-2";

export function BusinessCard({ member }: { member: TeamMember }) {
  const initials = memberInitials(member);
  const vcfHref = `/${member.slug}.vcf`;

  return (
    <div className="card-page min-h-dvh bg-[#F4F8FA] text-[#102458]">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-5 px-4 py-8 sm:px-5 sm:py-10">
        <header className="flex justify-center">
          <Logo />
        </header>

        <section className="rounded-[14px] border border-[#C9D6DF] bg-white p-6 text-center shadow-[0_8px_28px_rgb(16_36_88/0.07)] sm:p-7">
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt=""
              width={96}
              height={96}
              className="mx-auto size-24 rounded-full object-cover ring-2 ring-[#00B0A4]/35"
            />
          ) : (
            <div
              className="mx-auto flex size-24 items-center justify-center rounded-full bg-[linear-gradient(145deg,#102458_0%,#04A0AA_70%,#00B0A4_100%)] text-2xl font-semibold tracking-wide text-white"
              aria-hidden="true"
            >
              <span className="font-[family-name:var(--font-card-display)]">{initials}</span>
            </div>
          )}

          <h1 className="mt-5 font-[family-name:var(--font-card-display)] text-[1.75rem] font-bold leading-tight tracking-tight text-[#102458] sm:text-[2rem]">
            {member.fullName}
          </h1>
          <p className="mt-2 text-base font-semibold text-[#04A0AA]">{member.title}</p>
          <p className="mt-1 text-sm text-[#5c6d86]">{cardCompany.brandName}</p>

          <a
            href={vcfHref}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#00B0A4] px-5 text-base font-semibold text-white shadow-[0_10px_24px_rgb(0_176_164/0.28)] transition hover:bg-[#04A0AA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0A4] focus-visible:ring-offset-2"
          >
            <IconDownload className="size-5" />
            Save to Contacts
          </a>
        </section>

        <nav aria-label="Contact actions" className="grid gap-3">
          <a href={`tel:${member.mobileTel}`} className={actionClass}>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F8FA] text-[#00B0A4]">
              <IconPhone className="size-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5c6d86]">Call</span>
              <span>{member.mobileDisplay}</span>
            </span>
          </a>

          <a href={`mailto:${member.email}`} className={actionClass}>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F8FA] text-[#00B0A4]">
              <IconMail className="size-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5c6d86]">Email</span>
              <span className="break-all">{member.email}</span>
            </span>
          </a>

          <a
            href={`https://wa.me/${member.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={actionClass}
          >
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F8FA] text-[#00B0A4]">
              <IconWhatsApp className="size-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5c6d86]">WhatsApp</span>
              <span>{member.mobileDisplay}</span>
            </span>
          </a>

          <a href={cardCompany.website} className={actionClass}>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F8FA] text-[#00B0A4]">
              <IconGlobe className="size-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5c6d86]">Website</span>
              <span>{cardCompany.websiteDisplay}</span>
            </span>
          </a>

          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={actionClass}>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F8FA] text-[#00B0A4]">
              <IconMap className="size-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5c6d86]">Directions</span>
              <span>Naval Anchorage, Islamabad</span>
            </span>
          </a>
        </nav>

        <footer className="rounded-[14px] border border-[#C9D6DF] bg-white p-5 shadow-[0_4px_16px_rgb(16_36_88/0.05)]">
          <p className="font-[family-name:var(--font-card-display)] text-base font-bold text-[#102458]">
            {cardCompany.legalName}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#5c6d86]">
            {cardCompany.addressLine1}
            <br />
            {cardCompany.addressLine2}, {cardCompany.city}, {cardCompany.country}
          </p>
          <a
            href={`mailto:${cardCompany.email}`}
            className="mt-3 inline-block text-sm font-semibold text-[#00B0A4] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0A4] focus-visible:ring-offset-2"
          >
            {cardCompany.email}
          </a>
          <p className="mt-3 border-t border-[#C9D6DF] pt-3 text-sm leading-6 text-[#5c6d86]">
            {cardCompany.tagline}
          </p>
        </footer>
      </main>
    </div>
  );
}
