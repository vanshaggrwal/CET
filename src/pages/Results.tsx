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

    <div className="container px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">

        {/* Submission Warnings */}
        {submissionReason === "violation" && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
            <p className="text-destructive font-medium text-sm sm:text-base">
              Test submitted due to navigation away from exam window.
            </p>
          </div>
        )}

        {submissionReason === "timeout" && (
          <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/30 text-center">
            <p className="text-warning font-medium text-sm sm:text-base">
              Test auto-submitted as time expired.
            </p>
          </div>
        )}

        {/* Main Result Card */}
        <Card className="border-2 border-primary/20 shadow-lg mb-8">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>

            <CardTitle className="text-xl sm:text-2xl">
              {getScoreMessage()}
            </CardTitle>

            <p className="text-muted-foreground text-sm sm:text-base">
              {userData.firstName} {userData.lastName}
            </p>
          </CardHeader>

          <CardContent>
            {/* Total Score */}
            <div className="text-center mb-8">
              <p className={`text-4xl sm:text-6xl font-bold ${getScoreColor()}`}>
                {result.totalScore}
              </p>

              <p className="text-base sm:text-xl text-muted-foreground">
                out of {result.maxScore} marks
              </p>

              <p className="text-sm sm:text-lg text-muted-foreground mt-2">
                ({getScorePercentage()}%)
              </p>
            </div>

            {/* Subject Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Physics */}
              <div className="p-4 rounded-lg bg-muted text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-physics" />
                  <span className="font-medium">Physics</span>
                </div>

                <p className="text-xl sm:text-2xl font-bold">
                  {result.physics.correct}/{result.physics.total}
                </p>

                <p className="text-xs sm:text-sm font-medium">
                  Attempted: {result.physics.attempted}
                </p>
              </div>

              {/* Chemistry */}
              <div className="p-4 rounded-lg bg-muted text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Beaker className="h-5 w-5 text-success" />
                  <span className="font-medium">Chemistry</span>
                </div>

                <p className="text-xl sm:text-2xl font-bold">
                  {result.chemistry.correct}/{result.chemistry.total}
                </p>

                <p className="text-xs sm:text-sm font-medium">
                  Attempted: {result.chemistry.attempted}
                </p>
              </div>

              {/* Mathematics */}
              <div className="p-4 rounded-lg bg-muted text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calculator className="h-5 w-5 text-mathematics" />
                  <span className="font-medium">Mathematics</span>
                </div>

                <p className="text-xl sm:text-2xl font-bold">
                  {result.mathematics.correct}/{result.mathematics.total}
                </p>

                <p className="text-xs sm:text-sm font-medium">
                  Attempted: {result.mathematics.attempted}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Info Card */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-medium">
                  Check your email for detailed scorecard & brochure
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sent to {userData.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleRetakeTest}
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Test
          </Button>

          <Link to="/" className="w-full sm:w-auto">
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
}
export default Results;
