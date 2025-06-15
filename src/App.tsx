import React from 'react';
import { UIToaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/components/AuthContext";
import Index from "./pages/Index";
import JobListings from "./pages/JobListings";
import JobDetail from "./pages/JobDetail";
import NotFound from "./pages/NotFound";
import SkillDevelopment from "./pages/SkillDevelopment";
import Employers from "./pages/Employers";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import Dashboard from "./pages/Dashboard";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY; // For Vite, adjust for other build tools

  if (!recaptchaSiteKey) {
    console.error("VITE_RECAPTCHA_SITE_KEY is not defined. CAPTCHA will not work.");
    // You might want to display a user-friendly error or fallback here
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <TooltipProvider>
              <UIToaster />
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/jobs" element={<JobListings />} />
                  <Route path="/jobs/:id" element={<JobDetail />} />
                  <Route path="/skills" element={<SkillDevelopment />} />
                  <Route path="/employers" element={<Employers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={
                    recaptchaSiteKey ? (
                      <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
                        <Auth />
                      </GoogleReCaptchaProvider>
                    ) : (
                      <Auth /> // Fallback if no site key, though CAPTCHA errors might occur
                    )
                  } />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/post-job" element={<PostJob />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
