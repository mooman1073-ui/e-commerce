"use client";
import React, { useContext } from "react";
import { Button } from "./button";
import { Heart, Loader2 } from "lucide-react";
import { WishlistContext } from "@/context/WishlistContext";

const AddToWishlistButton = ({ productId }: { productId: string }) => {
  const { addToWishlist, deleteFromWishlist, wishlistIdProducts, isLoadingId } =
    useContext(WishlistContext);

  const isInWishlist = wishlistIdProducts.includes(productId);

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 cursor-pointer transition ${
        isInWishlist ? "bg-red-500 text-white" : ""
      }`}
      onClick={() => {
        if (isInWishlist) {
          deleteFromWishlist(productId);
        } else {
          addToWishlist(productId);
        }
      }}
      disabled={isLoadingId === productId}
    >
      {isLoadingId === productId ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Heart size={18} /> {isInWishlist ? "Remove" : "Wishlist"}
        </>
      )}
    </Button>
  );
};

export default AddToWishlistButton;
