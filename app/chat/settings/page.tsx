"use client";
import { db } from "@/database/firebase";
import { updateDoc, collection, doc } from "firebase/firestore";
import { Switch } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

// update user data in firestore ( hideme value )
const updateUserData = async (uid: string, hideMe: Boolean) => {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, {
    hideMe,
  });
};

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const [hideMe, setHideMe] = useState<boolean>(false);
  useEffect(() => {
    setHideMe(currentUser.hideMe);
  }, [currentUser]);

  const handleHideMeChange = async (value: boolean) => {
    setHideMe(value);
    await updateUserData(currentUser.uid, value);
  };

  return (
    <div>
      <Switch isSelected={hideMe} onValueChange={handleHideMeChange}>
        Hide from Other
      </Switch>
      <p>Hide your profile from others </p>
    </div>
  );
};

export default Settings;
