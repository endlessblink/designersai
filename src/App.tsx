import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexHe from "./pages/IndexHe";
import About from "./pages/About";
import Artists from "./pages/Artists";
import ArtistProfile from "./pages/ArtistProfile";
import Exhibitions from "./pages/Exhibitions";
import WeeklyPractice from "./pages/WeeklyPractice";
import Press from "./pages/Press";
import Join from "./pages/Join";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import CreatorSubmission from "./pages/CreatorSubmission";
import Login from "./pages/Login";
import ProfileDashboard from "./pages/dashboard/ProfileDashboard";
import AdminArtists from "./pages/admin/AdminArtists";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexHe />} />
          <Route path="/en" element={<Index />} />
          <Route path="/he" element={<IndexHe />} />
          <Route path="/about" element={<About />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:slug" element={<ArtistProfile />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/exhibitions/:slug" element={<Exhibitions />} />
          <Route path="/weekly-practice" element={<WeeklyPractice />} />
          <Route path="/press" element={<Press />} />
          <Route path="/join" element={<Join />} />
          <Route path="/creator-submission" element={<CreatorSubmission />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/profile" element={<ProfileDashboard />} />
          <Route path="/dashboard/assets" element={<ProfileDashboard />} />
          <Route path="/admin" element={<AdminArtists />} />
          <Route path="/admin/artists" element={<AdminArtists />} />
          <Route path="/admin/submissions" element={<AdminArtists />} />
          <Route path="/admin/exhibitions" element={<AdminPlaceholder title="Exhibitions CMS" />} />
          <Route path="/admin/weekly-practice" element={<AdminPlaceholder title="Weekly Practice CMS" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
