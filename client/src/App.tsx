import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Splash from "./pages/Splash";
import Cadastro from "./pages/Cadastro";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Trilhas from "./pages/Trilhas";
import TrilhaDetalhe from "./pages/TrilhaDetalhe";
import ChatIA from "./pages/ChatIA";
import Builder from "./pages/Builder";
import Perfil from "./pages/Perfil";
import Portfolio from "./pages/Portfolio";
import CriandoSolucoes from "./pages/CriandoSolucoes";
import MeuPrimeiroAppTrilha from "./pages/MeuPrimeiroAppTrilha";
import EntendendoIA from "./pages/EntendendoIA";
import MissaoConteudo from "./pages/MissaoConteudo";
import Notificacoes from "./pages/Notificacoes";
import Ranking from "./pages/Ranking";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/home" component={Home} />
      <Route path="/trilhas" component={Trilhas} />
      <Route path="/trilha-detalhe" component={TrilhaDetalhe} />
      <Route path="/trilha-entendendo-ia" component={EntendendoIA} />
      <Route path="/trilha-solucoes" component={CriandoSolucoes} />
      <Route path="/trilha-meu-app" component={MeuPrimeiroAppTrilha} />
      <Route path="/missao/:trilha/:id" component={MissaoConteudo} />
      <Route path="/notificacoes" component={Notificacoes} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/chat" component={ChatIA} />
      <Route path="/builder" component={Builder} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
