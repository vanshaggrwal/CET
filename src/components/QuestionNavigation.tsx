import { cn } from '@/lib/utils';
import { Question } from '@/lib/testUtils';

interface QuestionNavigationProps {
  questions: Question[];
  answers: Record<string, number | null>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const QuestionNavigation = ({ questions, answers, currentIndex, onNavigate }: QuestionNavigationProps) => {
  const getSubjectRange = (subject: string) => {
    const subjectQuestions = questions.filter(q => q.subject === subject);
    if (subjectQuestions.length === 0) return { start: 0, end: 0 };
    
    const startIndex = questions.findIndex(q => q.id === subjectQuestions[0].id);
    const endIndex = questions.findIndex(q => q.id === subjectQuestions[subjectQuestions.length - 1].id);
    
    return { start: startIndex, end: endIndex };
  };

  const physicsRange = getSubjectRange('physics');
  const chemistryRange = getSubjectRange('chemistry');
  const mathRange = getSubjectRange('mathematics');

  const countAttempted = (startIndex: number, endIndex: number) => {
    let count = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      if (answers[questions[i]?.id] !== null && answers[questions[i]?.id] !== undefined) {
        count++;
      }
    }
    return count;
  };

  const renderSubjectSection = (
    title: string, 
    startIndex: number, 
    endIndex: number, 
    colorClass: string
  ) => {
    const attempted = countAttempted(startIndex, endIndex);
    const total = endIndex - startIndex + 1;

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`subject-badge ${colorClass}`}>{title}</span>
          <span className="text-xs text-muted-foreground">
            {attempted}/{total} answered
          </span>
        </div>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
            const index = startIndex + i;
            const question = questions[index];
            const isAnswered = answers[question?.id] !== null && answers[question?.id] !== undefined;
            const isCurrent = index === currentIndex;

            return (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={cn(
                  'question-nav-item',
                  isAnswered ? 'question-nav-attempted' : 'question-nav-unattempted',
                  isCurrent && 'question-nav-current'
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
    <div className="exam-card h-fit sticky top-20">
      <h3 className="font-semibold text-foreground mb-4">Question Navigator</h3>
      
      {renderSubjectSection('Physics', physicsRange.start, physicsRange.end, 'subject-badge-physics')}
      {renderSubjectSection('Chemistry', chemistryRange.start, chemistryRange.end, 'subject-badge-chemistry')}
      {renderSubjectSection('Mathematics', mathRange.start, mathRange.end, 'subject-badge-mathematics')}

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted border border-border" />
            <span>Not Answered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
