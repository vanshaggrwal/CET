import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ===================== TYPES ===================== */

type QuestionForm = {
  question: string;
  options: string[];
  correctAnswer: number;
  subject: "physics" | "chemistry" | "mathematics";
};

const EMPTY_FORM: QuestionForm = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
  subject: "physics",
};

/* ===================== COMPONENT ===================== */

const QuestionBank = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [form, setForm] = useState<QuestionForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ===================== LOAD QUESTIONS ===================== */

  const loadQuestions = async () => {
    const snap = await getDocs(collection(db, "questions"));
    setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  /* ===================== ADD / UPDATE ===================== */

  const handleSave = async () => {
    if (!form.question.trim()) {
      alert("Question text is required");
      return;
    }

    setLoading(true);

    if (editingId) {
      await updateDoc(doc(db, "questions", editingId), form);
    } else {
      await addDoc(collection(db, "questions"), {
        ...form,
        createdAt: serverTimestamp(),
      });
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    setLoading(false);
    loadQuestions();
  };

  const handleEdit = (q: any) => {
    setEditingId(q.id);
    setForm({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      subject: q.subject,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    await deleteDoc(doc(db, "questions", id));
    loadQuestions();
  };

  /* ===================== EXCEL UPLOAD ===================== */

  const handleExcelUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    for (const row of rows) {
      if (
        !row.question ||
        !row.option1 ||
        !row.option2 ||
        !row.option3 ||
        !row.option4
      )
        continue;

      await addDoc(collection(db, "questions"), {
        question: row.question,
        options: [
          row.option1,
          row.option2,
          row.option3,
          row.option4,
        ],
        correctAnswer: Number(row.correctAnswer),
        subject: row.subject,
        createdAt: serverTimestamp(),
      });
    }

    alert("Excel questions uploaded");
    loadQuestions();
  };

  /* ===================== JSON UPLOAD ===================== */
const handleJsonUpload = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    const validSubjects = ["physics", "chemistry", "mathematics"];

    for (const subject of validSubjects) {
      const questions = data[subject];
      if (!Array.isArray(questions)) continue;

      for (const q of questions) {
        if (
          !q.question ||
          !q.options ||
          q.options.length !== 4 ||
          q.answer === undefined
        ) {
          console.warn("Skipped invalid question:", q);
          continue;
        }

        await addDoc(collection(db, "questions"), {
          question: q.question,
          options: q.options,
          correctAnswer: Number(q.answer), // 🔑 mapped from `answer`
          subject,                          // 🔑 derived from key
          createdAt: serverTimestamp(),
        });
      }
    }

    alert("JSON questions uploaded successfully");
    loadQuestions();
  } catch (err) {
    console.error(err);
    alert("Invalid JSON file");
  }
};


  /* ===================== WORD UPLOAD ===================== */

  const handleWordUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({
      arrayBuffer: buffer,
    });

    /**
     * Expected Word format:
     *
     * Q: Question text
     * A) Option 1
     * B) Option 2
     * C) Option 3
     * D) Option 4
     * ANSWER: B
     * SUBJECT: physics
     */

    const blocks = value.split("Q:").slice(1);

    for (const block of blocks) {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const question = lines[0];

      const options = lines
        .filter((l) => /^[A-D]\)/.test(l))
        .map((l) => l.slice(3));

      const answerLine = lines.find((l) =>
        l.startsWith("ANSWER:")
      );
      const subjectLine = lines.find((l) =>
        l.startsWith("SUBJECT:")
      );

      if (
        !question ||
        options.length !== 4 ||
        !answerLine ||
        !subjectLine
      )
        continue;

      const correctAnswer =
        answerLine.replace("ANSWER:", "").trim().charCodeAt(0) - 65;

      const subject = subjectLine
        .replace("SUBJECT:", "")
        .trim();

      await addDoc(collection(db, "questions"), {
        question,
        options,
        correctAnswer,
        subject,
        createdAt: serverTimestamp(),
      });
    }

    alert("Word questions uploaded");
    loadQuestions();
  };

  /* ===================== UI ===================== */

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Question Bank</h1>

      {/* BULK UPLOAD */}
      <div className="flex gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Bulk Upload (Excel)
          </label>
          <input type="file" accept=".xlsx" onChange={handleExcelUpload} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Bulk Upload (JSON)
          </label>
          <input type="file" accept=".json" onChange={handleJsonUpload} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Bulk Upload (Word)
          </label>
          <input type="file" accept=".docx" onChange={handleWordUpload} />
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      <div className="bg-card border rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-4">
          {editingId ? "Edit Question" : "Add Question"}
        </h2>

        <Input
          placeholder="Question text"
          value={form.question}
          onChange={(e) =>
            setForm({ ...form, question: e.target.value })
          }
          className="mb-3"
        />

        {form.options.map((opt, i) => (
          <Input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const updated = [...form.options];
              updated[i] = e.target.value;
              setForm({ ...form, options: updated });
            }}
            className="mb-2"
          />
        ))}

        <div className="flex gap-4 mt-4">
          <Select
            value={form.subject}
            onValueChange={(v) =>
              setForm({ ...form, subject: v as any })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={String(form.correctAnswer)}
            onValueChange={(v) =>
              setForm({ ...form, correctAnswer: Number(v) })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Correct Option" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3].map((i) => (
                <SelectItem key={i} value={String(i)}>
                  Option {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleSave} disabled={loading}>
            {editingId ? "Update" : "Add"}
          </Button>
        </div>
      </div>

      {/* QUESTIONS TABLE */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Question</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Correct</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="p-3">{q.question}</td>
                <td className="p-3 capitalize">{q.subject}</td>
                <td className="p-3">
                  Option {q.correctAnswer + 1}
                </td>
                <td className="p-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(q)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(q.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionBank;
