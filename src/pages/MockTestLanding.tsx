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
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        <div className="container px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            
            <Badge 
              variant="secondary" 
              className="mb-4 bg-primary/10 text-primary"
            >
              Free Full-Length Mock Test
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Test Your CET Readiness
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 px-2">
              Real exam pattern • Instant results • No negative marking
            </p>

            <Link to="/mock-test/register">
              <Button 
                size="lg" 
                className="gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              >
                Start Mock Test
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

          </div>
        </div>
      </section>

      {/* ================= EXAM SNAPSHOT ================= */}
      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-lg">
            <CardContent className="p-6 sm:p-8">

              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 text-center">
                Exam Snapshot
              </h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

  {/* Questions */}
  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
    <FileText className="h-8 w-8 text-primary mt-1" />
    <div>
      <p className="text-2xl font-bold text-foreground">150</p>
      <p className="text-sm text-muted-foreground">Questions</p>
    </div>
  </div>

  {/* Total Marks */}
  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
    <Award className="h-8 w-8 text-primary mt-1" />
    <div>
      <p className="text-2xl font-bold text-foreground">200</p>
      <p className="text-sm text-muted-foreground">Total Marks</p>
    </div>
  </div>

  {/* Duration */}
  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
    <Clock className="h-8 w-8 text-primary mt-1" />
    <div>
      <p className="text-2xl font-bold text-foreground">3 Hours</p>
      <p className="text-sm text-muted-foreground">Duration</p>
    </div>
  </div>

  {/* Negative Marking */}
  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
    <CheckCircle className="h-8 w-8 text-success mt-1" />
    <div>
      <p className="text-2xl font-bold text-foreground">No</p>
      <p className="text-sm text-muted-foreground">Negative Marking</p>
    </div>
  </div>

</div>


              {/* Subject Breakdown */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-physics/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-physics" />
                  </div>
                  <div>
                    <p className="font-medium">Physics</p>
                    <p className="text-sm text-muted-foreground">50 Questions</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Beaker className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">Chemistry</p>
                    <p className="text-sm text-muted-foreground">50 Questions</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-mathematics/10 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-mathematics" />
                  </div>
                  <div>
                    <p className="font-medium">Mathematics</p>
                    <p className="text-sm text-muted-foreground">50 Questions</p>
                  </div>
                </div>

              </div>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">

            <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">
              Why Take This Mock Test?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Faculty Prepared</h3>
                <p className="text-sm text-muted-foreground">
                  Questions prepared by experienced first-year faculty members
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Academic Benchmarking</h3>
                <p className="text-sm text-muted-foreground">
                  Used for internal academic benchmarking by the institute
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
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
