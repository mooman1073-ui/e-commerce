import { Product } from "@/types/product.type";

export default async function getAllProducts(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;

  
  if (!base) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return []; 
  }

  const url = `${base}/products`;

  const response = await fetch(url, {
    cache: "no-store", 
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Products API error:", response.status, text);
    return []; 
  }

  
  try {
    const json = await response.json();
    return json.data ?? json ?? [];
  } catch (e) {
    console.error("JSON parse error in products:", e);
    return [];
  }
}

