"use client";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  if (!currentUser) router.push("/login");
  return <main></main>;
}
