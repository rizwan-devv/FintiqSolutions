import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/industries", destination: "/", permanent: false },
      { source: "/insights", destination: "/work", permanent: false },
      { source: "/products/paybridge", destination: "/products/payment-gateway", permanent: false },
      { source: "/products/corporate-onboarding", destination: "/products/corporate-banking", permanent: false },
      { source: "/products/card-management", destination: "/products/card-management-system", permanent: false },
      { source: "/products/card-payment-system", destination: "/products/card-management-system", permanent: false },
      { source: "/products/agent-banking", destination: "/products/payment-gateway", permanent: false },
      { source: "/products/core-switch", destination: "/products/corporate-banking", permanent: false },
      { source: "/products/operations-back-office", destination: "/products/cash-management-system", permanent: false },
      {
        source: "/insights/entity-onboarding-framework",
        destination: "/insights/technology-partner-in-regulated-markets",
        permanent: false,
      },
      {
        source: "/insights/merchant-collections-on-local-rails",
        destination: "/insights/channels-behind-one-operating-model",
        permanent: false,
      },
      {
        source: "/insights/agent-app-one-host",
        destination: "/insights/agentic-ai-in-fintech-delivery",
        permanent: false,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
