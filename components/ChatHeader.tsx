import { User } from "@nextui-org/react";
const ChatHeader = (user: any) => {
  const { name, email, uid, photoURL } = user;
  return (
    <div className="flex w-full h-14 bg-gray-100 p-4">
      <User
        name="Jane Doe"
        description="Product Designer"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        }}
      />
    </div>
  );
};

export default ChatHeader;
