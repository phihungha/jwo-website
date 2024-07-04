"use client";
import React, { useEffect, useState } from "react";
import { VStack, Text } from "@chakra-ui/react";
import io from "socket.io-client";
import { CartItem } from "./types/types";
import CardItem from "./components/CardItem";
const socket = io("http://localhost:5000/cart");
export default function Home() {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);

  useEffect(() => {
    socket.emit("get");
    socket.on("cart-updated", (data) => {
      console.log(data);
      let temp = data as CartItem[];
      setShoppingCart(temp);
      console.log(shoppingCart);
    });
    return () => {
      socket.off("cart-updated");
    };
  }, []);

  return (
    <main>
      <Text paddingBottom="10" fontWeight="bold" fontSize="2xl">
        Shop Cart
      </Text>
      <VStack spacing={4} align="stretch">
        {shoppingCart.map((item) => (
          <div key={item.productId}>
            <CardItem
              product={item.product}
              productId={item.productId}
              quantity={item.quantity}
              linePrice={item.linePrice}
              unitPrice={item.unitPrice}
            />
          </div>
        ))}
      </VStack>
    </main>
  );
}
