import {
  collection,
  serverTimestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const uploadJsonQuestions = async (file: File) => {
  if (!file) return;

  const text = await file.text();
  const data = JSON.parse(text);

  console.log("Counts →", {
    physics: data.physics?.length,
    chemistry: data.chemistry?.length,
    mathematics: data.mathematics?.length,
  });

  const subjects = ["physics", "chemistry", "mathematics"];

  let totalUploaded = 0;

  for (const subject of subjects) {
    const questions = data[subject];
    if (!Array.isArray(questions)) continue;

    let batch = writeBatch(db);
    let batchCount = 0;

    for (const q of questions) {
      // HARD validation (no silent skips)
      if (
        typeof q.question !== "string" ||
        !Array.isArray(q.options) ||
        q.options.length !== 4 ||
        typeof q.answer !== "number"
      ) {
        console.error("INVALID QUESTION:", q);
        throw new Error("Invalid question found. Upload aborted.");
      }

      const ref = doc(collection(db, "questions"));

      batch.set(ref, {
        subject,
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        externalId: q.id ?? null,
        createdAt: serverTimestamp(),
      });

      batchCount++;
      totalUploaded++;

      // Commit per subject safely
      if (batchCount === 450) {
        await batch.commit();
        batch = writeBatch(db);
        batchCount = 0;
      }
    }

    if (batchCount > 0) {
      await batch.commit();
    }
  }

  alert(`✅ ALL DONE: ${totalUploaded} questions uploaded`);
};
