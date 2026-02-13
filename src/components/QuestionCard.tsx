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
    <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm">
      
      {/* Question Header */}
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Question {questionNumber} of {totalQuestions}
      </h2>

      {/* Question Text */}
      <p className="mb-6 text-sm sm:text-base leading-relaxed">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option: string, index: number) => (
          <div
            key={index}
            className={`
              p-3 sm:p-4 
              border rounded-lg 
              cursor-pointer 
              text-sm sm:text-base
              transition-all duration-150
              ${
                selectedAnswer === index
                  ? "bg-primary text-white border-primary"
                  : "hover:bg-muted"
              }
            `}
            onClick={() => onAnswerChange(index)}
          >
            <span className="font-medium mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-8">
        <Button
          variant="outline"
          disabled={!canGoPrevious}
          onClick={onPrevious}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>

        <Button
          onClick={onNext}
          className={`w-full sm:w-auto ${
            isLastQuestion
              ? "bg-green-600 hover:bg-green-700 text-white"
              : ""
          }`}
        >
          {isLastQuestion ? "Submit Test" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
