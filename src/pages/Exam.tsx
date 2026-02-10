import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TestHeader from "@/components/TestHeader";
import QuestionCard from "@/components/QuestionCard";
import QuestionNavigation from "@/components/QuestionNavigation";
import {
  generateRandomQuestions,
  saveTestState,
  getTestState,
  saveTestResult,
  calculateResults,
  getUserData,
  TestState,
} from "@/lib/testUtils";
import { saveResultToFirebase } from "@/lib/resultService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const TEST_DURATION = 3 * 60 * 60; // 3 hours (seconds)

const Exam = () => {
  const navigate = useNavigate();
  const [testState, setTestState] = useState<TestState | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const isSubmittingRef = useRef(false);

  const userData = getUserData();

  /* ===================== INIT TEST ===================== */
  useEffect(() => {
    if (!userData) {
      navigate("/mock-test/register");
      return;
    }

    const saved = getTestState();

    if (saved && !saved.isSubmitted) {
      setTestState(saved);
    } else {
      const questions = generateRandomQuestions();
      const answers: Record<string, number | null> = {};
      questions.forEach((q) => (answers[q.id] = null));

      const freshState: TestState = {
        questions,
        answers,
        startTime: Date.now(),
        currentQuestion: 0,
        isSubmitted: false,
      };

      setTestState(freshState);
      saveTestState(freshState);
    }
  }, [navigate, userData]);

  /* ===================== SUBMIT TEST ===================== */
  const submitTest = useCallback(
    async (reason: "completed" | "timeout" | "violation") => {
      if (!testState || isSubmittingRef.current || !userData) return;
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

      // 🔥 Save result locally
      saveTestResult(result);

      // 🔥 Save result to Firebase (for Admin)
      await saveResultToFirebase(userData.email, result);

      navigate("/mock-test/results");
    },
    [testState, userData, navigate]
  );

  /* ===================== TAB SWITCH / BLUR ===================== */
  useEffect(() => {
    if (!testState || testState.isSubmitted) return;

    const violation = () => {
      if (!isSubmittingRef.current) {
        setShowViolationDialog(true);
      }
    };

    const visibilityHandler = () => {
      if (document.hidden) violation();
    };

    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("blur", violation);

    return () => {
      document.removeEventListener("visibilitychange", visibilityHandler);
      window.removeEventListener("blur", violation);
    };
  }, [testState]);

  if (!testState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading test…
      </div>
    );
  }

  const currentQuestion = testState.questions[testState.currentQuestion];

  /* ===================== HELPERS ===================== */

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

  /* ===================== RENDER ===================== */

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
            canGoNext={
              testState.currentQuestion < testState.questions.length - 1
            }
          />
        </div>

        <QuestionNavigation
          questions={testState.questions}
          answers={testState.answers}
          currentIndex={testState.currentQuestion}
          onNavigate={goToQuestion}
        />
      </div>

      {/* ===================== SUBMIT CONFIRM ===================== */}
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

      {/* ===================== VIOLATION ===================== */}
      <AlertDialog open={showViolationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Violation Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              You switched tabs or left the exam window. As per rules, your test
              will now be submitted.
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
