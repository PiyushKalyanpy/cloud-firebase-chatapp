"use client";

import { Spacer } from "@nextui-org/react";
import React from "react";

const DefaultChatPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col text-center items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cloud Chat App</h1>
        <p className="text-lg mb-8">
          Start chatting by selecting a user from the sidebar.
        </p>
        <Spacer y={8} />
        <p className=" mb-8 p-2 bg-violet-100 text-violet-600 rounded-full w-fit">
          Developed by Piyush Kalyan.
        </p>
      </div>
    </div>
  );
};

export default DefaultChatPage;
