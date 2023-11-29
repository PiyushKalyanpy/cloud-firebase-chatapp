"use client";

import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "@/database/firebase";
import {
  collection,
  limit,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
export const UserContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function UserProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (users.length === 0 && currentUser ) {
      const q = query(collection(db, "users"), limit(3));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(data);
        console.log(data);
        console.log("🧑 Users data downloaded");
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
