import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import ContactPage from "@/pages/Contact";
import CaseStudies from "@/pages/CaseStudies";
import PerformanceAudit from "@/pages/PerformanceAudit";
import CroBlueprint from "@/pages/CroBlueprint";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/performance-audit" component={PerformanceAudit} />
      <Route path="/cro-blueprint" component={CroBlueprint} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-right" theme="dark" />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
