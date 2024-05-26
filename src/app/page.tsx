"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Stack, Image, Heading, Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import io from "socket.io-client";
import { ShoppingEvent, ShoppingItem } from "./types/types";
const socket = io("http://127.0.0.1:5000");
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

  function addItem(item_names: string[]): void {
    let tempList: ShoppingItem[] = shoppingItems;
    let currentItems: string[] = [];
    shoppingItems.forEach((item) => {
      currentItems.push(item.name);
    });
    tempList.forEach((item) => {
      if (item_names.includes(item.name)) {
        item.quantity += 1;
      }
    });
    item_names.forEach((item) => {
      if (!currentItems.includes(item)) {
        var tempItem = {
          id: item,
          name: item,
          quantity: 1,
        };
        tempList.push(tempItem);
      }
    });
    console.log(shoppingItems);
    setShoppingItems(tempList);
  }

  useEffect(() => {
    socket.connect();
    socket.on("Video", function (data) {
      let jsonObj = JSON.parse(data);
      let shoppingEvent = jsonObj as ShoppingEvent;
      setShoppingEvent(shoppingEvent);
      console.log(shoppingEvent);
      if (shoppingEvent.type == "PICK") {
        addItem(shoppingEvent.item_names);
      } else if (shoppingEvent.type == "RETURN") {
        returnItem(shoppingEvent.item_names);
      }
    });
    return () => {
      socket.off("Video");
    };
  }, [socket]);
  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {shoppingItems?.map((item) => (
          <Card
            key={item.id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Heading size="md">{item.name}</Heading>
                <Stack direction={["column", "row"]} spacing="24px">
                  <Text py="2">Quantity:</Text>
                  <Text py="2">{item.quantity}</Text>
                </Stack>
              </CardBody>
            </Stack>
          </Card>
        ))}
      </main>
    </ChakraProvider>
  );
}
