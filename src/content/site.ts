export const company = {
  legalName: "Fintiq Solutions (Private) Limited",
  lines: ["House # 5, Street 7, Block C", "Naval Anchorage, Islamabad"],
  emails: [
    { label: "For Info", address: "info@fintiqsolutions.com" },
    { label: "For Support", address: "info@fintiqsolutions.com" },
  ],
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

export const products: Product[] = [
  {
    slug: "paybridge",
    name: "PayBridge",
    eyebrow: "Merchant collections",
    promise: "Collect, invoice, disburse, and settle.",
    summary:
      "A branded merchant payment platform for invoices, hosted checkout, local rails, settlement, and disbursement. Merchant configuration chooses the processor.",
    audience:
      "Payment companies, banks that want their own internet payment gateway, and institutions that collect fees at scale.",
    outcome:
      "A merchant self-service stack with an admin console, an open collection API, and a checkout path that stays separate from the back office.",
    capabilities: [
      {
        title: "Merchant and admin portals",
        body: "Merchants manage invoices, payment configuration, and settlement. Your operations team manages merchants, MDR, and the gateways each merchant is allowed to use.",
      },
      {
        title: "Hosted checkout",
        body: "An invoice becomes a payment session. JazzCash, Easypaisa, and PayFast are already in the product, selected per merchant rather than hard-coded in the storefront.",
      },
      {
        title: "A two-call collection API",
        body: "Create and initiate a payment, then read its status. The merchant supplies a callback URL and handles the response. The same shape works in test and live.",
      },
      {
        title: "MDR, settlement, and disbursement",
        body: "Pricing, what the merchant is owed, and payouts live next to the collection, so finance is not reconciling three tools at month end.",
      },
      {
        title: "Storefront plugin",
        body: "A WooCommerce plugin lets an online store collect through the same platform the merchant portal already runs.",
      },
    ],
    journey: [
      {
        title: "Brand the portals",
        body: "Name, color, and merchant language become the institution’s. The collection engine stays.",
      },
      {
        title: "Connect the rails",
        body: "JazzCash, Easypaisa, and PayFast credentials land in merchant payment config, with callbacks on a public HTTPS address.",
      },
      {
        title: "Prove a payment",
        body: "Invoice, checkout, callback, status, and a settlement line are walked with operations before go-live.",
      },
      {
        title: "Open it to merchants",
        body: "The institution invites merchants, sets MDR, and runs the book from the admin console.",
      },
    ],
    services: ["platform-implementation", "payments-and-core-integration", "production-support"],
  },
  {
    slug: "corporate-onboarding",
    name: "Corporate Onboarding",
    eyebrow: "Entity accounts",
    promise: "Open entity accounts without a branch visit.",
    summary:
      "A web portal for the business and a mobile app for every person who must complete KYC themselves. Operations reviews the case, then approval provisions the account.",
    audience:
      "Banks, branchless-banking providers, and EMIs opening accounts for sole proprietors, small businesses, partnerships, and LLPs.",
    outcome:
      "Branchless entity onboarding that an operations desk can approve, with each partner completing their own KYC and a tracking ID the applicant can follow.",
    capabilities: [
      {
        title: "Entity types already modeled",
        body: "Sole proprietorship, small business, partnership, and LLP, with the document pack and partner rules that belong to each.",
      },
      {
        title: "Portal for the firm, app for the people",
        body: "The lead files the entity. Each partner gets an invite, a one-time PIN, and completes CNIC, selfie, and a NADRA fingerprint check in the app. The fingerprint is verified and not stored.",
      },
      {
        title: "Review the case, then provision",
        body: "Sanctions, identity, and documents sit in an admin queue. Approval calls the account API and the new corporate user can sign in.",
      },
      {
        title: "Built against the onboarding framework",
        body: "Entity fields, annex documents, risk rating, a written decision window, and a draft the applicant can resume. High-risk cases carry extra review notes.",
      },
      {
        title: "A skin per institution",
        body: "The same platform takes the institution’s name, colors, app link, and the account system it must provision into.",
      },
    ],
    journey: [
      {
        title: "Confirm the entity types",
        body: "We lock which of the four entity types go live first, and which documents your compliance team expects.",
      },
      {
        title: "Connect identity and the core",
        body: "OTP, NADRA, and the account-provisioning API are pointed at the institution’s environments.",
      },
      {
        title: "Walk a partnership",
        body: "Lead, two partners on the app, document upload, admin decision, and a provisioned account. That case is the UAT script.",
      },
      {
        title: "Hand the queue to operations",
        body: "Reviewers work the tracking ID, the risk rating, and the decision. Applicants see where the case stands.",
      },
    ],
    services: ["platform-implementation", "onboarding-and-compliance", "resource-augmentation"],
  },
  {
    slug: "card-management",
    name: "Card Management",
    eyebrow: "Issuance and servicing",
    promise: "Issue and service cards under one control plane.",
    summary:
      "The card desk and the cardholder app share one system: request, approval, generation, limits, PIN, status, and an audit of who changed what.",
    audience:
      "Banks and wallet companies that issue cards and need the legacy card rules preserved in a system their own teams can run.",
    outcome:
      "One control plane for issuance and servicing, with card data protected at rest and a separate API for the cardholder app.",
    capabilities: [
      {
        title: "Request through to a live card",
        body: "A request is approved, the card is generated, and a production or bureau file can be written for the printer. The file is never served back through the API.",
      },
      {
        title: "Everyday servicing",
        body: "Inquiry, status change, PIN change, forgotten PIN, products, limits, available limit, and spending summary.",
      },
      {
        title: "The desk’s own reference data",
        body: "Banks, branches, products, and statuses are maintained in the portal, with users, roles, and permissions around them.",
      },
      {
        title: "Card data stays protected",
        body: "PAN and other cardholder data are encrypted at rest. Staff lookup uses a hash. The browser does not become a place where a full PAN casually appears.",
      },
      {
        title: "Two doors",
        body: "A portal API for the card desk and a mobile API for the cardholder app, so the app team is not clicking through back-office screens.",
      },
    ],
    journey: [
      {
        title: "Map the card products",
        body: "Products, limits, statuses, and the bureau file format are confirmed against the way the desk works today.",
      },
      {
        title: "Stand up portal and app APIs",
        body: "The desk gets the console. The app gets inquiry, status, limits, and PIN.",
      },
      {
        title: "Prove a card",
        body: "Request, approve, generate, set a limit, change a PIN, and read the audit line. That is the acceptance case.",
      },
      {
        title: "Leave the rules with the bank",
        body: "Roles and reference data stay in the institution’s hands after go-live.",
      },
    ],
    services: ["platform-implementation", "production-support", "resource-augmentation"],
  },
  {
    slug: "agent-banking",
    name: "Agent Banking",
    eyebrow: "Agent channel",
    promise: "Give agents a wallet, payments, and cash movement.",
    summary:
      "One API surface for the agent app: device binding, balance, limits, QR, transfers, bills, and cash in or out. Money movement continues to the core. The app talks only to Fintiq.",
    audience:
      "Institutions whose agents or corporate users cash in, cash out, transfer, and pay bills from an Android app.",
    outcome:
      "A stable app backend the institution owns, with the existing transaction platform still the system of record for the payment.",
    capabilities: [
      {
        title: "Login and the device",
        body: "Login, device OTP, and registration are handled here, so a replaced phone is a product flow rather than a core change.",
      },
      {
        title: "What the agent sees",
        body: "Balance, limits, mini-statement, and QR, served to the app without a fan-out of core hosts.",
      },
      {
        title: "What the agent does with money",
        body: "IBFT, wallet-to-wallet, bill payment, and cash-in / cash-out are accepted by this API and forwarded to the transaction platform.",
      },
      {
        title: "One base URL for the app",
        body: "The Android team points at a single host. Core addresses stay behind that host.",
      },
    ],
    journey: [
      {
        title: "List the agent journeys",
        body: "Cash-in, cash-out, transfer, and bill pay are ordered by what must work on day one.",
      },
      {
        title: "Point the forwarder at the core",
        body: "The API keeps device and session logic, and forwards the payment to the institution’s transaction host.",
      },
      {
        title: "Run the app against one host",
        body: "Login, a balance, and one successful transfer are the first UAT. Failed and duplicate cases follow.",
      },
      {
        title: "Keep the app team unblocked",
        body: "When the core is down or changing, the app still builds against the same contract.",
      },
    ],
    services: ["platform-implementation", "payments-and-core-integration", "resource-augmentation"],
  },
  {
    slug: "core-switch",
    name: "Core Switch",
    eyebrow: "Channel integration",
    promise: "Put a stable API between the app and the core.",
    summary:
      "A channel layer in front of the core banking system. The mobile team integrates once. Core screens and core changes stay behind the switch.",
    audience:
      "Banks fitting a new mobile channel onto a core that was not designed for that app.",
    outcome:
      "The app team builds against a documented sandbox, then the same contract turns toward the real core.",
    capabilities: [
      {
        title: "A channel API",
        body: "Account and OTP flows the app needs, shaped for a mobile channel rather than for a branch screen.",
      },
      {
        title: "A sandbox before the core is ready",
        body: "Health, test data, and a Postman collection so the app can be built while the core connection is still being agreed.",
      },
      {
        title: "The core stays the core",
        body: "Balances and postings remain in the core banking system. The switch is the translation, not a second ledger.",
      },
      {
        title: "A handoff the vendor can read",
        body: "API guide, test data, and a collection. The app team and the core team share one description of the contract.",
      },
    ],
    journey: [
      {
        title: "Name the first journeys",
        body: "The smallest set of core operations the app must complete, written as API operations.",
      },
      {
        title: "Give the app a sandbox",
        body: "The mobile team integrates against the switch with published test data.",
      },
      {
        title: "Turn the switch toward the core",
        body: "The same contract is backed by the core system. The app does not retarget.",
      },
      {
        title: "Keep the contract",
        body: "Later core changes are absorbed in the switch, with the app’s calls left intact.",
      },
    ],
    services: ["payments-and-core-integration", "platform-implementation", "production-support"],
  },
  {
    slug: "operations-back-office",
    name: "Operations Back Office",
    eyebrow: "Control room",
    promise: "Run customers, KYC, money movement, and audit from one console.",
    summary:
      "The console for the team that runs a live wallet or payments product: customers, the KYC queue, wallets, transactions, callbacks, roles, and an audit log.",
    audience:
      "Operations, finance, and compliance teams who currently share spreadsheets and direct database access.",
    outcome:
      "One console, with personal data masked for staff who should not see the full record, and a trail of who did what.",
    capabilities: [
      {
        title: "Customers and KYC",
        body: "A customer record, a KYC queue, and a funnel report so compliance can see where cases stall.",
      },
      {
        title: "Money movement",
        body: "Wallets, transactions, failed transactions, and callbacks, including the ones that need a human.",
      },
      {
        title: "Who may do what",
        body: "Admin users, roles, and menus. A reviewer and a finance user do not share the same actions.",
      },
      {
        title: "Audit and reports",
        body: "An audit log, volume, growth, and system health, exported when finance needs a file.",
      },
      {
        title: "Masked by default",
        body: "Staff see what their role allows. The full personal record is not the casual view.",
      },
    ],
    journey: [
      {
        title: "Sit with operations",
        body: "The queues they actually work — KYC, failed payments, callbacks — become the home of the console.",
      },
      {
        title: "Set the roles",
        body: "Compliance, finance, and support each get a menu. Audit is on for every sensitive action.",
      },
      {
        title: "Connect the live book",
        body: "Customers, wallets, and transactions read from the running platform.",
      },
      {
        title: "Retire the spreadsheet",
        body: "The daily questions move into the console, with a report when a number has to leave the building.",
      },
    ],
    services: ["platform-implementation", "production-support", "resource-augmentation"],
  },
]

export const services: Service[] = [
  {
    slug: "platform-implementation",
    name: "Platform implementation",
    eyebrow: "Delivery",
    summary:
      "We brand a Fintiq platform, connect it to your core and your rails, and take it through UAT with the people who will run it.",
    audience:
      "An institution that wants a working platform with its own name on it, on a timeline operations can plan around.",
    outcome:
      "Your operators sign a real journey, then run the book from the admin console we leave with them.",
    capabilities: [
      {
        title: "Brand and configure",
        body: "Name, color, app identity, entity types, card products, merchant rules, and roles are set for the institution, not left as a generic demo.",
      },
      {
        title: "Integrate",
        body: "The platform is pointed at your core, your wallet host, and the local payment rails the product already speaks.",
      },
      {
        title: "UAT with the operators",
        body: "The acceptance case is a real journey: an invoice collected, an entity approved, a card issued, or an agent transfer completed.",
      },
      {
        title: "Leave a system your team can run",
        body: "Admin roles, runbooks, and a named handover. The institution operates the book.",
      },
    ],
    journey: [
      {
        title: "Choose the platform",
        body: "One product, or several that share onboarding, cards, and payments.",
      },
      {
        title: "Fix the first release",
        body: "The journeys in scope, the environments, and the people who sign UAT.",
      },
      {
        title: "Build in the open",
        body: "Weekly evidence against the acceptance case, in your environment.",
      },
      {
        title: "Go live and stay",
        body: "Support continues, or a squad stays on the roadmap through resource augmentation.",
      },
    ],
    products: ["paybridge", "corporate-onboarding", "card-management", "agent-banking", "core-switch", "operations-back-office"],
  },
  {
    slug: "payments-and-core-integration",
    name: "Payments and core integration",
    eyebrow: "Integration",
    summary:
      "JazzCash, Easypaisa, PayFast, billers, and the core or wallet host behind an app. The channel gets one contract. The hosts stay behind it.",
    audience:
      "Teams whose mobile or merchant channel is waiting on a payment rail or a core that speaks a different language.",
    outcome:
      "A contract the app team can build against, with a successful call and a failed call already traced.",
    capabilities: [
      {
        title: "Local collection rails",
        body: "JazzCash, Easypaisa, and PayFast, including callbacks, return URLs, and the merchant configuration that selects them.",
      },
      {
        title: "Disbursement and bills",
        body: "Payouts and bill payment isolated from the portal, so a gateway change does not rewrite the merchant experience.",
      },
      {
        title: "Core and wallet hosts",
        body: "The switch or the agent API translates the app’s call into the host the institution already runs.",
      },
      {
        title: "A collection the other team can run",
        body: "Postman, test data, and a written contract so the app vendor and the core team are not guessing.",
      },
    ],
    journey: [
      {
        title: "Name the host",
        body: "Which rail or core, which environment, and which first operation.",
      },
      {
        title: "Write the contract",
        body: "The request, the response, and the failures, including timeout and duplicate.",
      },
      {
        title: "Prove it with their sandbox",
        body: "A successful call and a failed call, traced end to end.",
      },
      {
        title: "Hand over the collection",
        body: "The other team keeps the collection. We keep the integration when you want us to.",
      },
    ],
    products: ["paybridge", "agent-banking", "core-switch"],
  },
  {
    slug: "onboarding-and-compliance",
    name: "Onboarding and compliance engineering",
    eyebrow: "KYC",
    summary:
      "Entity KYC journeys, NADRA checks, a sanctions review queue, and the audit trail your compliance team will ask to see.",
    audience:
      "Compliance and onboarding leads who need a digital entity journey they can defend, with operations still making the decision.",
    outcome:
      "A review queue, a tracking ID, and an audit of the decision. The institution still makes the decision.",
    capabilities: [
      {
        title: "The entity journey",
        body: "Fields, documents, partners, and the resume window, aligned to the SBP consolidated customer-onboarding framework for entity opening.",
      },
      {
        title: "Identity",
        body: "CNIC capture and a NADRA fingerprint check on the partner’s own phone. The check is the record. The fingerprint image is not kept.",
      },
      {
        title: "The review queue",
        body: "Sanctions and identity start pending. A person clears or rejects, with a reason the applicant can be given in writing.",
      },
      {
        title: "Evidence",
        body: "Tracking ID, risk rating, decision time, and an audit of the review. The regulated institution remains the institution that decides.",
      },
    ],
    journey: [
      {
        title: "Read your current checklist",
        body: "We map the desk’s entity checklist onto the platform’s entity types.",
      },
      {
        title: "Close the gaps",
        body: "Documents, risk rules, and the wording of a rejection are adjusted to the institution.",
      },
      {
        title: "Run a high-risk case",
        body: "Extra review notes and the path a high-risk file takes before anyone is approved.",
      },
      {
        title: "Train the reviewers",
        body: "The queue, the tracking ID, and what approval actually provisions.",
      },
    ],
    products: ["corporate-onboarding", "operations-back-office"],
  },
  {
    slug: "resource-augmentation",
    name: "Resource augmentation",
    eyebrow: "People",
    summary:
      "Engineers who already know payments, onboarding, and cards, placed on your backlog, in your tools, on the stack these platforms are built with.",
    audience:
      "A product or engineering lead who needs a person or a squad and does not want the first month spent learning what an MDR or an entity KYC case is.",
    outcome:
      "Named people on your backlog, in your repository, with a handover note when someone rolls off.",
    capabilities: [
      {
        title: "Java and Spring Boot",
        body: "API engineers for portals, switches, payment services, and the account flows behind an app.",
      },
      {
        title: "React and TypeScript",
        body: "Portal engineers for merchant admin, onboarding, card desks, and operations consoles.",
      },
      {
        title: "Android",
        body: "Engineers for KYC apps and agent apps, including the device and OTP journeys those apps depend on.",
      },
      {
        title: "Payments, QA, and DevOps",
        body: "Gateway integration, UAT collections, Docker environments, reverse proxies, database migrations, and log review.",
      },
      {
        title: "Banking analysis",
        body: "Analysts who can sit with operations on onboarding, cards, and settlement and turn that into a backlog.",
      },
    ],
    journey: [
      {
        title: "One specialist",
        body: "A named role, embedded in your stand-up and your repository.",
      },
      {
        title: "A squad",
        body: "Backend, frontend, mobile, and QA, sized to a release rather than to a headcount target.",
      },
      {
        title: "Build, then stay",
        body: "A team implements a Fintiq platform and leaves people on the roadmap after go-live.",
      },
      {
        title: "A retainer",
        body: "Production fixes and small changes, with handover notes when someone rolls off.",
      },
    ],
    products: ["paybridge", "corporate-onboarding", "card-management", "agent-banking", "operations-back-office"],
  },
  {
    slug: "production-support",
    name: "Production support",
    eyebrow: "Run",
    summary:
      "Environments, releases, monitoring, and a named contact after go-live. The platform stays current without your team learning our deploy by accident.",
    audience:
      "The team that owns the live service and wants releases, logs, and a person to call when a callback stops arriving.",
    outcome:
      "A release path, something to look at when a payment or a KYC case stalls, and a named contact.",
    capabilities: [
      {
        title: "Environments that match",
        body: "Docker-based delivery so test and production are the same shape, with secrets kept out of the repository.",
      },
      {
        title: "Releases",
        body: "A known path from the branch you approved to the host that serves customers.",
      },
      {
        title: "Something to look at",
        body: "Health, logs, and the failed payments or KYC cases that need a person.",
      },
      {
        title: "A named contact",
        body: "After go-live the question has a destination. Runbooks travel with the release.",
      },
    ],
    journey: [
      {
        title: "Agree the window",
        body: "Hours, severity, and who on your side can approve a production change.",
      },
      {
        title: "Watch the live paths",
        body: "Callbacks, sign-in, and the queue your operators actually use.",
      },
      {
        title: "Fix forward",
        body: "A change ships the same way the platform shipped, with a note of what moved.",
      },
      {
        title: "Hand back when you want",
        body: "Your team can take the runbooks. We can stay on a retainer. Both are a planned step.",
      },
    ],
    products: ["paybridge", "card-management", "core-switch", "operations-back-office"],
  },
]

export const buyers: Buyer[] = [
  {
    title: "Banks",
    body: "Islamic and conventional banks opening entity accounts, issuing cards, running an agent channel, or putting a new app in front of the core.",
    platforms: [
      { slug: "corporate-onboarding", label: "Corporate Onboarding" },
      { slug: "card-management", label: "Card Management" },
      { slug: "core-switch", label: "Core Switch" },
    ],
  },
  {
    title: "Wallets and branchless banking",
    body: "A wallet or branchless provider whose agents cash in and out, whose partners complete KYC on a phone, and whose operations desk needs one console after launch.",
    platforms: [
      { slug: "agent-banking", label: "Agent Banking" },
      { slug: "corporate-onboarding", label: "Corporate Onboarding" },
      { slug: "operations-back-office", label: "Operations Back Office" },
    ],
  },
  {
    title: "Payment companies",
    body: "A payments business that wants its own merchant gateway: invoices, hosted checkout, settlement, and disbursement, with the rail chosen per merchant.",
    platforms: [
      { slug: "paybridge", label: "PayBridge" },
      { slug: "operations-back-office", label: "Operations Back Office" },
    ],
  },
  {
    title: "Institutions that collect fees",
    body: "A university, a utility, or any institution that invoices a large payer base and needs checkout and reconciliation the finance team can see.",
    platforms: [{ slug: "paybridge", label: "PayBridge" }],
  },
]

export const reasons: Block[] = [
  {
    title: "The institution stays the system of record",
    body: "Fintiq builds the channel. Customer funds and the decision to open an account stay with the regulated institution.",
  },
  {
    title: "White-label for each institution",
    body: "Name, colors, app identity, and the account or core system behind it are set per deployment. The platform stays.",
  },
  {
    title: "The app integrates once",
    body: "A channel API sits in front of the core. The mobile team builds against one contract. Core changes stay behind the switch.",
  },
  {
    title: "Local rails, and the onboarding framework",
    body: "Collections run on JazzCash, Easypaisa, and PayFast. Entity opening follows the SBP consolidated customer-onboarding framework.",
  },
]

export const engagements: Block[] = [
  {
    title: "One specialist",
    body: "A named engineer or analyst in your stand-up and your repository, already fluent in payments, onboarding, or cards.",
  },
  {
    title: "A squad",
    body: "Backend, frontend, mobile, and QA, sized to a release. Java, React, and Android sit on the same backlog.",
  },
  {
    title: "Build, then stay",
    body: "A team implements a Fintiq platform, passes UAT with your operators, and leaves people on the roadmap after go-live.",
  },
  {
    title: "A retainer",
    body: "Production fixes and small changes, with a handover note when someone rolls off.",
  },
]

export const roles = [
  "Java and Spring Boot",
  "React",
  "Android KYC and agent apps",
  "Payment integration",
  "QA and UAT",
  "DevOps",
  "Banking business analysis",
]

export const work: CaseStudy[] = [
  {
    title: "Institutional collections",
    problem:
      "An institution needed merchants to invoice and collect on local rails, then see what they were owed without reconciling three tools.",
    shipped:
      "Merchant and admin portals, hosted checkout on JazzCash, Easypaisa, and PayFast, MDR, settlement, disbursement, and a two-call collection API.",
    result: "The institution runs the merchant book. The platform runs the payment path.",
  },
  {
    title: "Corporate onboarding for a bank",
    problem: "Entity accounts still depended on a branch visit, and each partner’s identity lived in a paper file.",
    shipped:
      "A portal for the firm, a mobile app for CNIC, selfie, and a NADRA fingerprint check, then an operator review that provisions the account.",
    result: "The applicant follows a tracking ID. The bank makes the decision and remains the system of record.",
  },
  {
    title: "The same onboarding, a second brand",
    problem: "A wallet brand needed that entity journey with its own name, app, and account target.",
    shipped: "The same platform, skinned for the wallet and pointed at its own account system.",
    result: "One onboarding product. Two institutions. Each keeps its own identity.",
  },
  {
    title: "Cards for a wallet app",
    problem: "Card requests, limits, and PIN changes were split from the app the cardholder uses.",
    shipped:
      "A desk portal for request, approval, generation, limits, and PIN, and a separate API for the app. The PAN stays encrypted at rest.",
    result: "The desk and the app share one control plane. A bureau file is never served by the API.",
  },
  {
    title: "A channel in front of the core",
    problem: "A new mobile channel had to sit on a core that was built for branch screens.",
    shipped: "A channel API, a sandbox with health and OTP, and a Postman collection, later backed by the core on the same contract.",
    result: "The app team integrated once. Balances and postings stayed in the core.",
  },
]

export const railPartners = [
  { name: "JazzCash", note: "Wallet collection" },
  { name: "Easypaisa", note: "Wallet collection" },
  { name: "PayFast", note: "Account collection" },
  { name: "NADRA", note: "Identity check" },
]

export const integrations: (Block & { href: string })[] = [
  {
    title: "PayBridge, two calls",
    body: "Create and initiate a payment, then read status. The merchant supplies the callback. The same shape runs in test and live.",
    href: "/products/paybridge",
  },
  {
    title: "WooCommerce plugin",
    body: "An online store collects through the merchant platform the institution already operates.",
    href: "/products/paybridge",
  },
  {
    title: "Core Switch sandbox",
    body: "Health, OTP, published test data, and a Postman collection, before the same contract turns toward the core.",
    href: "/products/core-switch",
  },
]

export const insights: Insight[] = [
  {
    slug: "entity-onboarding-framework",
    eyebrow: "Onboarding",
    title: "Corporate account opening under the SBP framework",
    summary:
      "Entity type, partner KYC, a review queue, and a decision the institution still makes.",
    paragraphs: [
      "The SBP consolidated customer-onboarding framework describes how an entity account is opened: who the customer is, which documents belong to that entity type, how risk is rated, and how a decision is recorded. A form that only asks for a trade name does not meet that bar.",
      "Corporate Onboarding models four entity types: sole proprietorship, small business, partnership, and LLP. The lead files the entity in a web portal. Each partner is invited into a mobile app, confirms with a one-time PIN, and completes CNIC, a selfie, and a NADRA fingerprint check. The check is the record. The fingerprint image is not stored.",
      "Operations reviews sanctions, identity, and documents against a tracking ID. Approval is what provisions the account. The regulated institution remains the system of record for that decision and for the funds that follow. High-risk files carry extra review notes, and a draft can be resumed.",
      "The same platform takes each institution’s name, colors, app link, and the account system it must provision into. Delivery is engineering against the framework. It is not a claim that Fintiq holds an EMI, PSO, or PSP license.",
    ],
  },
  {
    slug: "merchant-collections-on-local-rails",
    eyebrow: "Collections",
    title: "Merchant collections on JazzCash, Easypaisa, and PayFast",
    summary:
      "The processor is a merchant setting. Checkout, callback, settlement, and disbursement stay in one platform.",
    paragraphs: [
      "A merchant collection platform fails when the storefront, the gateway, and the settlement file are three products. PayBridge keeps the invoice, the hosted checkout, the merchant’s allowed processors, and what the merchant is owed in one book.",
      "JazzCash, Easypaisa, and PayFast are already in the product. Merchant configuration chooses the processor. The storefront does not hard-code a rail, and a second merchant can clear on a different one.",
      "The collection API is two calls: create and initiate, then status. The merchant supplies a callback URL and handles the response. The same shape works in test and live. A WooCommerce plugin lets an online store use the platform the merchant portal already runs.",
      "MDR, settlement, and disbursement sit next to the collection, so finance is not closing the month in a spreadsheet. The institution invites merchants and runs the book from the admin console.",
    ],
  },
  {
    slug: "agent-app-one-host",
    eyebrow: "Agent banking",
    title: "An agent app that talks to one host",
    summary:
      "Device, balance, transfer, and cash movement hit Fintiq. Money movement continues to the core.",
    paragraphs: [
      "An agent app becomes expensive when every screen knows a different core address. Agent Banking gives the Android team one base URL. Login, device OTP, registration, balance, limits, QR, IBFT, wallet-to-wallet, bills, and cash-in or cash-out are accepted there.",
      "The API keeps device and session logic. Payment calls are forwarded to the institution’s transaction platform. The app does not become a second ledger, and the core stays the system of record for the movement of funds.",
      "When the core is down or changing, the app still builds against the same contract. The first UAT is a login, a balance, and one successful transfer. Failed and duplicate cases follow.",
      "Core Switch is the same idea for a bank mobile channel that is not an agent app: a sandbox with health, OTP, and a Postman collection, then the same contract turned toward the core. The app team integrates once.",
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
    label: "Platforms",
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
  { href: "/services/resource-augmentation", label: "Augmentation" },
  {
    href: "/industries",
    label: "Industries",
    children: buyers.map((buyer) => ({
      href: `/industries#${buyer.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
      label: buyer.title,
      note: buyer.platforms.map((platform) => platform.label).join(" · "),
    })),
  },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
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
