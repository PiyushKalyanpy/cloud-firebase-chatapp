"use client";
import { useEffect, useState } from "react";
import { ref, get, set, push, onValue, off } from "firebase/database";
import { useParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { db, rtdb } from "@/database/firebase";
import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";

interface Chat {
  message: string;
  timestamp: number;
  sentTo: string;
}

interface UserInfo {
  photoURL: string;
  name: string;
  email: string;
}

const fetchChats = async (uid1: string, uid2: string) => {
  const snapshot = await get(ref(rtdb, `chats/${uid1}/${uid2}`));
  const cachedChats = snapshot.val();
  if (cachedChats) {
    return cachedChats;
  } else {
    return {};
  }
};

const ChatPage = () => {
  const { uid } = useParams();
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchChatsAndSaveToCache = async () => {
      console.log("Getting Data: chat");
      const snapshot = await get(ref(rtdb, `chats/${currentUser.uid}/${uid}`));
      const cachedChats = snapshot.val();
      if (cachedChats) {
        setChats(cachedChats);
      } else {
        const fetchedChats = await fetchChats(currentUser.uid, uid.toString());
        setChats(fetchedChats);
      }
    };
    fetchChatsAndSaveToCache();

    const fetchUserInfoAndSaveToState = async () => {
      console.log("Getting Data: user");
      const docRef = doc(db, "users", uid);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setUserInfo({
              photoURL: data?.photoURL,
              name: data?.name,
              email: data?.email,
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    fetchUserInfoAndSaveToState();

    const myChat = ref(rtdb, `chats/${currentUser.uid}/${uid}`);
    const chatRef = ref(rtdb, `chats/${uid}/${currentUser.uid}`);
    onValue(myChat, (snapshot) => {
      const updatedChats = snapshot.val();
      setChats(updatedChats);
    });

    return () => {
      off(chatRef);
      off(myChat);
    };
  }, [uid]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newChat: Chat = {
        message,
        timestamp: Date.now(),
        sentTo: uid.toString(),
      };
      const newChatRef = push(ref(rtdb, `chats/${currentUser.uid}/${uid}`));
      const newChatRef2 = push(ref(rtdb, `chats/${uid}/${currentUser.uid}`));
      await set(newChatRef, newChat);
      await set(newChatRef2, newChat);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={userInfo?.photoURL}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="text-sm font-medium">{userInfo?.name}</p>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-gray-400">{userInfo?.email}</p>
            <div className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 7.5a2 2 0 100-4 2 2 0 000 4zm0 5a2 2 0 100-4 2 2 0 000 4zm0 5a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow p-4 overflow-y-scroll">
        {Object.values(chats).map((chat) => (
          <div
            key={chat.timestamp}
            className={`flex flex-col ${
              chat.sentTo !== currentUser.uid ? "items-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col w-fit">
              <div className="flex-grow">
                <p>{chat.message}</p>
              </div>
              <div className="flex-shrink">
                <p className="text-xs">
                  {new Date(chat.timestamp).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="flex flex-row items-center">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
