import { Product } from "@/types/product.type";

export default async function getSpecificProducts(
  id: string
): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Specific product API error:", res.status);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (e) {
    console.error("getSpecificProducts error:", e);
    return null;
  }
}
