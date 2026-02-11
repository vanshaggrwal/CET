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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageCursors, setPageCursors] = useState<any[]>([]);
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

  const loadPage = async (pageNumber: number) => {
    try {
      setLoading(true);

      let cursor = null;

      if (pageNumber > 1 && pageCursors[pageNumber - 2]) {
        cursor = pageCursors[pageNumber - 2];
      }

      const res = await fetchQuestionsPaginated(cursor);

      setQuestions(res.questions);

      const updatedCursors = [...pageCursors];
      updatedCursors[pageNumber - 1] = res.lastDoc;

      setPageCursors(updatedCursors);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.question.trim()) {
      alert("Question text is required");
      return;
    }

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

    await loadPage(currentPage);
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

    await loadPage(currentPage);
  };

  /* ================= UI ================= */

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Question Bank</h1>

      {/* FORM */}
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

          <Button onClick={handleSave}>
            {editingId ? "Update" : "Add"}
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            Loading questions...
          </div>
        ) : (
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
                  <td className="p-3 capitalize">
                    {q.subject}
                  </td>
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
        )}
      </div>

      {/* GOOGLE STYLE PAGINATION */}
      <div className="flex justify-center gap-2 mt-8 flex-wrap">
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
