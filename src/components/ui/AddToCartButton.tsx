"use client";

import React, { useContext, useState } from "react";
import { Button } from "./button";
import { LoaderCircleIcon, ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddToCartButton = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const { setCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const token = (session.data as any)?.token; 

  const addToCart = async () => {
    if (session.status !== "authenticated") {
      toast("Please log in to add items to your cart");
      router.push("/login");
      return;
    }

    if (!token) {
      toast.error("Authentication error");
      router.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v2/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            productId: id,
          }),
        }
      );

      const data = await response.json();

      if (data.status !== "success") {
        toast.error(data.message || "Failed to add item");
        return;
      }

      setCartData(data);
      toast.success("Added to cart 🛒");
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={addToCart}
      className={`w-full flex items-center cursor-pointer ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <>
          <ShoppingCartIcon /> Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
