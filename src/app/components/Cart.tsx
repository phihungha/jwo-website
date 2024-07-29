"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { CartItem } from "../types/types";
import CurrencyFormat from "../utils/currency-formats";
import { Button, HStack, VStack, Text, Divider } from "@chakra-ui/react";
import CardItem from "./CardItem";
import { motion } from "framer-motion";

const socket = io("http://localhost:5000/cart");

export function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    socket.emit("get");

    socket.on("updated", (data) => {
      setCart(data as CartItem[]);
      const total = cart.reduce(
        (total, item) => total + parseInt(item.linePrice),
        0,
      );
      setTotalPrice(total);
    });

    return () => {
      socket.off("updated");
    };
  });

  const onClear = () => {
    socket.emit("clear");
  };

  return (
    <VStack
      paddingLeft={20}
      paddingRight={20}
      paddingBottom={20}
      paddingTop={10}
      spacing={5}
      align="stretch"
    >
      <HStack justifyContent="flex-end" spacing={5}>
        <Button colorScheme="gray" variant="outline" onClick={() => onClear()}>
          Clear
        </Button>
      </HStack>
      <motion.ul transition={{ staggerChildren: 0.5 }}>
        {cart.map((item) => (
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
          {CurrencyFormat.format(totalPrice)}
        </Text>
      </HStack>
    </VStack>
  );
}
