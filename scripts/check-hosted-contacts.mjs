/**
 * Smoke-check hosted contact pages and vCards.
 * Usage: node scripts/check-hosted-contacts.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000
 */
const base = (process.argv[2] || process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

async function check(path, assert) {
  const url = `${base}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const text = await res.text();
  const ctype = res.headers.get("content-type") || "";
  assert(res, text, ctype, url);
  console.log(`OK  ${res.status}  ${path}`);
}

async function main() {
  let failed = 0;

  const run = async (path, fn) => {
    try {
      await check(path, fn);
    } catch (error) {
      failed += 1;
      console.error(`FAIL ${path}:`, error instanceof Error ? error.message : error);
    }
  };

  await run("/saad", (res, text, ctype) => {
    if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
    if (!ctype.includes("text/html")) throw new Error(`expected html, got ${ctype}`);
    if (!text.includes("Saad Sarwar Mirza")) throw new Error("missing name");
    if (!text.includes("Save to Contacts")) throw new Error("missing CTA");
  });

  await run("/murtaza", (res, text, ctype) => {
    if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
    if (!ctype.includes("text/html")) throw new Error(`expected html, got ${ctype}`);
    if (!text.includes("Murtaza Malik")) throw new Error("missing name");
  });

  await run("/saad/", (res, text) => {
    if (res.status !== 200) throw new Error(`expected 200 after trailing slash, got ${res.status}`);
    if (!text.includes("Saad Sarwar Mirza")) throw new Error("trailing slash page missing name");
  });

  await run("/saad.vcf", (res, text, ctype, url) => {
    if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
    if (!ctype.includes("text/vcard") && !ctype.includes("text/x-vcard")) {
      throw new Error(`expected vcard content-type, got ${ctype}`);
    }
    const disposition = res.headers.get("content-disposition") || "";
    if (!disposition.includes("saad.vcf")) throw new Error(`bad disposition: ${disposition}`);
    if (!text.includes("BEGIN:VCARD")) throw new Error("missing BEGIN:VCARD");
    if (!text.includes("FN:Saad Sarwar Mirza")) throw new Error("missing FN");
    if (!text.includes("TEL;TYPE=CELL:+923305474030")) throw new Error("missing TEL");
    if (!text.includes("\r\n")) throw new Error(`expected CRLF in body from ${url}`);
  });

  await run("/murtaza.vcf", (res, text, ctype) => {
    if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
    if (!ctype.includes("text/vcard") && !ctype.includes("text/x-vcard")) {
      throw new Error(`expected vcard content-type, got ${ctype}`);
    }
    if (!text.includes("FN:Murtaza Malik")) throw new Error("missing FN");
  });

  await run("/unknown-card-slug-xyz", (res) => {
    if (res.status !== 404) throw new Error(`expected 404, got ${res.status}`);
  });

  if (failed) {
    console.error(`\n${failed} check(s) failed against ${base}`);
    process.exit(1);
  }
  console.log(`\nAll hosted-contact checks passed against ${base}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
