import React from "react";
import { Text } from "@chakra-ui/react";
import { Cart } from "./components/Cart";

export const metadata = {
  title: "Shopping cart",
  description: "Current shopping cart",
};

export default function Home() {
  return (
    <main>
      <Text paddingTop={10} paddingLeft={20} fontWeight="bold" fontSize="2xl">
        Shop Cart
      </Text>
      <Cart />
    </main>
  );
}
