import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApplicationProvider } from "@/context/ApplicationContext";
import Index from "./pages/Index";
import ApplicationDetail from "./pages/ApplicationDetail";
import PreviewCV from "./pages/PreviewCV";
import PreviewCL from "./pages/PreviewCL";
import Documents from "./pages/Documents";
import Share from "./pages/Share";
import IndexSpotlight from "./pages/IndexSpotlight";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApplicationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Application-hub-premium" replace />} />
            <Route path="/Application-hub-premium" element={<Index />} />
            <Route path="/Application-hub-premium-spotlight" element={<IndexSpotlight />} />
            <Route path="/application/:id" element={<ApplicationDetail />} />
            <Route path="/application/:id/preview-cv" element={<PreviewCV />} />
            <Route path="/application/:id/preview-cl" element={<PreviewCL />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/share" element={<Share />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ApplicationProvider>
  </QueryClientProvider>
);

export default App;
