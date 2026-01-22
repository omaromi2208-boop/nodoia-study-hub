import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Audiobooks from "./pages/Audiobooks";
import ExamMode from "./pages/ExamMode";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { StudyProvider } from "@/context/StudyContext";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/audiolibros" element={<Audiobooks />} />
          <Route path="/modo-examen" element={<ExamMode />} />
          <Route path="/perfil" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StudyProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </StudyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
