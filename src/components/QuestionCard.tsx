import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: any;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerChange: (answer: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  isLastQuestion?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerChange,
  onPrevious,
  onNext,
  canGoPrevious,
  isLastQuestion,
}: QuestionCardProps) => {
  return (
    <div className="bg-card border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">
        Question {questionNumber} of {totalQuestions}
      </h2>

      <p className="mb-6">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option: string, index: number) => (
          <div
            key={index}
            className={`p-3 border rounded-lg cursor-pointer ${
              selectedAnswer === index
                ? "bg-primary text-white"
                : "hover:bg-muted"
            }`}
            onClick={() => onAnswerChange(index)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          disabled={!canGoPrevious}
          onClick={onPrevious}
        >
          Previous
        </Button>

        <Button
          onClick={onNext}
          className={
            isLastQuestion
              ? "bg-green-600 hover:bg-green-700 text-white"
              : ""
          }
        >
          {isLastQuestion ? "Submit Test" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
