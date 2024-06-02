"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Stack, Image, Heading, Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import io from "socket.io-client";
import { ShoppingEvent, ShoppingItem } from "./types/types";
const socket = io("http://localhost:3000",{transports: ["websocket", "polling"]});
export default function Home() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [shoppingEvent, setShoppingEvent] = useState<ShoppingEvent>();
  function returnItem(item_names: string[]): void {
    let tempList: ShoppingItem[] = shoppingItems;
    let currentItems: string[] = [];
    shoppingItems.forEach((item) => {
      currentItems.push(item.name);
    });
    tempList.forEach((item) => {
      if (item_names.includes(item.name)) {
        item.quantity -= 1;
      }
    });
    console.log(shoppingItems);
    setShoppingItems(tempList);
  }

  useEffect(() => {
    socket.emit("connection");
    socket.on("Videos", (data) => {
      console.log(data); // true
    });
    return () => {
      socket.off("Videos");
    };
    }, []);

  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <a>ABC</a>
      </main>
    </ChakraProvider>
  );
}
