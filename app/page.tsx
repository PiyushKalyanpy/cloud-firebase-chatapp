"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@nextui-org/react";

/**
 * Renders the Home page component.
 * If there is no current user, it redirects to the login page.
 * Otherwise, it displays the user's name and provides buttons for logout and navigating to the chat page.
 */
export default function Home() {
  const { currentUser, logout, isLoading } = useContext(AuthContext);
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-screen justify-center h-screen space-y-4">
        <CircularProgress color="primary" />
      </div>
    );
  }
  if (!currentUser) {
    router.push("/login");
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Hello {currentUser?.name}</h1>
      <Button onClick={() => router.push("/chat")} color="success" className="text-white" size="lg" >
        Start Chatting
      </Button>
      <Button className="fixed top-10 right-10" onClick={logout} color="danger">
        Logout
      </Button>
    </main>
  );
}
