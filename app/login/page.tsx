"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loginWithGoogle, currentUser, isLoading } = useContext(AuthContext);
  const router = useRouter();
  if (currentUser) {
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div>
        <button
          className="bg-blue-500 p-4 rounded-2xl text-white font-semibold"
          onClick={loginWithGoogle}
        >
          Login with Googles {!isLoading && " | Not Loading..."}
        </button>

        {currentUser && (
          <div className=" font-semibold">
            <Image
              src={currentUser.photoURL}
              alt="user"
              width={200}
              height={200}
            />
            <p>{currentUser.displayName}</p>
            <p>{currentUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
