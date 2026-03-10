import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
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
import Configuracoes from "./pages/Configuracoes";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/EsqueciSenha";
import AjudaSuporte from "./pages/AjudaSuporte";
import { TutorialProvider } from "./components/TutorialOverlay";

// Ensino Médio — Novas telas
import HomeEM from "./pages/HomeEM";
import EnsinoMedio from "./pages/EnsinoMedio";
import TutorIA from "./pages/TutorIA";
import DesafioDoDia from "./pages/DesafioDoDia";
import RedacaoENEM from "./pages/RedacaoENEM";
import PlanoDeEstudos from "./pages/PlanoDeEstudos";
import ProgressoEM from "./pages/ProgressoEM";

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
      <Route path="/configuracoes" component={Configuracoes} />
      <Route path="/termos-de-uso" component={TermosDeUso} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
      <Route path="/login" component={Login} />
      <Route path="/esqueci-senha" component={EsqueciSenha} />
      <Route path="/ajuda" component={AjudaSuporte} />
      <Route path="/chat" component={ChatIA} />
      <Route path="/builder" component={Builder} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/portfolio" component={Portfolio} />
      {/* Ensino Médio */}
      <Route path="/home-em" component={HomeEM} />
      <Route path="/ensino-medio" component={EnsinoMedio} />
      <Route path="/tutor-ia" component={TutorIA} />
      <Route path="/desafio-do-dia" component={DesafioDoDia} />
      <Route path="/redacao-enem" component={RedacaoENEM} />
      <Route path="/plano-de-estudos" component={PlanoDeEstudos} />
      <Route path="/progresso-em" component={ProgressoEM} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

const BASE_PATH = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TutorialProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base={BASE_PATH}>
              <Router />
            </WouterRouter>
          </TooltipProvider>
        </TutorialProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
