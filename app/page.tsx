"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { updateOnlineStatus } from "@/utils/db";

/**
 * Renders the Home page component.
 * If there is no current user, it redirects to the login page.
 * Otherwise, it displays the user's name and provides buttons for logout and navigating to the chat page.
 */
export default function Home() {
  const { currentUser, logout } = useContext(AuthContext);

  const router = useRouter();
  if (!currentUser) router.push("/login");

  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault(); // Prevent the default browser behavior

      // Send an asynchronous request to update the user's status in Firebase
      updateOnlineStatus(currentUser.uid, false)
        .then(() => {
          // User's status updated successfully
          event.returnValue = ""; // Allow the browser to proceed with closing
        })
        .catch((error) => {
          // Error updating user's status
          console.error("Error updating user online status:", error);
        });
    });
  }, []);

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
