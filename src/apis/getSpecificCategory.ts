import { Product } from "@/types/product.type";

export default async function getSpecificCategory(id: string): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;

  if (!base) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return [];
  }

  const url = `${base}/products?category=${encodeURIComponent(id)}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text();
    console.error("Category products API error:", res.status, text);
    return [];
  }

  try {
    const json = await res.json();
    return json.data ?? json ?? [];
  } catch (e) {
    console.error("JSON parse error in getSpecificCategory:", e);
    return [];
  }
}
