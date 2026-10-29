"use client";

export function PrintOverviewButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white transition hover:bg-teal hover:text-navy print:hidden"
    >
      Save / print PDF
    </button>
  );
}
