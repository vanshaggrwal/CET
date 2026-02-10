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
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
              Free Full-Length Mock Test
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Test Your CET Readiness
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real exam pattern • Instant results • No negative marking
            </p>
            <Link to="/mock-test/register">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Start Mock Test
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Exam Snapshot Card */}
      <section className="py-16">
        <div className="container">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Exam Snapshot
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">150</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">200</p>
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">3 Hours</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">No</p>
                  <p className="text-sm text-muted-foreground">Negative Marking</p>
                </div>
              </div>

              {/* Subject Breakdown */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-physics/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-physics" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Physics</p>
                    <p className="text-sm text-muted-foreground">50 Questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Beaker className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Chemistry</p>
                    <p className="text-sm text-muted-foreground">50 Questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-mathematics/10 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-mathematics" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Mathematics</p>
                    <p className="text-sm text-muted-foreground">50 Questions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Why Take This Mock Test?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Faculty Prepared</h3>
                <p className="text-sm text-muted-foreground">
                  Questions prepared by experienced first-year faculty members
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Academic Benchmarking</h3>
                <p className="text-sm text-muted-foreground">
                  Used for internal academic benchmarking by the institute
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get your scorecard and college brochure instantly via email
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Test Your Preparation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the free mock test now and benchmark your CET readiness
            </p>
            <Link to="/mock-test/register">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Start Mock Test
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MockTestLanding;
