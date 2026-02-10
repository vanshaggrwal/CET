import * as XLSX from "xlsx";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const uploadExcelQuestions = async (file: File) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any>(sheet);

  for (const row of rows) {
    if (
      !row.question ||
      !row.option1 ||
      !row.option2 ||
      !row.option3 ||
      !row.option4
    ) {
      continue;
    }

    await addDoc(collection(db, "questions"), {
      subject: row.subject,
      question: row.question,
      options: [
        row.option1,
        row.option2,
        row.option3,
        row.option4,
      ],
      correctAnswer: Number(row.correctAnswer),
      createdAt: serverTimestamp(),
    });
  }
};
