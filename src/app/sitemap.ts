import type { MetadataRoute } from "next";
import { company, products, services } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;

  const staticRoutes = ["", "/products", "/services", "/delivery", "/work", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const productRoutes = products.map((product) => ({
    url: `${base}/products/${product.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes];
}
