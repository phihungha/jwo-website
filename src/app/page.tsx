"use client";
import React, { useEffect, useState } from "react";
import { Button, HStack, VStack, Text, Divider } from "@chakra-ui/react";
import io from "socket.io-client";
import { CartItem } from "./types/types";
import CardItem from "./components/CardItem";
import CurrencyFormat from "./utils/currency-formats";
import { motion } from "framer-motion";
const socket = io("http://localhost:5000/cart");
export default function Home() {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState("");

  const onClear = () => {
    socket.emit("clear");
  };

  useEffect(() => {
    socket.emit("get");
    socket.on("updated", (data) => {
      let temp = data as CartItem[];
      setShoppingCart(temp);
      const total = shoppingCart.reduce(
        (acc, item) => acc + parseFloat(item.linePrice),
        0,
      );
      setTotalPrice(CurrencyFormat.format(total));
    });
    return () => {
      socket.off("updated");
    };
  });

  return (
    <main>
      <Text paddingTop={10} paddingLeft={20} fontWeight="bold" fontSize="2xl">
        Shop Cart
      </Text>
      <VStack
        paddingLeft={20}
        paddingRight={20}
        paddingBottom={20}
        paddingTop={10}
        spacing={5}
        align="stretch"
      >
        <HStack justifyContent="flex-end" spacing={5}>
          <Button
            colorScheme="gray"
            variant="outline"
            onClick={() => onClear()}
          >
            Clear
          </Button>
        </HStack>
        <motion.ul transition={{ staggerChildren: 0.5 }}>
          {shoppingCart.map((item) => (
            <motion.div
              key={item.productId}
              initial={{ x: "-50px", opacity: 0 }}
              animate={{ x: "0", opacity: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <CardItem
                product={item.product}
                productId={item.productId}
                quantity={item.quantity}
                linePrice={item.linePrice}
                unitPrice={item.unitPrice}
              />
            </motion.div>
          ))}
        </motion.ul>

        <Divider paddingTop={10} />
        <HStack justifyContent="flex-end" spacing={5}>
          <Text paddingTop={5} fontWeight="bold" fontSize="2xl">
            Total:
          </Text>
          <Text paddingTop={5} fontWeight="bold" fontSize="2xl">
            {totalPrice}
          </Text>
        </HStack>
      </VStack>
    </main>
  );
}
