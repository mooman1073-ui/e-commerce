import { Brand } from "@/types/Brand.type";

export default async function getAllBrands(): Promise<Brand[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Brands API error:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Brands fetch error:", error);
    return [];
  }
}
