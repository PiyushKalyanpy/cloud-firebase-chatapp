'use client'
import ChatSidebar from "@/components/ChatSidebar";
import { onDisconnect, ref } from "firebase/database";
import { rtdb } from "@/database/firebase";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { updateOnlineStatus } from "@/utils/db";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {currentUser} = useContext(AuthContext);
  const presenceRef = ref(rtdb, "disconnectmessage");
  onDisconnect(presenceRef).set("I disconnected!").then(() => {
    console.log("disconnect message set");
    updateOnlineStatus(currentUser.uid, false)
  }

  );
  return (
    <html lang="en">
      <body className="flex flex-row w-full ">
        <div className="flex w-1/4">
          <ChatSidebar />
        </div>
        <div className="flex w-3/4">{children}</div>
      </body>
    </html>
  );
}
