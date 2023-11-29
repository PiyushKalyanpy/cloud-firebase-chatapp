"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ChatMain from "@/components/ChatMain";

export default function Home() {
  const { currentUser, setUserOffline } = useContext(AuthContext);
  const router = useRouter();
  const hasUnsavedChanges = true;
  // if (!currentUser) router.push("/login");

  useEffect(() => {
    const handleUnload = (e: any) => {
      // Perform actions before the component unloads
      setUserOffline(currentUser.email);
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <main>
      <ChatMain />
    </main>
  );
}
