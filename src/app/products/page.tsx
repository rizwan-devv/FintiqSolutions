import type { Metadata } from "next";
import { ProductsExplorer } from "@/components/product/ProductsExplorer";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Card payments, corporate banking, payment gateway, cash management, remittance, LOS, and LMS.",
};

export default function ProductsPage() {
  return (
    <main>
      <ProductsExplorer />
    </main>
  );
}
