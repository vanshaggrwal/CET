import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProgressIndicator from '@/components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Beaker,
  Calculator
} from 'lucide-react';
import { getUserData } from '@/lib/testUtils';

const Instructions = () => {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const userData = getUserData();

  useEffect(() => {
    if (!userData) {
      navigate('/mock-test/register');
    }
  }, [userData, navigate]);

  const handleStartTest = () => {
    navigate('/mock-test/exam');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header showMockTestLink={false} />

      <div className="container px-4 sm:px-6 lg:px-8 py-8">

        <ProgressIndicator
          currentStep={2}
          totalSteps={3}
          labels={['Registration', 'Instructions', 'Test']}
        />

        <div className="max-w-6xl mx-auto mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Instructions & Rules
          </h1>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Rules Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Test Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-4 text-sm sm:text-base">
                  {[
                    "This is a full-length mock test with 150 questions.",
                    "All questions are multiple choice with one correct answer.",
                    "You can navigate between questions using the question palette.",
                    "There is no negative marking for wrong answers.",
                    "The test will auto-submit when the timer reaches zero.",
                    "You can submit the test anytime before the timer ends.",
                    "Your progress is saved automatically."
                  ].map((text, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Exam Pattern */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Exam Pattern
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Snapshot Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="text-left p-4 rounded-lg bg-muted">
    <p className="text-xl sm:text-2xl font-bold">150</p>
    <p className="text-xs sm:text-sm text-muted-foreground">
      Total Questions
    </p>
  </div>

  <div className="text-left p-4 rounded-lg bg-muted">
    <p className="text-xl sm:text-2xl font-bold">200</p>
    <p className="text-xs sm:text-sm text-muted-foreground">
      Total Marks
    </p>
  </div>

  <div className="text-left p-4 rounded-lg bg-muted">
    <p className="text-xl sm:text-2xl font-bold">180 min</p>
    <p className="text-xs sm:text-sm text-muted-foreground">
      Duration
    </p>
  </div>

  <div className="text-left p-4 rounded-lg bg-muted">
    <p className="text-xl sm:text-2xl font-bold text-success">
      No
    </p>
    <p className="text-xs sm:text-sm text-muted-foreground">
      Negative Marking
    </p>
  </div>
</div>


                {/* Subjects */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm sm:text-base">
                    Subject-wise Distribution:
                  </h4>

                  {[
                    { icon: <BookOpen className="h-4 w-4 text-physics" />, name: "Physics" },
                    { icon: <Beaker className="h-4 w-4 text-success" />, name: "Chemistry" },
                    { icon: <Calculator className="h-4 w-4 text-mathematics" />, name: "Mathematics" },
                  ].map((sub, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted"
                    >
                      <div className="flex items-center gap-2">
                        {sub.icon}
                        <span>{sub.name}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        50 Questions
                      </span>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Warning */}
          <Alert
            variant="destructive"
            className="mt-8 border-2 bg-destructive/5"
          >
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">
              Critical Warning
            </AlertTitle>
            <AlertDescription className="text-sm sm:text-base mt-2">
              Switching tabs or minimizing the browser will result in automatic submission.
            </AlertDescription>
          </Alert>

          {/* Agreement */}
          <div className="mt-10 flex flex-col items-center gap-6 px-2">

            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card w-full max-w-2xl">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked as boolean)
                }
              />
              <Label
                htmlFor="terms"
                className="text-sm sm:text-base leading-relaxed cursor-pointer"
              >
                I have read and understood the instructions and agree to the test rules.
              </Label>
            </div>

            <Button
              size="lg"
              className="w-full max-w-md"
              disabled={!agreedToTerms}
              onClick={handleStartTest}
            >
              Start Test
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Instructions;
