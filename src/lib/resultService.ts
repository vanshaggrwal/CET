import { db } from "../../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { TestResult } from "./testUtils";

export const saveResultToFirebase = async (
  studentEmail: string,
  result: TestResult
) => {
  const studentRef = doc(db, "students", studentEmail);

  await updateDoc(studentRef, {
    latestResult: {
      totalScore: result.totalScore,
      physics: result.physics.correct,
      chemistry: result.chemistry.correct,
      mathematics: result.mathematics.correct,
      submittedAt: serverTimestamp(),
    },
  });
};
