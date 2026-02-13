import { Product } from "@/types/product.type";

export default async function getSpecificBrand(id: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Brand products API error:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("getSpecificBrand error:", error);
    return [];
  }
}
