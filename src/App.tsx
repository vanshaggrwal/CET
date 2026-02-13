import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MockTestLanding from "./pages/MockTestLanding";
import Registration from "./pages/Registration";
import Instructions from "./pages/Instructions";
import Exam from "./pages/Exam";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
import QuestionBank from "./admin/QuestionBank";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mock-test" element={<MockTestLanding />} />
          <Route path="/mock-test/register" element={<Registration />} />
          <Route path="/mock-test/instructions" element={<Instructions />} />
          <Route path="/mock-test/exam" element={<Exam />} />
          <Route path="/mock-test/results" element={<Results />} />
         <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="questions" element={<QuestionBank />} />
</Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
