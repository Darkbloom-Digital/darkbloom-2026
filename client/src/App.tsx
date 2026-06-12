import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import Home from "@/pages/Home";

const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Services = lazy(() => import("@/pages/Services"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const PerformanceAudit = lazy(() => import("@/pages/PerformanceAudit"));
const CroBlueprint = lazy(() => import("@/pages/CroBlueprint"));
const Faq = lazy(() => import("@/pages/Faq"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#e61e50] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/performance-audit" component={PerformanceAudit} />
        <Route path="/cro-blueprint" component={CroBlueprint} />
        <Route path="/faq" component={Faq} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-right" theme="dark" />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
