import { UserInterface } from "@/types/User";
import { User } from "@nextui-org/react";

const UserComponent = (user: UserInterface) => {
  return (
    <div>
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
