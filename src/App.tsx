import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/nodoia/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NewStudy from "./pages/NewStudy";
import MindMap from "./pages/MindMap";
import ExamMode from "./pages/ExamMode";
import Marketplace from "./pages/Marketplace";
import Subscription from "./pages/Subscription";
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
          <Route path="/nuevo-estudio" element={<NewStudy />} />
          <Route path="/mapa-mental" element={<MindMap />} />
          <Route path="/modo-examen" element={<ExamMode />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/suscripcion" element={<Subscription />} />
          <Route path="/perfil" element={<Profile />} />
          {/* Legacy routes redirect */}
          <Route path="/audiolibros" element={<Navigate to="/mapa-mental" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="neuroflow-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <StudyProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </StudyProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
