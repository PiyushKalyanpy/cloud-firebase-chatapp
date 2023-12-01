import { UserInterface } from "@/types/User";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserComponent = (user: UserInterface) => {
  const router = useRouter();

  return (
    <div className="flex flex-row space-x-4 items-center" onClick={() => router.push(`/chat/${user.uid}`)}>
      <Image
        src={user?.photoURL}
        width={40}
        height={40}
        alt={user?.name}
        className="rounded-full"
      />
      <div className="flex flex-col items-center ">
        <h1 className="text-md font-medium">{user?.name}</h1>
        <p className="text-xs text-gray-500"></p>
      </div>
    </div>
  );
};

export default UserComponent;
