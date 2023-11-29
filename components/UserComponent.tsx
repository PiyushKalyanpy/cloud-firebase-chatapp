import { UserInterface } from "@/types/User";
import { useRouter } from "next/navigation";
import { User } from "@nextui-org/react";

const UserComponent = (user: UserInterface) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/chat/${user.uid}`)}>
      <User
        name={user.name}
        avatarProps={{
          src: user.photoURL,
        }}
      />
    </div>
  );
};

export default UserComponent;
