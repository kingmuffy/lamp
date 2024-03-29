"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuatity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { formatPrice } from "../../../utils/formatPrice";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);
  const shouldRenderImageDiv = product.id === "65a1d55ca9b405a11890e132";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <Rating value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
          </div>
          <Horizontal />
          <div className="text-justify">{product.description}</div>
          <Horizontal />
          <div>
            <span className="font-semibold">CATEGORY:</span> {product.category}
          </div>
          <div>
            <span className="font-semibold">BRAND:</span> {product.brand}
          </div>
          <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </div>
          <div className="font-semibold">{formatPrice(product.price)}</div>

          <Horizontal />
          {isProductInCart ? (
            <>
              <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400" size={20} />
                <span>Product added to cart</span>
              </p>
              <div className="max-w-[300px]">
                <Button
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
              <Horizontal />
              <SetQuatity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              {product.inStock ? (
                <div className="max-w-[300px]">
                  <Button
                    label="Add To Cart"
                    onClick={() => handleAddProductToCart(cartProduct)}
                  />
                </div>
              ) : (
                <div className="max-w-[300px]">
                  <Button label="Out of Stock" disabled />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div></div>
      <div className="w-full mt-4 md:mt-0 py-20 px-4">
        {shouldRenderImageDiv && (
          <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3">
            <img
              src="/IMG_2660.jpg"
              alt="secure"
              className="w-full  rounded-md"
            />
            <img
              src="/IMG_2661.jpg"
              alt="secure"
              className="w-full  rounded-md"
            />
            <img
              src="/IMG_2652.jpg"
              alt="secur"
              className="w-full  rounded-md"
            />
            <img src="/IMG_2653.jpg" alt="secu" className="w-full rounded-md" />
            <img src="/IMG_2654.jpg" alt="sec" className="w-full rounded-md" />
            <img src="/4.jpg" alt="sec" className="w-full h-64 rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
