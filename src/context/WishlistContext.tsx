"use client";
import { WishlistItem } from "@/types/wishlist.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext<{
  getUserWishlist: () => void;
  wishlist: WishlistItem[];
  wishlistIdProducts: string[];
  addToWishlist: (productId: string) => void;
  deleteFromWishlist: (productId: string) => void;
  isLoadingId: string | null;
  isLoading: boolean;
}>(null as any);

const WishlistContextProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistIdProducts, setWishlistIdProducts] = useState<string[]>([]);
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const token = (session.data as any)?.token;

  const getUserWishlist = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/getWishlist", {
        headers: {
          token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load wishlist");
      }

      const res = await response.json();
      const data: WishlistItem[] = res.data || [];

      setWishlist(data);
      setWishlistIdProducts(data.map((p) => p._id));
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (wishlistIdProducts.includes(productId)) return;

    setIsLoadingId(productId);

    try {
      const response = await fetch("/api/addToWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId }),
      });

      const res = await response.json();

      if (!response.ok) throw new Error("Add failed");

      setWishlist((prev) => [...prev, res.data]);
      setWishlistIdProducts((prev) => [...prev, productId]);

      toast("Added to wishlist ❤️");
    } catch (err) {
      toast.error("Failed to add");
    } finally {
      setIsLoadingId(null);
    }
  };

  const deleteFromWishlist = async (productId: string) => {
    if (!token) {
      router.push("/login");
      return;
    }

    setIsLoadingId(productId);

    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          token,
        },
      });

      if (!response.ok) throw new Error("Delete failed");

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      setWishlistIdProducts((prev) => prev.filter((id) => id !== productId));

      toast("Removed from wishlist 💔");
    } catch (err) {
      toast.error("Failed to remove");
    } finally {
      setIsLoadingId(null);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      getUserWishlist();
    }

    if (session.status === "unauthenticated") {
      setWishlist([]);
      setWishlistIdProducts([]);
    }
  }, [session.status]);

  return (
    <WishlistContext.Provider
      value={{
        getUserWishlist,
        wishlist,
        wishlistIdProducts,
        addToWishlist,
        deleteFromWishlist,
        isLoading,
        isLoadingId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
