

import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserData } from "./testUtils";

export const saveStudentToFirebase = async (data: UserData) => {
  await setDoc(doc(db, "students", data.email), {
    ...data,
    createdAt: serverTimestamp(),
  });
};
