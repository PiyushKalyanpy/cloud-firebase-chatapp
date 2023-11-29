"use client";
import { useState, useEffect, useContext } from "react";
import { Input } from "@nextui-org/react";
import { UserContext } from "@/context/UserContext";
import User from "./User";
import { AuthContext } from "@/context/AuthContext";

const ChatSidebar = () => {
  const [search, setSearch] = useState("");
  const { users } = useContext(UserContext);
  const { currentUser, setUserOffline } = useContext(AuthContext);
  const [showExitPrompt, setShowExitPrompt] = useState(true);

  return (
    <div className="flex flex-col space-y-8 w-1/4 border-r p-4">
      <div className="w-full">
        <Input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {users && users.map((user: any) => <User key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default ChatSidebar;
