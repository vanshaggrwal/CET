import { cn } from "@/lib/utils";
import type { Question } from "@/lib/testUtils"; // ✅ make sure it's exported
interface Props {
  questions: Question[];
  answers: Record<string, number | null>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const QuestionNavigation = ({
  questions,
  answers,
  currentIndex,
  onNavigate,
}: Props) => {
  const subjectIndexes = (subject: Question["subject"]) =>
    questions
      .map((q, i) => (q.subject === subject ? i : null))
      .filter((i): i is number => i !== null);

  const currentSubject = questions[currentIndex]?.subject;

  const subjects: {
    title: string;
    key: Question["subject"];
    badgeClass: string;
  }[] = [
    { title: "Physics", key: "physics", badgeClass: "text-physics" },
    { title: "Chemistry", key: "chemistry", badgeClass: "text-success" },
    { title: "Mathematics", key: "mathematics", badgeClass: "text-mathematics" },
  ];

  /* 🔥 Reorder for Mobile */
  const reorderedSubjects = [
    ...subjects.filter((s) => s.key === currentSubject),
    ...subjects.filter((s) => s.key !== currentSubject),
  ];

  const renderSection = (
    title: string,
    subject: Question["subject"],
    badgeClass: string
  ) => {
    const indexes = subjectIndexes(subject);
    const attempted = indexes.filter(
      (i) => answers[questions[i].id] !== null
    ).length;

    if (indexes.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className={cn("text-sm font-medium", badgeClass)}>
            {title}
          </span>
          <span className="text-xs text-muted-foreground">
            {attempted}/{indexes.length} answered
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {indexes.map((index) => {
            const q = questions[index];
            const isAnswered = answers[q.id] !== null;
            const isCurrent = index === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => onNavigate(index)}
                className={cn(
                  "h-9 w-9 sm:h-8 sm:w-8 rounded-md text-sm font-medium",
                  "flex items-center justify-center transition-all",
                  isAnswered
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80",
                  isCurrent && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="exam-card p-4 sm:p-5 lg:p-6 
                    lg:sticky lg:top-20 
                    rounded-xl border border-border">
      <h3 className="font-semibold text-base mb-6 text-center lg:text-left">
        Question Navigator
      </h3>

      {/* 🔥 Mobile Dynamic Order */}
      <div className="block lg:hidden">
        {reorderedSubjects.map((s) =>
          renderSection(s.title, s.key, s.badgeClass)
        )}
      </div>

      {/* Desktop Normal Order */}
      <div className="hidden lg:block">
        {subjects.map((s) =>
          renderSection(s.title, s.key, s.badgeClass)
        )}
      </div>
    </div>
  );
};

export default QuestionNavigation;
