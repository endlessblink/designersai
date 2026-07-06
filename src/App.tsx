import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexHe from "./pages/IndexHe";
import About from "./pages/About";
import Artists from "./pages/Artists";
import Exhibitions from "./pages/Exhibitions";
import WeeklyPractice from "./pages/WeeklyPractice";
import Press from "./pages/Press";
import Join from "./pages/Join";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import CreatorSubmission from "./pages/CreatorSubmission";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/he" element={<IndexHe />} />
          <Route path="/about" element={<About />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/exhibitions/:slug" element={<Exhibitions />} />
          <Route path="/weekly-practice" element={<WeeklyPractice />} />
          <Route path="/press" element={<Press />} />
          <Route path="/join" element={<Join />} />
          <Route path="/creator-submission" element={<CreatorSubmission />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
