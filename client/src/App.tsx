import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client";
import { NhostProvider } from "@nhost/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { apolloClient } from "./lib/graphql";
import { nhost } from "./lib/nhost";
import { useAuth } from "./hooks/useAuth";
import { AuthScreen } from "./components/auth/AuthScreen";
import ChatPage from "./pages/chat";
import NotFound from "@/pages/not-found";
import { LoadingSpinner } from "./components/ui/loading-spinner";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-16 w-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <LoadingSpinner size="lg" className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Loading...</h3>
          <p className="text-sm text-slate-600">Setting up your secure chat environment</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <Switch>
      <Route path="/" component={ChatPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </NhostProvider>
  );
}

export default App;
