import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Clock, 
  FileText, 
  Award, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Users,
  Beaker,
  Calculator
} from 'lucide-react';

const MockTestLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* ================= HERO ================= */}
      <section className="relative py-10 sm:py-14 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
  
  <div className="container px-4 relative">
    <div className="max-w-2xl mx-auto text-center">
      
      <Badge 
        variant="secondary" 
        className="mb-3 text-xs sm:text-sm bg-primary/10 text-primary"
      >
        Free Full-Length Mock Test
      </Badge>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
        Test Your CET Readiness
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 px-2">
        Real exam pattern • Instant results • No negative marking
      </p>

      <Link to="/mock-test/register">
        <Button 
          size="lg"
          className="gap-2 text-sm sm:text-base px-5 sm:px-6 py-4 sm:py-5 w-full sm:w-auto"
        >
          Start Mock Test
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Link>

    </div>
  </div>
</section>


      {/* ================= EXAM SNAPSHOT ================= */}
     <section className="py-6 sm:py-12">
  <div className="container px-3 sm:px-4">
    <Card className="max-w-4xl mx-auto border border-primary/20 shadow-sm">
      <CardContent className="p-4 sm:p-8">

        <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
          Exam Snapshot
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">

          {/* Questions */}
          <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted">
            <FileText className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
            <div>
              <p className="text-lg sm:text-2xl font-bold">150</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Questions
              </p>
            </div>
          </div>

          {/* Total Marks */}
          <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted">
            <Award className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
            <div>
              <p className="text-lg sm:text-2xl font-bold">150</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Total Marks
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted">
            <Clock className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
            <div>
              <p className="text-lg sm:text-2xl font-bold">3 Hours</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Duration
              </p>
            </div>
          </div>

          {/* Negative Marking */}
          <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted">
            <CheckCircle className="h-5 w-5 sm:h-8 sm:w-8 text-success" />
            <div>
              <p className="text-lg sm:text-2xl font-bold">No</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Negative Marking
              </p>
            </div>
          </div>

        </div>

        {/* Subject Breakdown */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-physics/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-physics" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium">Physics</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                50 Questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Beaker className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium">Chemistry</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                50 Questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-mathematics/10 flex items-center justify-center">
              <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-mathematics" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium">Mathematics</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                50 Questions
              </p>
            </div>
          </div>

        </div>

      </CardContent>
    </Card>
  </div>
</section>


      {/* ================= TRUST SECTION ================= */}
     <section className="py-8 sm:py-12 bg-muted/50">
  <div className="container px-4">
    <div className="max-w-4xl mx-auto">

      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center">
        Why Take This Mock Test?
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">

        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-lg bg-card border border-border">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-medium mb-1">
            Faculty Prepared
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Questions prepared by experienced first-year faculty members
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-lg bg-card border border-border">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-medium mb-1">
            Academic Benchmarking
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Used for internal academic benchmarking by the institute
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-lg bg-card border border-border">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-medium mb-1">
            Instant Results
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Get your scorecard and college brochure instantly via email
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

    </div>
  );
};

export default MockTestLanding;
