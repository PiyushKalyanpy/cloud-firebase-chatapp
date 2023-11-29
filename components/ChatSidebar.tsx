"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/database/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";

// get all users from firestore
const fetchUsers = async (): Promise<User[]> => {
  const q = query(collection(db, "users"), where("hideMe", "==", false));
  const usersSnapshot = await getDocs(q);
  const users: User[] = [];
  usersSnapshot.forEach((doc) => {
    users.push({ uid: doc.id, ...doc.data() } as User);
  });
  return users;
};

const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsersAndSaveToState = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    fetchUsersAndSaveToState();
  }, []);

  return (
    <div className="relative h-screen w-full">
      Select the chats to start messaging
      {users &&
        users.map((user) => (
          <div
            key={user.uid}
            className="border  m-2 p-2 cursor-pointer"
            onClick={() => router.push(`/chat/${user.uid}`)}
          >
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ))}
      {/* footer for setting page */}
      <div className="absolute bottom-0 w-full">
        <div
          className="border m-2 p-2 cursor-pointer"
          onClick={() => router.push("/chat/settings")}
        >
          <div>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
