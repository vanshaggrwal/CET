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
import { getCountFromServer } from "firebase/firestore";

export const getStudentsCount = async () => {
  const coll = collection(db, "students");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

const PAGE_SIZE = 10; // number of students per page
export const fetchStudentsPaginated = async (
  lastDoc: QueryDocumentSnapshot | null
) => {
  const studentsRef = collection(db, "students");

  const q = lastDoc
    ? query(
        studentsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      )
    : query(
        studentsRef,
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );

  const snap = await getDocs(q);

  return {
    students: snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    lastDoc:
      snap.docs.length > 0
        ? snap.docs[snap.docs.length - 1]
        : null,
    hasMore: snap.docs.length === PAGE_SIZE,
  };
};
