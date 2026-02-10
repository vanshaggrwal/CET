import { Question } from '@/lib/testUtils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerChange: (answer: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
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
  canGoNext,
}: QuestionCardProps) => {
  const getSubjectBadgeClass = (subject: string) => {
    switch (subject) {
      case 'physics':
        return 'subject-badge-physics';
      case 'chemistry':
        return 'subject-badge-chemistry';
      case 'mathematics':
        return 'subject-badge-mathematics';
      default:
        return '';
    }
  };

  const getSubjectLabel = (subject: string) => {
    return subject.charAt(0).toUpperCase() + subject.slice(1);
  };

  return (
    <div className="exam-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className={`subject-badge ${getSubjectBadgeClass(question.subject)}`}>
            {getSubjectLabel(question.subject)}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          Marks: 1.00
        </span>
      </div>

      <div className="mb-8">
        <p className="text-lg text-foreground leading-relaxed">
          {question.question}
        </p>
      </div>

      <RadioGroup
        value={selectedAnswer !== null ? selectedAnswer.toString() : ''}
        onValueChange={(value) => onAnswerChange(parseInt(value))}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
              selectedAnswer === index
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => onAnswerChange(index)}
          >
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer text-base text-foreground"
            >
              <span className="font-medium text-muted-foreground mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
