import { db } from "../../firebase";
import { collection, query, orderBy, getDocs ,limit,startAfter,} from "firebase/firestore";
export const fetchStudentsPaginated = async (lastDoc)=>{
  const studentsRef = collection(db, "students");
  let q;
  if (lastDoc) {
    q = query(
      studentsRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(20)
    );
  } else {
    q = query(studentsRef, orderBy("createdAt", "desc"), limit(20));
  }
  const snap = await getDocs(q);
  return {
    students: snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
    hasMore: snap.docs.length === 20,
  };
}


export const fetchStudentsWithResults = async () => {
  const q = query(
    collection(db, "students"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
