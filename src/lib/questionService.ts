import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebase";

const PAGE_SIZE = 10;

/* =========================================================
   FETCH 50 RANDOM QUESTIONS PER SUBJECT FOR EXAM
========================================================= */

export const fetchExamQuestionsFromFirestore = async () => {
  const questionsRef = collection(db, "questions");

  const snap = await getDocs(questionsRef);

  const allQuestions = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];

  const physics = allQuestions.filter(
    (q) => q.subject === "physics"
  );

  const chemistry = allQuestions.filter(
    (q) => q.subject === "chemistry"
  );

  const mathematics = allQuestions.filter(
    (q) => q.subject === "mathematics"
  );

  const shuffle = (arr: any[]) =>
    [...arr].sort(() => 0.5 - Math.random());

  return [
    ...shuffle(physics).slice(0, 50),
    ...shuffle(chemistry).slice(0, 50),
    ...shuffle(mathematics).slice(0, 50),
  ];
};

/* =========================================================
   PAGINATION FOR ADMIN QUESTION BANK
========================================================= */

export const fetchQuestionsPaginated = async (
  lastDoc: QueryDocumentSnapshot | null
) => {
  const questionsRef = collection(db, "questions");

  const q = lastDoc
    ? query(
        questionsRef,
        orderBy("__name__"), // safest ordering
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      )
    : query(
        questionsRef,
        orderBy("__name__"),
        limit(PAGE_SIZE)
      );

  const snap = await getDocs(q);

  return {
    questions: snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    lastDoc:
      snap.docs.length > 0
        ? snap.docs[snap.docs.length - 1]
        : null,
  };
};

/* =========================================================
   TOTAL QUESTIONS COUNT
========================================================= */

export const getQuestionsCount = async () => {
  const coll = collection(db, "questions");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
