"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/database/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { UserInterface } from "@/types/User";
import UserComponent from "./UserComponent";
import { LuArrowRight, LuSearch } from "react-icons/lu";
import { Input, Spacer } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

// get all users from firestore
const fetchUsers = async (): Promise<UserInterface[]> => {
  const q = query(collection(db, "users"), where("hideMe", "==", false));
  const usersSnapshot = await getDocs(q);
  const users: UserInterface[] = [];
  usersSnapshot.forEach((doc) => {
    users.push({ uid: doc.id, ...doc.data() } as UserInterface);
  });
  return users;
};

const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsersAndSaveToState = async () => {
      let users = await fetchUsers();
      // remove current user from users list
      users = users.filter((user) => user.uid !== currentUser.uid);
      setUsers(users);
    };
    fetchUsersAndSaveToState();
  }, []);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 ">
      {/* searchbar */}
      <div className=" flex flex-row bg-white p-4 m-2 rounded-2xl items-center space-x-2 shadow-2xl shadow-gray-200   ">
        <input
          className="w-full outline-none text-lg"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <SearchIcon className="text-xl cursor-pointer text-gray-600" />
      </div>
      <Spacer y={2} />
      <div>
        {search.length > 0
          ? filteredUsers.map((user) => (
              <div
                key={user.uid}
                className="p-4 m-2 bg-white cursor-pointer rounded-2xl"
                onClick={() => router.push(`/chat/${user.uid}`)}
              >
                <UserComponent {...user} />
              </div>
            ))
          : users.map((user) => (
              <div
                key={user.uid}
                className="p-4 m-2 bg-white cursor-pointer rounded-2xl"
                onClick={() => router.push(`/chat/${user.uid}`)}
              >
                <UserComponent {...user} />
              </div>
            ))}
      </div>
      {/* footer for setting page */}
      <div className="absolute bottom-0 w-full">
        <div
          className="flex flex-row items-center w-full shadow-2xl shadow-gray-300  rounded-t-2xl p-4 font-medium bg-white text-gray-700 cursor-pointer justify-between "
          onClick={() => router.push("/chat/settings")}
        >
          <p>Settings</p>
          <LuArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
