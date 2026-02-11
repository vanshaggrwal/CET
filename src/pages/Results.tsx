import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  getTestResult, 
  getUserData, 
  getTestState,
  clearTestData 
} from '@/lib/testUtils';
import { 
  Trophy, 
  BookOpen, 
  Beaker, 
  Calculator,
  Mail,
  RefreshCw,
  Home
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const hasSentRef = useRef(false);

  const result = getTestResult();
  const userData = getUserData();
  const testState = getTestState();

  useEffect(() => {
    if (!result || !userData) {
      navigate('/mock-test');
      return;
    }

    if (!hasSentRef.current) {
      sendResultEmail();
      hasSentRef.current = true;
    }
  }, [result, userData, navigate]);

  if (!result || !userData) {
    return null;
  }

  const getScorePercentage = () => {
    const maxScore =
    result.physics.total +
    result.chemistry.total +
    result.mathematics.total;
    return Math.round((result.totalScore / result.maxScore) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return 'Excellent Performance!';
    if (percentage >= 60) return 'Good Performance!';
    if (percentage >= 40) return 'Keep Practicing!';
    return 'More Practice Needed';
  };

  const getScoreColor = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-primary';
    if (percentage >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const sendResultEmail = async () => {
    try {
      const response = await fetch("/brochure.pdf");
      const blob = await response.blob();

      const base64File = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result.split(",")[1]);
          }
        };
      });

      await emailjs.send(
        "service_j8b5xai",
        "template_5i20hxp",
        {
          student_name: `${userData.firstName} ${userData.lastName}`,
          score: result.totalScore,
          max_score: result.maxScore,
          percentage: getScorePercentage(),
          physics: `${result.physics.correct}/${result.physics.total}`,
          chemistry: `${result.chemistry.correct}/${result.chemistry.total}`,
          mathematics: `${result.mathematics.correct}/${result.mathematics.total}`,
          to_email: userData.email,
          attachment: base64File,
        },
        "brb9ovJREI08B_ypW"
      );

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Email failed:", error);
    }
  };

  const handleRetakeTest = () => {
    clearTestData();
    navigate('/mock-test/register');
  };

  const submissionReason = testState?.submissionReason;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">

          {submissionReason === 'violation' && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
              <p className="text-destructive font-medium">
                Test submitted due to navigation away from exam window.
              </p>
            </div>
          )}

          {submissionReason === 'timeout' && (
            <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/30 text-center">
              <p className="text-warning font-medium">
                Test auto-submitted as time expired.
              </p>
            </div>
          )}

          <Card className="border-2 border-primary/20 shadow-lg mb-8">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                {getScoreMessage()}
              </CardTitle>
              <p className="text-muted-foreground">
                {userData.firstName} {userData.lastName}
              </p>
            </CardHeader>

            <CardContent>
              <div className="text-center mb-8">
                <p className={`text-6xl font-bold ${getScoreColor()}`}>
                  {result.totalScore}
                </p>
                <p className="text-xl text-muted-foreground">
                  out of {result.maxScore} marks
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  ({getScorePercentage()}%)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-physics" />
                    <span className="font-medium text-foreground">Physics</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {result.physics.correct}/{result.physics.total}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Beaker className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">Chemistry</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {result.chemistry.correct}/{result.chemistry.total}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-mathematics" />
                    <span className="font-medium text-foreground">Mathematics</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {result.mathematics.correct}/{result.mathematics.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="py-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Check your email for detailed scorecard & brochure
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Sent to {userData.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={handleRetakeTest}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retake Test
            </Button>

            <Link to="/">
              <Button className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;
