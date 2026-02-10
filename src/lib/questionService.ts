import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export const addQuestion = async (data: any) => {
  await addDoc(collection(db, "questions"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getAllQuestions = async () => {
  const snap = await getDocs(collection(db, "questions"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateQuestion = async (id: string, data: any) => {
  await updateDoc(doc(db, "questions", id), data);
};

export const deleteQuestion = async (id: string) => {
  await deleteDoc(doc(db, "questions", id));
};
