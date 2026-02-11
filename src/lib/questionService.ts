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
/* ================= FETCH EXAM QUESTIONS ================= */

export const fetchExamQuestionsFromFirestore = async () => {
  const questionsRef = collection(db, "questions");

  const snap = await getDocs(questionsRef);

  const allQuestions = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Group by subject
  const physics = allQuestions.filter(
    (q: any) => q.subject === "physics"
  );
  const chemistry = allQuestions.filter(
    (q: any) => q.subject === "chemistry"
  );
  const mathematics = allQuestions.filter(
    (q: any) => q.subject === "mathematics"
  );

  // Shuffle helper
  const shuffle = (arr: any[]) =>
    arr.sort(() => 0.5 - Math.random());

  return [
    ...shuffle(physics).slice(0, 50),
    ...shuffle(chemistry).slice(0, 50),
    ...shuffle(mathematics).slice(0, 50),
  ];
};

/* ================= PAGINATED FETCH ================= */

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
    : query(
        questionsRef,
        orderBy("createdAt", "desc"),
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

/* ================= TOTAL COUNT ================= */

export const getQuestionsCount = async () => {
  const coll = collection(db, "questions");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
