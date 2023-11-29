"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/database/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { UserInterface } from "@/types/User";
import UserComponent from "./UserComponent";

// get all users from firestore
const fetchUsers = async (): Promise<UserInterface[]> => {
  const q = query(collection(db, "users"), where("hideMe", "==", false));
  const usersSnapshot = await getDocs(q);
  const users: UserInterface[] = [];
  usersSnapshot.forEach((doc) => {
    users.push({ uid: doc.id, ...doc.data() } as UserInterface);
  });
  return users;
};

const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState<UserInterface[]>([]);
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
      {/* all user */}
      <div>
        {
          users.map((user) => {
            return (
              <div key={user.uid} className="border m-2 p-2 cursor-pointer">
                <UserComponent {...user} />
              </div>
            );
          })
        }
      </div>
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
