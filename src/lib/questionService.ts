import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Question } from "./testUtils";

const shuffle = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export const fetchExamQuestionsFromFirestore = async (): Promise<Question[]> => {
  const orderedQuestions: Question[] = [];

  const subjects: Question["subject"][] = [
    "physics",
    "chemistry",
    "mathematics",
  ];

  for (const subject of subjects) {
    const q = query(
      collection(db, "questions"),
      where("subject", "==", subject)
    );

    const snap = await getDocs(q);

    const subjectQuestions: Question[] = snap.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
        subject: data.subject,
      };
    });

    // ✅ shuffle only within subject
    const random50 = shuffle(subjectQuestions).slice(0, 50);

    // ✅ append in subject order
    orderedQuestions.push(...random50);
  }

  return orderedQuestions; // ❗ NO final shuffle
};
