"use client";
import { useEffect, useState } from "react";
import { ref, get, set, push, onValue, off } from "firebase/database";
import { useParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { db, rtdb } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import UserComponent from "@/components/UserComponent";
import { UserInterface } from "@/types/User";
import { LuSend } from "react-icons/lu";


interface Chat {
  message: string;
  timestamp: number;
  sentTo: string;
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
  const [userInfo, setUserInfo] = useState<UserInterface | null>(null);

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
      const docRef = await getDoc(doc(db, "users", uid.toString()))
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setUserInfo(data as UserInterface);
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
      <header className="bg-white border-b-1  p-4">
        <div className="flex items-center justify-between">
          {
            userInfo && <UserComponent {...(userInfo as UserInterface)} />
          }
        </div>
      </header>
      <main className="flex-grow flex flex-col p-4 gap-4 overflow-y-scroll">
        {chats && Object.values(chats).map((chat) => (
          <div
            key={chat.timestamp}
            className={`flex flex-col ${
              chat.sentTo !== currentUser.uid ? "items-end" : "justify-start"
            }`}
          >
            <div className={`flex flex-col w-fit p-4 rounded-2xl ${ chat.sentTo !== currentUser.uid ? "bg-blue-500 text-white" : "bg-gray-100" }`}>
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
      <footer className="bg-white border-t-1 p-4 ">
        <div className="flex space-x-2 flex-row items-center">
          <Input
            placeholder="Type a message"
            value={message}
            radius="full"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="rounded-full"
          />
          <Button onClick={sendMessage} className="h-14 bg-blue-600 text-xl text-white w-8 rounded-full">
          <LuSend  />

          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
