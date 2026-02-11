import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Excellence Institute
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering students to achieve their dreams through quality education and comprehensive preparation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mock-test">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  Take Free CET Mock Test
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Expert Faculty</h3>
              <p className="text-sm text-muted-foreground">
                Learn from experienced educators dedicated to your success
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Comprehensive Curriculum</h3>
              <p className="text-sm text-muted-foreground">
                Structured programs covering all exam requirements
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Small Batch Sizes</h3>
              <p className="text-sm text-muted-foreground">
                Personalized attention for every student
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                Consistent track record of student success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Test Your CET Preparation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take our free full-length mock test and get instant results with detailed analysis
            </p>
            <Link to="/mock-test">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Start Mock Test
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Excellence Institute</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Excellence Institute. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
