export const company = {
  legalName: "FintiQ Solutions (Private) Limited",
  brandName: "FintiQ Solutions",
  shortName: "FintiQ",
  siteUrl: "https://fintiqsolutions.com",
  lines: ["House # 5, Street 7, Block C", "Naval Anchorage, Islamabad"],
  tagline: "Accelerate digital financial growth with secure fintech platforms.",
  emails: [
    { label: "For Info", address: "info@fintiqsolutions.com" },
    { label: "For Support", address: "support@fintiqsolutions.com" },
  ],
  /** Set when the company LinkedIn page is live. */
  linkedin: "" as string,
  disclaimer:
    "We operate as a technology development partner. Licensed institutions remain the system of record for funds and regulated decisions.",
}

export type Block = {
  title: string
  body: string
}

export type Buyer = {
  title: string
  body: string
  platforms: { slug: string; label: string }[]
}

export type CaseStudy = {
  title: string
  problem: string
  shipped: string
  result: string
}

export type Insight = {
  slug: string
  eyebrow: string
  title: string
  summary: string
  paragraphs: string[]
}

export type Product = {
  slug: string
  name: string
  eyebrow: string
  promise: string
  summary: string
  audience: string
  outcome: string
  capabilities: Block[]
  journey: Block[]
  services: string[]
  architecture: Block[]
  uat: Block
}

export type Service = {
  slug: string
  name: string
  eyebrow: string
  summary: string
  audience: string
  outcome: string
  capabilities: Block[]
  journey: Block[]
  products: string[]
}

export type Channel = {
  slug: string
  name: string
  eyebrow: string
  promise: string
  related: string[]
}

const commonServices = [
  "platform-implementation",
  "payments-and-core-integration",
  "production-support",
]

export const products: Product[] = [
  {
    slug: "card-management-system",
    name: "Card Management System",
    eyebrow: "CMS",
    promise: "Issue, authorize, and service cards from one secure operations desk.",
    summary:
      "Card Management System (CMS) for banks and wallet issuers — encrypted desk login, issuance, authorization paths, limits, PIN, and servicing on one control plane.",
    audience: "Banks, wallets, and payment companies issuing debit, prepaid, or virtual cards.",
    outcome: "Authorized operators sign in to CMS and run the card book with a clear audit trail.",
    capabilities: [
      {
        title: "Secure CMS desk access",
        body: "Encrypted Sign-in for authorized personnel — Login ID, password session, and Remember Login ID for the ops desk.",
      },
      {
        title: "Issuance and servicing",
        body: "Request, approval, generation, limits, PIN, status, and who changed what — in one desk workflow.",
      },
      {
        title: "Cardholder channel",
        body: "A separate API for the cardholder app so servicing does not expose bureau files or sensitive production artifacts.",
      },
    ],
    journey: [
      { title: "Brand the CMS desk", body: "Institution access and card products for the operations team." },
      { title: "Stand up login and APIs", body: "Encrypted CMS portal for the desk. Contract for the cardholder app." },
      { title: "Prove a live card", body: "Sign in, issue, authorize, and service a real journey in UAT." },
    ],
    architecture: [
      { title: "CMS desk & cardholder channels", body: "Encrypted portal for issuance and servicing; app APIs for the cardholder." },
      { title: "Card control plane", body: "Products, limits, PIN, status, and audit on one stack." },
      { title: "Institution & network edge", body: "Core postings and network paths stay under the licensed institution." },
    ],
    uat: {
      title: "Sign in → issue → authorize → service",
      body: "UAT starts at the CMS login screen, then a live card journey signed by the desk.",
    },
    services: commonServices,
  },
  {
    slug: "corporate-banking",
    name: "Corporate Banking",
    eyebrow: "Corporate",
    promise: "Give businesses a portal for accounts, payments, and approvals.",
    summary:
      "Corporate banking workflows for companies and institutions: multi-user access, approval matrices, bulk payments, and visibility finance teams can run day to day.",
    audience: "Banks and financial institutions serving SMEs, corporates, and enterprise clients.",
    outcome: "A branded corporate portal with maker-checker flows and a clean handoff to core banking.",
    capabilities: [
      {
        title: "Corporate portal",
        body: "Accounts, payments, beneficiaries, and statements in a portal the institution brands as its own.",
      },
      {
        title: "Approvals that match the firm",
        body: "Maker-checker and multi-level approvals configured to the client’s operating model.",
      },
      {
        title: "Bulk and scheduled payments",
        body: "Payroll-style and vendor disbursements without leaving the corporate desk.",
      },
    ],
    journey: [
      { title: "Define client journeys", body: "Who logs in, who approves, which payment types go live first." },
      { title: "Connect the core", body: "Balances and postings stay with the institution’s core." },
      { title: "UAT with corporate ops", body: "A real payment path signed by the bank’s operators." },
    ],
    architecture: [
      { title: "Corporate portal", body: "Branded access for accounts, beneficiaries, and payments." },
      { title: "Approval & payment engine", body: "Maker-checker matrices and bulk payment workflows." },
      { title: "Core banking handoff", body: "Balances and postings remain with the institution’s core." },
    ],
    uat: {
      title: "Approve a real corporate payment",
      body: "UAT is a maker-checker payment path signed by corporate ops — not a slide walkthrough.",
    },
    services: ["platform-implementation", "payments-and-core-integration", "resource-augmentation", "production-support"],
  },
  {
    slug: "payment-gateway",
    name: "Payment Gateway",
    eyebrow: "Payments",
    promise: "Collect online payments across channels with one integration.",
    summary:
      "A merchant-ready payment gateway for invoices, hosted checkout, multi-rail collection, settlement, and disbursement — with a merchant portal operations can run.",
    audience: "Banks, PSPs under license, and institutions that collect fees or run merchant books.",
    outcome: "Merchant and admin portals, a stable collection API, and settlement finance can close without three tools.",
    capabilities: [
      {
        title: "Merchant and admin portals",
        body: "Merchants manage invoices and payment config. Operations manages merchants, pricing, and allowed processors.",
      },
      {
        title: "Hosted checkout and APIs",
        body: "A payment session merchants can open from web or API, with status and callbacks in one shape.",
      },
      {
        title: "Settlement and disbursement",
        body: "What the merchant is owed sits next to the collection path — not in a month-end spreadsheet.",
      },
    ],
    journey: [
      { title: "Brand the portals", body: "Institution name and language on the merchant experience." },
      { title: "Connect collection rails", body: "Processors and callbacks in a controlled environment." },
      { title: "Prove a live payment", body: "Invoice → checkout → callback → settlement line in UAT." },
    ],
    architecture: [
      { title: "Merchant & admin portals", body: "Checkout, invoices, and ops configuration under institution branding." },
      { title: "Gateway session layer", body: "Payment sessions, status, and callbacks in one API shape." },
      { title: "Collection rails & settlement", body: "Processors and settlement lines wired for finance close." },
    ],
    uat: {
      title: "Invoice → checkout → settlement",
      body: "UAT proves a live collection: invoice, hosted checkout, callback, and a settlement line ops can close.",
    },
    services: commonServices,
  },
  {
    slug: "cash-management-system",
    name: "Cash Management System",
    eyebrow: "Treasury",
    promise: "See cash positions, move funds, and control liquidity in one desk.",
    summary:
      "Cash and liquidity workflows for institutions and corporates: positions, pooling views, payment factories, and controls that keep treasury operations structured.",
    audience: "Banks and large corporates that need visibility and control over cash movement.",
    outcome: "A cash desk with clear positions, controlled payments, and an audit trail finance can trust.",
    capabilities: [
      {
        title: "Position and visibility",
        body: "Account-level and consolidated views so treasury sees where cash sits.",
      },
      {
        title: "Controlled movement",
        body: "Internal transfers and external payments with roles and approval paths.",
      },
      {
        title: "Reporting for the desk",
        body: "Operational reports that match how cash teams actually close the day.",
      },
    ],
    journey: [
      { title: "Map cash sources", body: "Accounts, entities, and the first reporting cut." },
      { title: "Wire movement rules", body: "Who can move what, and what needs dual control." },
      { title: "Run a treasury UAT", body: "Position, payment, and report signed by the desk." },
    ],
    architecture: [
      { title: "Treasury desk", body: "Positions, pooling views, and payment factory controls." },
      { title: "Liquidity workflows", body: "Internal transfers and external payments with dual control." },
      { title: "Account & rail feeds", body: "Cash sources stay tied to the institution’s books and rails." },
    ],
    uat: {
      title: "Position → payment → report",
      body: "UAT is a treasury cycle: see a position, move funds under control, and close with a desk report.",
    },
    services: ["platform-implementation", "payments-and-core-integration", "production-support"],
  },
  {
    slug: "remittance-system",
    name: "Remittance System",
    eyebrow: "Transfers",
    promise: "Move funds across corridors with clear status and compliance checks.",
    summary:
      "Remittance and fund-transfer workflows for institutions: send, receive, status tracking, compliance screens, and partner corridors behind a stable operations console.",
    audience: "Banks, exchange companies, and licensed remittance operators.",
    outcome: "A remittance desk with corridor configuration, case handling, and a trail compliance can review.",
    capabilities: [
      {
        title: "Send and receive flows",
        body: "Customer and agent paths for outbound and inbound remittances with status the desk can follow.",
      },
      {
        title: "Compliance screens",
        body: "Checks and holds that keep high-risk cases in a reviewable queue.",
      },
      {
        title: "Partner corridors",
        body: "Corridor and partner configuration without rebuilding the customer experience.",
      },
    ],
    journey: [
      { title: "Name the corridors", body: "First corridors, partners, and fee model." },
      { title: "Stand up the desk", body: "Ops console, roles, and compliance queue." },
      { title: "Prove end to end", body: "A successful remittance and a held case in UAT." },
    ],
    architecture: [
      { title: "Customer & agent channels", body: "Send and receive journeys with status the desk can follow." },
      { title: "Remittance control plane", body: "Corridors, fees, compliance holds, and case queues." },
      { title: "Partner corridors", body: "Partner and rail configuration without rebuilding the channel." },
    ],
    uat: {
      title: "Success path + held case",
      body: "UAT covers a completed remittance and a compliance hold that ops can resolve with a trail.",
    },
    services: commonServices,
  },
  {
    slug: "loan-origination-system",
    name: "Loan Origination System",
    eyebrow: "Lending · LOS",
    promise: "Capture, assess, and decide loan applications in a governed pipeline.",
    summary:
      "An LOS for application intake, document collection, credit assessment steps, and decisioning workflows — so lending teams move from application to approval with a clear trail.",
    audience: "Banks, microfinance, and lending businesses launching or modernizing origination.",
    outcome: "A structured origination pipeline with stages, roles, and evidence for each decision.",
    capabilities: [
      {
        title: "Application intake",
        body: "Digital applications with document packs and status the applicant and desk can follow.",
      },
      {
        title: "Assessment workflow",
        body: "Credit and compliance steps as a queue — not a scattered email chain.",
      },
      {
        title: "Decision and handoff",
        body: "Approval, decline, or refer — then a clean pass into loan management.",
      },
    ],
    journey: [
      { title: "Model products", body: "Loan products, documents, and decision stages." },
      { title: "Wire integrations", body: "Identity, bureau, and core hooks the institution already uses." },
      { title: "UAT a full file", body: "Application through decision with lending ops." },
    ],
    architecture: [
      { title: "Applicant & desk channels", body: "Digital intake and a queue lending ops can work." },
      { title: "Origination pipeline", body: "Stages, documents, assessment, and decision evidence." },
      { title: "Bureau & core hooks", body: "Identity and credit checks the institution already trusts." },
    ],
    uat: {
      title: "Application through decision",
      body: "UAT is a full file: intake, assessment steps, and an approve/decline/refer with lending ops.",
    },
    services: ["platform-implementation", "compliance-engineering", "resource-augmentation", "production-support"],
  },
  {
    slug: "loan-management-system",
    name: "Loan Management System",
    eyebrow: "Lending · LMS",
    promise: "Service the book: schedules, repayments, collections, and changes.",
    summary:
      "An LMS for the live loan book — repayment schedules, collections queues, restructuring paths, and operational reports after origination is done.",
    audience: "Institutions that need post-disbursement control of the lending portfolio.",
    outcome: "A servicing desk with schedules, arrears visibility, and an audit of changes to the book.",
    capabilities: [
      {
        title: "Schedules and repayments",
        body: "Installments, receipts, and status that finance and collections share.",
      },
      {
        title: "Collections and cases",
        body: "Arrears queues and case notes so follow-up is structured.",
      },
      {
        title: "Book changes",
        body: "Restructure and adjustment paths with dual control where required.",
      },
    ],
    journey: [
      { title: "Import or open the book", body: "Products, accounts, and servicing rules." },
      { title: "Connect receipts", body: "Payment channels that update the schedule." },
      { title: "Prove a cycle", body: "Repayment, arrears case, and report in UAT." },
    ],
    architecture: [
      { title: "Servicing desk", body: "Schedules, receipts, arrears queues, and case notes." },
      { title: "Book control", body: "Restructure and adjustment paths with dual control where required." },
      { title: "Receipt channels", body: "Payment rails that update the schedule without a spreadsheet bridge." },
    ],
    uat: {
      title: "Repayment + arrears cycle",
      body: "UAT proves a repayment, an arrears case, and an operational report collections can defend.",
    },
    services: ["platform-implementation", "resource-augmentation", "production-support"],
  },
]

export const channels: Channel[] = [
  {
    slug: "agent-banking",
    name: "Agent Banking",
    eyebrow: "Channel",
    promise: "Agent wallets, cash-in/out, and transfers on a stable app backend.",
    related: ["payment-gateway", "remittance-system", "card-management-system"],
  },
  {
    slug: "consumer-banking",
    name: "Consumer Banking",
    eyebrow: "Channel",
    promise: "Retail journeys for accounts, payments, and self-service.",
    related: ["card-management-system", "payment-gateway", "loan-origination-system"],
  },
  {
    slug: "wallet-banking",
    name: "Wallet Banking",
    eyebrow: "Channel",
    promise: "Digital wallet experiences for balance, P2P, bills, and top-up.",
    related: ["payment-gateway", "card-management-system", "cash-management-system"],
  },
  {
    slug: "merchant-portal",
    name: "Merchant Portal",
    eyebrow: "Portal",
    promise: "Merchants manage invoices, checkout, and settlement in one place.",
    related: ["payment-gateway", "cash-management-system"],
  },
  {
    slug: "corporate-portal",
    name: "Corporate Portal",
    eyebrow: "Portal",
    promise: "Business users approve payments and view accounts under bank branding.",
    related: ["corporate-banking", "cash-management-system", "remittance-system"],
  },
]

export const services: Service[] = [
  {
    slug: "platform-implementation",
    name: "Platform implementation",
    eyebrow: "Delivery",
    summary: "Brand a FintiQ platform, connect core and rails, pass UAT with your operators.",
    audience: "Institutions that want a working platform with their own name on it.",
    outcome: "Operators sign a real journey, then run the book from the admin console we leave with them.",
    capabilities: [
      { title: "Brand and configure", body: "Name, color, roles, products, and rules set for the institution." },
      { title: "Integrate", body: "Pointed at your core, wallet host, and the payment rails in scope." },
      { title: "UAT with operators", body: "Acceptance is a live payment, transfer, card, or loan journey." },
      { title: "Handover", body: "Admin roles, runbooks, and a named contact after go-live." },
    ],
    journey: [
      { title: "Choose the platform", body: "One solution, or several that share channels and ops." },
      { title: "Fix the first release", body: "Journeys, environments, and who signs UAT." },
      { title: "Build in the open", body: "Weekly evidence against the acceptance case." },
      { title: "Go live and stay", body: "Support continues, or a squad stays on the roadmap." },
    ],
    products: products.map((p) => p.slug),
  },
  {
    slug: "payments-and-core-integration",
    name: "Payments and core integration",
    eyebrow: "Integration",
    summary: "Local rails and core behind one channel contract the app team can build against.",
    audience: "Teams whose mobile or merchant channel is waiting on a rail or a core.",
    outcome: "A contract the app team can build against, with success and failure already traced.",
    capabilities: [
      { title: "Collection and disbursement rails", body: "Callbacks, return URLs, and merchant or corridor configuration." },
      { title: "Core and wallet hosts", body: "The channel layer translates the app call into the host you already run." },
      { title: "Sandbox and collections", body: "Postman, test data, and a written contract for the other team." },
    ],
    journey: [
      { title: "Name the host", body: "Which rail or core, which environment, which first operation." },
      { title: "Write the contract", body: "Request, response, timeout, and duplicate handling." },
      { title: "Prove it", body: "A successful call and a failed call, traced end to end." },
    ],
    products: ["payment-gateway", "remittance-system", "corporate-banking", "cash-management-system"],
  },
  {
    slug: "compliance-engineering",
    name: "Compliance engineering",
    eyebrow: "Governance",
    summary: "Onboarding, KYC queues, and audit trails shaped for regulated review.",
    audience: "Compliance and operations teams that need evidence, not only screens.",
    outcome: "Workflows and logs that match how your reviewers actually decide.",
    capabilities: [
      { title: "Identity and document packs", body: "Entity and consumer paths with the checks your policy requires." },
      { title: "Review queues", body: "Holds, notes, and dual control where the framework demands it." },
      { title: "Evidence", body: "An audit trail compliance can defend." },
    ],
    journey: [
      { title: "Read the checklist", body: "Your current policy and the first journeys in scope." },
      { title: "Close the gaps", body: "Screens and queues that match the framework." },
      { title: "Train the reviewers", body: "A high-risk case walked end to end." },
    ],
    products: ["loan-origination-system", "remittance-system", "corporate-banking"],
  },
  {
    slug: "resource-augmentation",
    name: "Resource augmentation",
    eyebrow: "People",
    summary: "Payments, onboarding, cards, and lending engineers on your backlog from day one.",
    audience: "Product and technology leaders who need domain-ready capacity.",
    outcome: "Named people on your tools, shipping against your acceptance cases.",
    capabilities: [
      { title: "Domain-ready engineers", body: "Java, React, Android, payments, QA, DevOps, banking analysis." },
      { title: "Squad or specialist", body: "One person in your stand-up, or a full delivery squad." },
      { title: "Stay after build", body: "Retain capacity on the roadmap after go-live." },
    ],
    journey: [
      { title: "Scope the seat", body: "Role, tools, and the first month’s backlog." },
      { title: "Land and ship", body: "First delivery in your environment — not ramp training." },
      { title: "Extend or hand over", body: "Keep the squad, or a clean exit." },
    ],
    products: products.map((p) => p.slug),
  },
  {
    slug: "production-support",
    name: "Production support",
    eyebrow: "Run",
    summary: "Releases, monitoring, and a named contact after go-live.",
    audience: "Institutions that need cover when the channel is live.",
    outcome: "Stable releases and a clear path when something breaks.",
    capabilities: [
      { title: "Environments that match", body: "Parity between what you tested and what you run." },
      { title: "Releases", body: "Controlled changes with notes of what moved." },
      { title: "Named contact", body: "Someone accountable when operations needs an answer." },
    ],
    journey: [
      { title: "Agree the window", body: "Coverage hours and severity paths." },
      { title: "Watch the live paths", body: "Callbacks, sign-in, and the queues operators use." },
      { title: "Fix forward", body: "Ship the change the same way the platform shipped." },
    ],
    products: products.map((p) => p.slug),
  },
]

export const buyers: Buyer[] = [
  {
    title: "Banks",
    body: "Corporate banking, cards, remittance, and lending platforms connected to your core.",
    platforms: [
      { slug: "corporate-banking", label: "Corporate Banking" },
      { slug: "card-management-system", label: "Card Management System" },
      { slug: "loan-origination-system", label: "LOS" },
    ],
  },
  {
    title: "Wallets & branchless",
    body: "Agent, consumer, and wallet channels with payment and cash controls behind them.",
    platforms: [
      { slug: "payment-gateway", label: "Payment Gateway" },
      { slug: "cash-management-system", label: "Cash Management" },
      { slug: "remittance-system", label: "Remittance" },
    ],
  },
  {
    title: "Lending businesses",
    body: "Originate and service the book with LOS and LMS that share one operating model.",
    platforms: [
      { slug: "loan-origination-system", label: "LOS" },
      { slug: "loan-management-system", label: "LMS" },
    ],
  },
]

export const reasons: Block[] = [
  {
    title: "Technology partner, not a licensee claim",
    body: "FintiQ builds platforms. Licensed institutions keep funds and regulated decisions.",
  },
  {
    title: "Secure, scalable architecture",
    body: "Structured systems for payments, wallets, lending, and financial operations.",
  },
  {
    title: "Integration-ready",
    body: "APIs and channel layers that sit cleanly in front of banking infrastructure.",
  },
  {
    title: "Governance-aware delivery",
    body: "Clear milestones, UAT journeys, and audit trails operations can defend.",
  },
]

export const delivery: Block[] = [
  {
    title: "Domain-ready from week one",
    body: "Payments, cards, wallets, remittance, and lending — already shipped. Short ramp.",
  },
  {
    title: "Agentic AI in the build",
    body: "We use agentic AI where it speeds analysis, testing, and delivery — with humans accountable for release.",
  },
  {
    title: "UAT sets the clock",
    body: "Done means a live payment, transfer, card, or loan journey. That path is the plan.",
  },
  {
    title: "Support after go-live",
    body: "Production cover, a staying squad, or a specialist on your backlog.",
  },
]

export const engagements: Block[] = [
  {
    title: "One specialist",
    body: "A named engineer in your stand-up, fluent in payments, cards, or lending.",
  },
  {
    title: "A squad",
    body: "Backend, frontend, mobile, and QA on one release backlog.",
  },
  {
    title: "Build, then stay",
    body: "Ship a FintiQ platform, pass UAT, keep people on the roadmap.",
  },
  {
    title: "A retainer",
    body: "Production fixes and small changes, with a clean handover.",
  },
]

export const roles = [
  "Java and Spring Boot",
  "React",
  "Android agent and wallet apps",
  "Payment integration",
  "QA and UAT",
  "DevOps",
  "Banking business analysis",
  "AI-assisted delivery",
]

export const work: CaseStudy[] = [
  {
    title: "Institutional payment gateway",
    problem: "Collections, settlement, and merchant ops lived in separate tools.",
    shipped: "Payment gateway with merchant portal, checkout, and settlement desk.",
    result: "Institution runs the merchant book. Platform runs the payment path.",
  },
  {
    title: "Corporate banking portal",
    problem: "Business clients needed approvals and bulk payments without branch friction.",
    shipped: "Corporate portal with maker-checker flows wired to the core.",
    result: "Corporate ops signed a live payment journey in UAT.",
  },
  {
    title: "Lending stack",
    problem: "Origination and servicing were split across spreadsheets and legacy screens.",
    shipped: "LOS into LMS with a shared operating model for the lending desk.",
    result: "Application through repayment tracked in one governed pipeline.",
  },
]

export const railPartners = [
  { name: "Payment rails", note: "Collection & payout" },
  { name: "Core banking", note: "System of record" },
  { name: "Identity", note: "KYC checks" },
  { name: "Card networks", note: "Issuance paths" },
]

export const integrations: (Block & { href: string })[] = [
  {
    title: "Payment Gateway API",
    body: "Create, initiate, and read status — same shape in test and live.",
    href: "/products/payment-gateway",
  },
  {
    title: "Corporate banking channel",
    body: "Approvals and bulk payments against a documented contract.",
    href: "/products/corporate-banking",
  },
  {
    title: "Lending handoff",
    body: "LOS decision into LMS servicing without a spreadsheet bridge.",
    href: "/products/loan-origination-system",
  },
]

export const insights: Insight[] = [
  {
    slug: "technology-partner-in-regulated-markets",
    eyebrow: "Governance",
    title: "Building as a technology partner in regulated markets",
    summary: "Platforms for institutions that keep the license, the ledger, and the decision.",
    paragraphs: [
      "Fintech systems must operate reliably and handle financial data in a structured way. FintiQ builds platforms that support controlled financial workflows while aligning with regulated environments.",
      "We operate strictly as a technology development partner. Licensed financial institutions remain the system of record for customer funds and for regulated decisions such as account opening and credit approval.",
      "Delivery is measured by a real UAT journey — a payment, transfer, card, or loan path signed by the institution’s operators — not by slide decks alone.",
    ],
  },
  {
    slug: "agentic-ai-in-fintech-delivery",
    eyebrow: "AI",
    title: "Agentic AI that speeds delivery without skipping governance",
    summary: "Faster analysis, tests, and documentation — with humans accountable for release.",
    paragraphs: [
      "We use agentic AI to accelerate engineering work: exploring APIs, drafting tests, reviewing diffs, and preparing release notes so squads spend more time on the journeys that matter.",
      "Appropriate use means AI assists the build. Release authority, access to production, and regulated decisions stay with people and with the licensed institution.",
      "The result is shorter cycles on platform implementation and integration work, without weakening the audit trail operations and compliance expect.",
    ],
  },
  {
    slug: "channels-behind-one-operating-model",
    eyebrow: "Channels",
    title: "Agent, consumer, wallet, and portals on one operating model",
    summary: "Channels differ. The books, rails, and controls behind them should not.",
    paragraphs: [
      "Agent banking, consumer banking, and wallet banking are how customers and agents meet the institution. Merchant and corporate portals are how businesses operate day to day.",
      "FintiQ represents those channels on top of shared platforms — payment gateway, cards, cash, remittance, and lending — so each channel does not invent its own ledger.",
      "The first UAT is always a real journey on the channel in scope, with core and rails still behind the platform.",
    ],
  },
]

export type NavItem = {
  href: string
  label: string
  children?: { href: string; label: string; note: string }[]
}

export const navigation: NavItem[] = [
  {
    href: "/products",
    label: "Solutions",
    children: products.map((product) => ({
      href: `/products/${product.slug}`,
      label: product.name,
      note: product.promise,
    })),
  },
  {
    href: "/services",
    label: "Services",
    children: services.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.name,
      note: service.eyebrow,
    })),
  },
  { href: "/delivery", label: "Delivery" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug)
}

export function getChannel(slug: string) {
  return channels.find((channel) => channel.slug === slug)
}
