import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
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
   PAGINATION (PAGE NUMBER BASED – NO REPEATS)
========================================================= */
export const fetchQuestionsPaginated = async (
  page: number,
  pageSize: number
) => {
  const questionsRef = collection(db, "questions");

  const q = query(
    questionsRef,
    orderBy("createdAt", "desc"),
    limit(page * pageSize)
  );

  const snap = await getDocs(q);

  const allDocs = snap.docs;

  const startIndex = (page - 1) * pageSize;
  const paginatedDocs = allDocs.slice(startIndex, startIndex + pageSize);

  return {
    questions: paginatedDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
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
