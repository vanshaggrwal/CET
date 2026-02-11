import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const PAGE_SIZE = 1;

export const fetchQuestionsPaginated = async (
  lastDoc: QueryDocumentSnapshot | null
) => {
  const questionsRef = collection(db, "questions");

  const q = lastDoc
    ? query(
        questionsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      )
    : query(questionsRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));

  const snap = await getDocs(q);

  return {
    questions: snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
    hasMore: snap.docs.length === PAGE_SIZE,
  };
};
