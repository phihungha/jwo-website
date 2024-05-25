"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ShoppingEvent, ShoppingItem } from "./types/types";
const socket = io("http://127.0.0.1:5000");
export default function Home() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [shoppingEvent, setShoppingEvent] = useState<ShoppingEvent>();
  function returnItem(item_names: string[]): void {
    let tempList: ShoppingItem[] = [];
    item_names.forEach((item) => {
      console.log(item);
    });
    setShoppingItems(tempList);
    console.log(tempList);
  }

  function addItem(item_names: string[]): void {
    let tempList: ShoppingItem[] = shoppingItems;
    let currentItems: string[] = [];
    tempList.forEach((item) => {
      currentItems.push(item.name);
    });
    shoppingItems.forEach((item) => {
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
    socket.emit("connect_video");
    socket.on("Video", function (data) {
      let jsonObj = JSON.parse(data);
      let shoppingEvent = jsonObj as ShoppingEvent;
      setShoppingEvent(shoppingEvent);
      console.log(shoppingEvent);
      if (shoppingEvent.type == "PICK") {
        addItem(shoppingEvent.item_names);
        //returnItem(shoppingEvent.item_names);
      } else if (shoppingEvent.type == "RETURN") {
        //returnItem(shoppingEvent.item_names);
      }
    });
    return () => {
      socket.off("Video");
    };
  }, [socket]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {shoppingItems?.map((item) => (
        <div key={item.id}>
          <a>{item.name}</a>
          <a>{item.quantity}</a>
        </div>
      ))}
    </main>
  );
}
