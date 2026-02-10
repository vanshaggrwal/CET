import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

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
