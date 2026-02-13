import { Category } from "@/types/category.type";

export default async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Categories API error:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("getAllCategories error:", error);
    return [];
  }
}
