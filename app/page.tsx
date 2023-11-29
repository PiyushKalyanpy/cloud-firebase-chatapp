"use client";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { currentUser, logout } = useContext(AuthContext);

  const router = useRouter();
  if (!currentUser) router.push("/login");
  return (
    <main>
      Helo user {currentUser?.name}
      <Button onClick={logout} color="danger">
        Logout
      </Button>
      {/* go to chat page  */}
      <Button onClick={() => router.push("/chat")} color="success">
        Chat
      </Button>
    </main>
  );
}
