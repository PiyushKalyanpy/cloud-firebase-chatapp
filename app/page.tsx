"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

/**
 * Renders the Home page component.
 * If there is no current user, it redirects to the login page.
 * Otherwise, it displays the user's name and provides buttons for logout and navigating to the chat page.
 */
export default function Home() {
  const { currentUser, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Hello {currentUser?.name}</h1>
      
      <Button onClick={() => router.push("/chat")} color="success">
        Start Chatting
      </Button>
      <Button className="fixed top-10 right-10" onClick={logout} color="danger">
        Logout
      </Button>
    </main>
  );
}
