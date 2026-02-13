import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

import {
  fetchQuestionsPaginated,
  getQuestionsCount,
} from "@/lib/questionService";

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

/* ================= TYPES ================= */

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

const PAGE_SIZE = 10;

const QuestionBank = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [form, setForm] = useState<QuestionForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ===== PAGINATION ===== */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    const init = async () => {
      const total = await getQuestionsCount();
      setTotalPages(Math.ceil(total / PAGE_SIZE));
      await loadPage(1);
    };
    init();
  }, []);

  /* ================= LOAD PAGE ================= */

  const loadPage = async (page: number) => {
    setLoading(true);
    const res = await fetchQuestionsPaginated(page, PAGE_SIZE);
    setQuestions(res.questions);
    setCurrentPage(page);
    setLoading(false);
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.question.trim()) {
      alert("Question text required");
      return;
    }

    if (editingId) {
      await updateDoc(doc(db, "questions", editingId), form);
    } else {
      await addDoc(collection(db, "questions"), {
        ...form,
        uploadSource: "Manual",
        fileName: null,
        createdAt: serverTimestamp(),
      });
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    loadPage(currentPage);
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
    if (!confirm("Delete question?")) return;
    await deleteDoc(doc(db, "questions", id));
    loadPage(currentPage);
  };

  /* ================= JSON UPLOAD ================= */

  const handleJsonUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const json = JSON.parse(text);

    for (const subject in json) {
      for (const q of json[subject]) {
        await addDoc(collection(db, "questions"), {
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
          subject,
          uploadSource: "JSON",
          fileName: file.name,
          createdAt: serverTimestamp(),
        });
      }
    }

    alert("JSON uploaded successfully");
    loadPage(1);
  };

  /* ================= EXCEL UPLOAD ================= */

  const handleExcelUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    for (const row of rows) {
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
        uploadSource: "Excel",
        fileName: file.name,
        createdAt: serverTimestamp(),
      });
    }

    alert("Excel uploaded successfully");
    loadPage(1);
  };

  /* ================= WORD UPLOAD ================= */

  const handleWordUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({
      arrayBuffer: buffer,
    });

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

      if (!question || options.length !== 4 || !answerLine)
        continue;

      const correctAnswer =
        answerLine.replace("ANSWER:", "").trim().charCodeAt(0) -
        65;

      const subject = subjectLine
        ? subjectLine.replace("SUBJECT:", "").trim()
        : "physics";

      await addDoc(collection(db, "questions"), {
        question,
        options,
        correctAnswer,
        subject,
        uploadSource: "Word",
        fileName: file.name,
        createdAt: serverTimestamp(),
      });
    }

    alert("Word uploaded successfully");
    loadPage(1);
  };

  /* ================= UI ================= */
return (
  <div className="p-4 sm:p-6 lg:p-8">
    <h1 className="text-xl sm:text-2xl font-bold mb-6">
      Question Bank
    </h1>

    {/* BULK UPLOAD */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Upload JSON</label>
        <input type="file" accept=".json" onChange={handleJsonUpload} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Upload Excel</label>
        <input type="file" accept=".xlsx" onChange={handleExcelUpload} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Upload Word</label>
        <input type="file" accept=".docx" onChange={handleWordUpload} />
      </div>
    </div>

    {/* FORM */}
    <div className="bg-card border rounded-xl p-4 sm:p-6 mb-8">
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

      {/* SELECTS */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {/* Subject */}
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-sm font-medium text-muted-foreground">
            Subject
          </label>

          <Select
            value={form.subject}
            onValueChange={(v) =>
              setForm({ ...form, subject: v as any })
            }
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="mathematics">
                Mathematics
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Correct Option */}
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-sm font-medium text-muted-foreground">
            Correct Option
          </label>

          <Select
            value={String(form.correctAnswer)}
            onValueChange={(v) =>
              setForm({ ...form, correctAnswer: Number(v) })
            }
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select Correct Option" />
            </SelectTrigger>

            <SelectContent>
              {[0, 1, 2, 3].map((i) => (
                <SelectItem key={i} value={String(i)}>
                  Option {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleSave} className="w-full sm:w-auto">
          {editingId ? "Update" : "Add"}
        </Button>
      </div>
    </div>

    {/* TABLE */}
    <div className="bg-card border rounded-xl overflow-x-auto">
      {loading ? (
        <div className="p-6 text-center">Loading...</div>
      ) : (
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Question</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Correct</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="p-3">{q.question}</td>
                <td className="p-3 capitalize text-center">
                  {q.subject}
                </td>
                <td className="p-3 text-center">
                  Option {q.correctAnswer + 1}
                </td>
                <td className="p-3 flex gap-2 justify-center">
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
                    onClick={() =>
                      handleDelete(q.id)
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    {/* PAGINATION */}
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 &&
            page <= currentPage + 2)
        ) {
          return (
            <Button
              key={page}
              size="sm"
              variant={
                currentPage === page
                  ? "default"
                  : "outline"
              }
              onClick={() => loadPage(page)}
            >
              {page}
            </Button>
          );
        }

        if (
          page === currentPage - 3 ||
          page === currentPage + 3
        ) {
          return <span key={page}>...</span>;
        }

        return null;
      })}
    </div>
  </div>
);

};

export default QuestionBank;
