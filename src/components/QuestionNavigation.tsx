import { cn } from "@/lib/utils";
import { Question } from "@/lib/testUtils";

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

  const renderSection = (
    title: string,
    subject: Question["subject"],
    badgeClass: string
  ) => {
    const indexes = subjectIndexes(subject);
    const attempted = indexes.filter(
      (i) => answers[questions[i].id] !== null
    ).length;

    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className={badgeClass}>{title}</span>
          <span className="text-xs text-muted-foreground">
            {attempted}/{indexes.length} answered
          </span>
        </div>

        <div className="grid grid-cols-10 gap-1">
          {indexes.map((index) => {
            const q = questions[index];
            const isAnswered = answers[q.id] !== null;
            const isCurrent = index === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => onNavigate(index)}
                className={cn(
                  "question-nav-item",
                  isAnswered
                    ? "question-nav-attempted"
                    : "question-nav-unattempted",
                  isCurrent && "question-nav-current"
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
    <div className="exam-card sticky top-20">
      <h3 className="font-semibold mb-4">Question Navigator</h3>

      {renderSection("Physics", "physics", "subject-badge-physics")}
      {renderSection("Chemistry", "chemistry", "subject-badge-chemistry")}
      {renderSection("Mathematics", "mathematics", "subject-badge-mathematics")}
    </div>
  );
};

export default QuestionNavigation;
