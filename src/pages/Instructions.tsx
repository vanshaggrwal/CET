import { useState } from 'react';
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

  // Redirect if user hasn't registered
  if (!userData) {
    navigate('/mock-test/register');
    return null;
  }

  const handleStartTest = () => {
    navigate('/mock-test/exam');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showMockTestLink={false} />
      
      <div className="container py-8">
        <ProgressIndicator 
          currentStep={2} 
          totalSteps={3} 
          labels={['Registration', 'Instructions', 'Test']} 
        />

        <div className="max-w-5xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Instructions & Rules
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rules Panel */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Test Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      This is a full-length mock test with 150 questions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      All questions are multiple choice with one correct answer.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      You can navigate between questions using the question palette.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      There is no negative marking for wrong answers.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      The test will auto-submit when the timer reaches zero.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      You can submit the test anytime before the timer ends.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">
                      Your progress is saved automatically. Refreshing the page will not reset the test.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Exam Pattern Card */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  Exam Pattern
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">150</p>
                    <p className="text-sm text-muted-foreground">Total Questions</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">200</p>
                    <p className="text-sm text-muted-foreground">Total Marks</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">180 min</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-success">No</p>
                    <p className="text-sm text-muted-foreground">Negative Marking</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Subject-wise Distribution:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-physics" />
                        <span className="text-foreground">Physics</span>
                      </div>
                      <span className="text-muted-foreground">50 Questions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <Beaker className="h-4 w-4 text-success" />
                        <span className="text-foreground">Chemistry</span>
                      </div>
                      <span className="text-muted-foreground">50 Questions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-mathematics" />
                        <span className="text-foreground">Mathematics</span>
                      </div>
                      <span className="text-muted-foreground">50 Questions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Critical Warning */}
          <Alert variant="destructive" className="mt-6 border-2 border-destructive/50 bg-destructive/5">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Critical Warning</AlertTitle>
            <AlertDescription className="text-base mt-2">
              <strong>Switching tabs, minimizing the browser, or leaving the test screen will result in automatic submission.</strong>
              <br />
              <span className="text-sm mt-2 block">
                Please ensure you have a stable internet connection and will not be interrupted during the test.
              </span>
            </AlertDescription>
          </Alert>

          {/* Agreement Checkbox */}
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label 
                htmlFor="terms" 
                className="text-foreground cursor-pointer"
              >
                I have read and understood the instructions. I agree to the test rules and understand that 
                switching tabs or minimizing the browser will auto-submit my test.
              </Label>
            </div>

            <Button
              size="lg"
              className="px-12"
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
