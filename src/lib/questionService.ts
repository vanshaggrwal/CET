import {
  collection,
  getDocs,
  query,
  orderBy,
 
  getCountFromServer,

} from "firebase/firestore";
import { db } from "../../firebase";

const COLLECTION_NAME = "questions";

/* =========================================================
   FETCH 50 RANDOM QUESTIONS PER SUBJECT FOR EXAM
========================================================= */

export const fetchExamQuestionsFromFirestore = async () => {
  const questionsRef = collection(db, COLLECTION_NAME);

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
   PAGINATION USING DOCUMENT ID (NO DUPLICATES)
========================================================= */

export const fetchQuestionsPaginated = async (
  pageNumber: number,
  pageSize: number
) => {
  const questionsRef = collection(db, COLLECTION_NAME);

  // Always order by document ID (safe + indexed)
  const baseQuery = query(
    questionsRef,
    orderBy("__name__")
  );

  const snapshot = await getDocs(baseQuery);

  const allDocs = snapshot.docs;

  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedDocs = allDocs.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    questions: paginatedDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  };
};

/* =========================================================
   TOTAL COUNT
========================================================= */

export const getQuestionsCount = async () => {
  const coll = collection(db, COLLECTION_NAME);
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
