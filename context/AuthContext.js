"use client";

import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "@/database/firebase";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const clear = async () => {
    try {
      setCurrentUser(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    if (currentUser) {
      console.log("already logged in");
      setIsLoading(false);
      return;
    }
    const userDoc = await getDoc(doc(db, "users", user.email));
    setCurrentUser(userDoc.data());
    currentUser && setUserOnline(currentUser.email);
    setIsLoading(false);
  };
  const setUserOffline = (email) => {
    if (email) {
      updateDoc(doc(db, "users",email), {
        isOnline: false,
      });
    }
  };
  const setUserOnline = (email) => {
    console.log("setting user online", email)
    if (email) {
      updateDoc(doc(db, "users",email), {
        isOnline: true,
      });
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    if (currentUser) {
      console.log("already logged in");
      return;
    }
    signInWithPopup(auth, provider).then((result) => {
      // check if user is present in user firestore database
      const docRef = doc(db, "users", result.user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          // set current user
          setCurrentUser(docSnap.data());
          setUserOnline(currentUser.email);
          router.push("/courses");
        } else {
          // user does not exist
          setDoc(doc(db, "users", result.user.email), {
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            uid: result.user.uid,
            role: "user",
            createdAt: new Date(),
            isVerified: result.user.emailVerified,
            isActive: false,
            isOnline: false,
          });
        }
      });
    });
  };
  const logout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      router.push("/login");
    });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      authStateChanged(user);
      setUserOnline(user.email);
    });
    return unsubscribe;
  }, []);
  const value = {
    loginWithGoogle,
    currentUser,
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        logout,
        setUserOffline,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
