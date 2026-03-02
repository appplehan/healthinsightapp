import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BMICalculator from "./pages/BMICalculator";
import CaloriesCalculator from "./pages/CaloriesCalculator";
import WaterIntake from "./pages/WaterIntake";
import SleepScore from "./pages/SleepScore";
import HeartRateAnalyzer from "./pages/HeartRateAnalyzer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/calories-calculator" element={<CaloriesCalculator />} />
          <Route path="/water-intake" element={<WaterIntake />} />
          <Route path="/sleep-score" element={<SleepScore />} />
          <Route path="/heart-rate-analyzer" element={<HeartRateAnalyzer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
