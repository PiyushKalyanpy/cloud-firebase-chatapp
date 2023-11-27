"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const { loginWithGoogle, currentUser } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <button
        className="bg-blue-500 p-4 rounded-2xl text-white font-semibold"
        onClick={loginWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
