import mammoth from "mammoth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const uploadWordQuestions = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });

  const blocks = value.split("Q:").slice(1);

  for (const block of blocks) {
    const lines = block.split("\n").map(l => l.trim());

    const question = lines[0];
    const options = lines.filter(l => /^[A-D]\)/.test(l)).map(l => l.slice(3));
    const answerLine = lines.find(l => l.startsWith("ANSWER:"));
    const subjectLine = lines.find(l => l.startsWith("SUBJECT:"));

    if (!question || options.length !== 4 || !answerLine || !subjectLine) continue;

    const correctAnswer =
      answerLine.replace("ANSWER:", "").trim().charCodeAt(0) - 65;

    const subject = subjectLine.replace("SUBJECT:", "").trim();

    await addDoc(collection(db, "questions"), {
      question,
      options,
      correctAnswer,
      subject,
      createdAt: serverTimestamp(),
    });
  }
};
