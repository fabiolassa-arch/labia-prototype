// LabIA — Constantes e dados do protótipo

export const IMAGES = {
  tutorRobot: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/tutor-robot-HYAEmVPAWUXa4eKbq7Vgwa.webp",
  splashBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/splash-bg-bxwcyriqZ4By2Sut6jp3gU.webp",
  avatarBoy: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/avatar-boy-C5eRe3ZJN5LTGtaxk9ZUio.webp",
  mathkidsIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/mathkids-icon-fvNkLpswAG4kQqNcAbuvkx.webp",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/labia-logo-transparent_4af3d3a2.png",
  logoWhite: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/labia-logo-white-v3_dce4300f.png",
};

export const TRACKS = [
  {
    id: 1,
    icon: "Brain" as const,
    title: "Entendendo a IA",
    description: "O que é IA e como ela funciona",
    progress: 100,
    color: "#7C3AED",
    badge: "Explorador de IA",
    badgeColor: "#10B981",
    locked: false,
    missions: 4,
    done: 4,
  },
  {
    id: 2,
    icon: "MessageSquare" as const,
    title: "Criando Prompts",
    description: "Aprenda a fazer perguntas poderosas",
    progress: 60,
    color: "#F97316",
    badge: "Mestre dos Prompts",
    badgeColor: "#F97316",
    locked: false,
    missions: 4,
    done: 2,
  },
  {
    id: 3,
    icon: "Settings" as const,
    title: "Criando Soluções",
    description: "Resolva problemas reais com IA",
    progress: 0,
    color: "#6B7280",
    badge: "Criador de Soluções",
    badgeColor: "#6B7280",
    locked: true,
    missions: 4,
    done: 0,
  },
  {
    id: 4,
    icon: "Rocket" as const,
    title: "Meu Primeiro App",
    description: "Crie seu próprio aplicativo",
    progress: 0,
    color: "#6B7280",
    badge: "Jovem Desenvolvedor",
    badgeColor: "#6B7280",
    locked: true,
    missions: 4,
    done: 0,
  },
];

export const MISSIONS_CRIANDO_PROMPTS = [
  {
    id: 1,
    title: "Converse corretamente com IA",
    description: "Converse corretamente com IA e complete uma interação com IA.",
    status: "completed" as const,
  },
  {
    id: 2,
    title: "Estruture um prompt eficiente",
    description: "Estruture um prompt eficiente e sua comunicação com a IA.",
    status: "active" as const,
  },
  {
    id: 3,
    title: "Refine e melhore respostas",
    description: "Refine e melhore respostas e qualifique a produção de respostas em IA.",
    status: "locked" as const,
  },
  {
    id: 4,
    title: "Analise a qualidade do prompt",
    description: "Analise a qualidade do prompt e avalie sua eficácia.",
    status: "locked" as const,
  },
];

export const MISSIONS_CRIANDO_SOLUCOES = [
  {
    id: 1,
    title: "Identifique um problema real",
    description: "Observe o mundo ao seu redor e identifique um problema do dia a dia que poderia ser resolvido com tecnologia.",
    status: "locked" as const,
  },
  {
    id: 2,
    title: "Gere ideias de solução com IA",
    description: "Use a IA como parceira criativa para gerar ideias de soluções para o problema que você identificou.",
    status: "locked" as const,
  },
  {
    id: 3,
    title: "Estruture sua solução",
    description: "Organize sua ideia em etapas claras: o que faz, para quem serve e como funciona.",
    status: "locked" as const,
  },
  {
    id: 4,
    title: "Pense como um criador de produto",
    description: "Defina funcionalidades, público-alvo e diferenciais da sua solução digital.",
    status: "locked" as const,
  },
];

export const MISSIONS_MEU_PRIMEIRO_APP = [
  {
    id: 1,
    title: "Defina a ideia do seu app",
    description: "Escolha um problema para resolver e dê um nome ao seu aplicativo. Toda grande invenção começa com uma ideia!",
    status: "locked" as const,
  },
  {
    id: 2,
    title: "Quem vai usar seu app?",
    description: "Defina o público-alvo e o objetivo principal do seu aplicativo. Para quem você está criando?",
    status: "locked" as const,
  },
  {
    id: 3,
    title: "Liste as funcionalidades",
    description: "Pense nas funcionalidades essenciais que seu app precisa ter para resolver o problema.",
    status: "locked" as const,
  },
  {
    id: 4,
    title: "Desenhe as telas do app",
    description: "Estruture as telas principais do seu aplicativo: tela inicial, tela principal e tela de resultado.",
    status: "locked" as const,
  },
  {
    id: 5,
    title: "Monte o fluxo principal",
    description: "Conecte as telas e defina o caminho que o usuário percorre do início ao fim do seu app.",
    status: "locked" as const,
  },
];

export const BADGES = [
  {
    id: 1,
    icon: "Brain" as const,
    label: "Explorador de IA",
    earned: true,
    color: "#10B981",
    progress: 100,
    track: "Entendendo a IA",
    motivationTitle: "Parabéns, Explorador!",
    motivationMessage: "Você completou a trilha \"Entendendo a IA\" e agora sabe como a Inteligência Artificial funciona! Esse é o primeiro passo para se tornar um criador digital.",
    nextStep: "Sua próxima missão é dominar a arte de criar prompts poderosos. Vamos lá?",
    nextTrack: "Criando Prompts",
    nextRoute: "/trilha-detalhe",
  },
  {
    id: 2,
    icon: "MessageSquare" as const,
    label: "Mestre dos Prompts",
    earned: false,
    color: "#F97316",
    progress: 60,
    track: "Criando Prompts",
    motivationTitle: "Quase lá, futuro Mestre!",
    motivationMessage: "Você já está com 60% da trilha \"Criando Prompts\" concluída! Continue praticando e logo vai dominar a comunicação com a IA.",
    nextStep: "Complete as missões restantes para conquistar esta insígnia e desbloquear a trilha \"Criando Soluções\"!",
    nextTrack: "Criando Prompts",
    nextRoute: "/trilha-detalhe",
  },
  {
    id: 3,
    icon: "Settings" as const,
    label: "Criador de Soluções",
    earned: false,
    color: "#6B7280",
    progress: 0,
    track: "Criando Soluções",
    motivationTitle: "Uma grande aventura te espera!",
    motivationMessage: "Nesta trilha você vai aprender a identificar problemas reais e criar soluções incríveis usando Inteligência Artificial como sua aliada.",
    nextStep: "Complete a trilha \"Criando Prompts\" para desbloquear esta insígnia e começar a criar soluções!",
    nextTrack: "Criando Prompts",
    nextRoute: "/trilha-solucoes",
  },
  {
    id: 4,
    icon: "Rocket" as const,
    label: "Jovem Desenvolvedor",
    earned: false,
    color: "#6B7280",
    progress: 0,
    track: "Meu Primeiro App",
    motivationTitle: "O futuro é seu!",
    motivationMessage: "Esta é a insígnia final! Ao conquistá-la, você terá criado seu primeiro aplicativo do zero. Imagine só: um app feito por você!",
    nextStep: "Complete todas as trilhas anteriores para desbloquear e construir seu próprio app!",
    nextTrack: "Criando Soluções",
    nextRoute: "/trilha-meu-app",
  },
];

export const CHAT_MESSAGES = [
  {
    id: 1,
    sender: "tutor" as const,
    text: "Ótimo! Agora tente criar um prompt para pedir à IA que explique **fotossíntese** para uma criança de 8 anos. Lembre-se: contexto + objetivo + formato!",
  },
  {
    id: 2,
    sender: "student" as const,
    text: "Explique **fotossíntese** de forma simples para uma criança de 8 anos, usando uma analogia com algo do cotidiano.",
  },
  {
    id: 3,
    sender: "tutor" as const,
    text: "Excelente prompt! Você usou contexto, público-alvo e pediu um formato específico.\n\n**Nota: 9/10!**",
    rating: 9.0,
  },
];

export const BUILDER_STEPS = [
  "Nome do App",
  "Objetivo",
  "Público-alvo",
  "Funcionalidades",
  "Estrutura de Telas",
  "Fluxo Principal",
];

export const USER_PROFILE = {
  name: "Lucas Oliveira",
  level: 2,
  title: "Explorador Digital",
  missionsCompleted: 5,
  appsCreated: 1,
  tracksStarted: 2,
  hoursLearning: 3,
};
