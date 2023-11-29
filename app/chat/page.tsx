"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/database/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

// get all users from firestore
const fetchUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const users = usersSnapshot.docs.map((doc) => doc.data());
  return users;
};

const DefaultChatPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsersAndSaveToState = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    fetchUsersAndSaveToState();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default DefaultChatPage;
