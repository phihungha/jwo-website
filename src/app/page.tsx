"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ShoppingEvent } from "./types/types";
const socket = io("http://127.0.0.1:5000");

export default function Home() {
  const [notifications, setNotifications] = useState<ShoppingEvent>();
  useEffect(() => {
    socket.connect();
    //socket.emit('connect_video')
    socket.on("Video", function (data) {
      setNotifications(data);
      let jsonObj = JSON.parse(data); // string to "any" object first
      let shoppingEvent = jsonObj as ShoppingEvent;
      setNotifications(shoppingEvent);
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a>{notifications?.time}</a>
      <a>{notifications?.item_names}</a>
      <a>{notifications?.type}</a>
    </main>
  );
}
