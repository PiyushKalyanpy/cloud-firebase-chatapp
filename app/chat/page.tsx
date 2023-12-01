"use client";

import { Spacer } from "@nextui-org/react";
import React from "react";
import { LuAlignRight } from "react-icons/lu";
import ChatSidebar from "@/components/ChatSidebar";

const DefaultChatPage = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="flex flex-col  w-full h-screen ">
      <div className="flex  md:hidden text-xl p-2 bg-gray-100 w-full flex-end ">
        <button
          className="p-4 bg-gray-200 text-gray-700  rounded-full "
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <LuAlignRight />
        </button>
        <Spacer y={2} />

        {/* show sidebar with animation  */}
        <div
          className={`fixed top-0 right-0 h-screen w-3/4 bg-white z-50  transition-transform duration-300 ease-in-out transform ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ChatSidebar />
        </div>
      </div>
      <div  className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col text-center items-center justify-center p-8">
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
    </div>
  );
};

export default DefaultChatPage;
