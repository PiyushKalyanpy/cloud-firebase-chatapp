import { db } from "@/database/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateLastLoginTime = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    lastLoginTime: new Date().toISOString(),
  });
};


export const updateOnlineStatus = async (uid: string, isOnline : boolean) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    isOnline,
  });
};