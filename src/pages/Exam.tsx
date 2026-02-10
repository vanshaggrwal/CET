import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TestHeader from "@/components/TestHeader";
import QuestionCard from "@/components/QuestionCard";
import QuestionNavigation from "@/components/QuestionNavigation";
import {
  saveTestState,
  getTestState,
  saveTestResult,
  calculateResults,
  getUserData,
  TestState,
  Question,
} from "@/lib/testUtils";
import { fetchExamQuestionsFromFirestore } from "@/lib/questionService";
import { saveResultToFirebase } from "@/lib/resultService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const TEST_DURATION = 3 * 60 * 60; // 3 hours

const subjectOrder: Record<string, number> = {
  physics: 1,
  chemistry: 2,
  mathematics: 3,
};

const Exam = () => {
  const navigate = useNavigate();
  const [testState, setTestState] = useState<TestState | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const isSubmittingRef = useRef(false);

  const userData = getUserData();

  /* ================= INIT TEST ================= */

  useEffect(() => {
    if (!userData) {
      navigate("/mock-test/register");
      return;
    }

    const initTest = async () => {
      const saved = getTestState();

      if (saved && !saved.isSubmitted) {
        setTestState(saved);
        return;
      }

      const fetched = await fetchExamQuestionsFromFirestore();

      // 🔒 HARD GUARANTEE SUBJECT ORDER
      const ordered = [...fetched].sort(
        (a, b) => subjectOrder[a.subject] - subjectOrder[b.subject]
      );

      const answers: Record<string, number | null> = {};
      ordered.forEach((q) => (answers[q.id] = null));

      const freshState: TestState = {
        questions: ordered,
        answers,
        startTime: Date.now(),
        currentQuestion: 0,
        isSubmitted: false,
      };

      setTestState(freshState);
      saveTestState(freshState);
    };

    initTest();
  }, [navigate, userData]);

  /* ================= SUBMIT ================= */

  const submitTest = useCallback(
    async (reason: "completed" | "timeout" | "violation") => {
      if (!testState || !userData || isSubmittingRef.current) return;
      isSubmittingRef.current = true;

      const finalState: TestState = {
        ...testState,
        isSubmitted: true,
        submissionReason: reason,
      };

      saveTestState(finalState);

      const result = calculateResults(
        testState.questions,
        testState.answers
      );

      saveTestResult(result);
      await saveResultToFirebase(userData.email, result);

      navigate("/mock-test/results");
    },
    [testState, userData, navigate]
  );

  /* ================= SAFETY ================= */

  useEffect(() => {
    if (!testState || testState.isSubmitted) return;

    const violation = () => {
      if (!isSubmittingRef.current) setShowViolationDialog(true);
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) violation();
    });
    window.addEventListener("blur", violation);

    return () => {
      window.removeEventListener("blur", violation);
    };
  }, [testState]);

  if (!testState || testState.questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading exam…</div>;
  }

  const currentQuestion = testState.questions[testState.currentQuestion];

  /* ================= HELPERS ================= */

  const goToQuestion = (index: number) => {
    const updated = { ...testState, currentQuestion: index };
    setTestState(updated);
    saveTestState(updated);
  };

  const handleAnswerChange = (answer: number) => {
    const updated = {
      ...testState,
      answers: {
        ...testState.answers,
        [currentQuestion.id]: answer,
      },
    };
    setTestState(updated);
    saveTestState(updated);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <TestHeader
        startTime={testState.startTime}
        totalDuration={TEST_DURATION}
        onAutoSubmit={() => submitTest("timeout")}
        onManualSubmit={() => setShowSubmitDialog(true)}
      />

      <div className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuestionCard
            question={currentQuestion}
            questionNumber={testState.currentQuestion + 1}
            totalQuestions={testState.questions.length}
            selectedAnswer={testState.answers[currentQuestion.id]}
            onAnswerChange={handleAnswerChange}
            onPrevious={() => goToQuestion(testState.currentQuestion - 1)}
            onNext={() => goToQuestion(testState.currentQuestion + 1)}
            canGoPrevious={testState.currentQuestion > 0}
            canGoNext={testState.currentQuestion < testState.questions.length - 1}
          />
        </div>

        <QuestionNavigation
          questions={testState.questions}
          answers={testState.answers}
          currentIndex={testState.currentQuestion}
          onNavigate={goToQuestion}
        />
      </div>

      {/* SUBMIT CONFIRM */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction onClick={() => submitTest("completed")}>
              Submit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* VIOLATION */}
      <AlertDialog open={showViolationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Violation Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              You left the exam window. The test will be submitted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => submitTest("violation")}>
              View Result
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Exam;
