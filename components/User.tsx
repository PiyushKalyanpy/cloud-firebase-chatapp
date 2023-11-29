"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const User = ({ user }: any) => {
  const { name, email, photoURL, isOnline, uid } = user;
  const router = useRouter();
  const navigateToUserChat = () => {
    router.push(`/${uid}`); 
  }

  return (
    <div  className=" flex cursor-pointer p-2 bg-gray-100 rounded-2xl" onClick={navigateToUserChat}>
      <div>
        <Image src={photoURL} alt={name} width={48} height={48} className="rounded-full" />
        <span>{isOnline ? "online" : "offline"}</span>
      </div>
      <div>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default User;
