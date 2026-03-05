// LabIA — Constantes e dados do protótipo

export const IMAGES = {
  tutorRobot: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/tutor-robot-HYAEmVPAWUXa4eKbq7Vgwa.webp",
  splashBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/splash-bg-bxwcyriqZ4By2Sut6jp3gU.webp",
  avatarBoy: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/avatar-boy-C5eRe3ZJN5LTGtaxk9ZUio.webp",
  mathkidsIcon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/mathkids-icon-fvNkLpswAG4kQqNcAbuvkx.webp",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/labia-logo-transparent_4af3d3a2.png",
  logoWhite: "https://d2xsxph8kpxj0f.cloudfront.net/310519663095527403/9MQHs5b376g4jRiSDo79nL/labia-logo-white-v3_dce4300f.png",
};

export type NotificationType = "conquista" | "lembrete" | "sistema" | "social";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
  action?: string;
  actionRoute?: string;
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "conquista",
    title: "Insígnia Conquistada!",
    message: 'Parabéns! Você conquistou a insígnia "Explorador de IA" ao completar a trilha Entendendo a IA.',
    time: "Agora mesmo",
    read: false,
    icon: "Trophy",
    color: "#10B981",
    action: "Ver insígnia",
    actionRoute: "/portfolio",
  },
  {
    id: 2,
    type: "lembrete",
    title: "Missão pendente",
    message: 'Você está quase lá! Continue a missão "Estruture um prompt eficiente" na trilha Criando Prompts.',
    time: "2h atrás",
    read: false,
    icon: "Clock",
    color: "#F97316",
    action: "Continuar missão",
    actionRoute: "/trilha-detalhe",
  },
  {
    id: 3,
    type: "conquista",
    title: "Nota máxima!",
    message: 'Você tirou 10/10 na missão "O que é Inteligência Artificial?". Compartilhe com seus amigos!',
    time: "5h atrás",
    read: false,
    icon: "Star",
    color: "#F59E0B",
    action: "Revisar missão",
    actionRoute: "/missao/entendendo/1",
  },
  {
    id: 4,
    type: "sistema",
    title: "Nova trilha disponível!",
    message: 'A trilha "Criando Prompts" foi desbloqueada. Comece agora e aprenda a fazer perguntas poderosas para a IA!',
    time: "1 dia atrás",
    read: true,
    icon: "Unlock",
    color: "#7C3AED",
    action: "Iniciar trilha",
    actionRoute: "/trilha-detalhe",
  },
  {
    id: 5,
    type: "lembrete",
    title: "Sequência de 3 dias!",
    message: "Você está em uma sequência de 3 dias consecutivos! Continue estudando para não perder o ritmo.",
    time: "1 dia atrás",
    read: true,
    icon: "Flame",
    color: "#EF4444",
  },
  {
    id: 6,
    type: "social",
    title: "Seu amigo completou uma trilha",
    message: 'Maria Silva completou a trilha "Entendendo a IA". Envie uma mensagem de parabéns!',
    time: "2 dias atrás",
    read: true,
    icon: "Users",
    color: "#06B6D4",
  },
  {
    id: 7,
    type: "sistema",
    title: "Bem-vindo ao LabIA!",
    message: "Sua jornada na Inteligência Artificial começa agora. Explore a primeira trilha e descubra o mundo da IA!",
    time: "3 dias atrás",
    read: true,
    icon: "Sparkles",
    color: "#8B5CF6",
    action: "Começar",
    actionRoute: "/trilha-entendendo-ia",
  },
];

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

export const MISSIONS_ENTENDENDO_IA = [
  {
    id: 1,
    title: "O que é Inteligência Artificial?",
    description: "Descubra o que é IA, como ela está presente no seu dia a dia e por que ela é tão importante para o futuro.",
    status: "completed" as const,
  },
  {
    id: 2,
    title: "Como a IA responde?",
    description: "Entenda como a IA processa informações e gera respostas. Veja como ela 'pensa' de um jeito diferente dos humanos.",
    status: "completed" as const,
  },
  {
    id: 3,
    title: "Faça sua primeira pergunta",
    description: "Interaja com a IA pela primeira vez! Faça uma pergunta e observe como ela responde. Aprenda a avaliar a qualidade da resposta.",
    status: "completed" as const,
  },
  {
    id: 4,
    title: "IA no mundo real",
    description: "Explore exemplos reais de IA: assistentes virtuais, recomendações, tradução automática e muito mais. Identifique a IA ao seu redor!",
    status: "completed" as const,
  },
];

// Dados detalhados das missões concluídas para tela de revisão
export type MissionDetail = {
  id: string; // formato: "trilha-missao" ex: "entendendo-1"
  trackSlug: string;
  trackTitle: string;
  trackColor: string;
  missionNumber: number;
  title: string;
  objective: string;
  challenge: string;
  studentAnswer: string;
  tutorFeedback: string;
  score: number;
  maxScore: number;
  completedAt: string;
  tips: string[];
  tags: string[];
};

export const MISSION_DETAILS: MissionDetail[] = [
  // --- Trilha: Entendendo a IA ---
  {
    id: "entendendo-1",
    trackSlug: "entendendo-ia",
    trackTitle: "Entendendo a IA",
    trackColor: "#7C3AED",
    missionNumber: 1,
    title: "O que é Inteligência Artificial?",
    objective: "Compreender o conceito de Inteligência Artificial e identificar exemplos no cotidiano.",
    challenge: "Escreva com suas palavras o que você entende por Inteligência Artificial e dê 3 exemplos de IA que você usa no dia a dia.",
    studentAnswer: "Inteligência Artificial é quando um computador consegue fazer coisas que normalmente só pessoas fazem, como entender o que a gente fala e responder. Exemplos: 1) A Alexa que responde minhas perguntas em casa, 2) O YouTube que sugere vídeos que eu gosto, 3) O corretor do celular que adivinha a palavra que eu quero escrever.",
    tutorFeedback: "Excelente resposta, Lucas! Você captou muito bem a essência da IA — máquinas que simulam capacidades humanas. Seus 3 exemplos são perfeitos e mostram que você já percebe a IA ao seu redor. A Alexa usa processamento de linguagem natural, o YouTube usa algoritmos de recomendação, e o teclado preditivo usa aprendizado de máquina. Parabéns!",
    score: 10,
    maxScore: 10,
    completedAt: "28 Fev 2026",
    tips: ["IA não pensa como humanos — ela processa dados e encontra padrões", "Existem IAs especializadas (uma tarefa) e IAs gerais (várias tarefas)"],
    tags: ["Conceito de IA", "Exemplos práticos", "Cotidiano"],
  },
  {
    id: "entendendo-2",
    trackSlug: "entendendo-ia",
    trackTitle: "Entendendo a IA",
    trackColor: "#7C3AED",
    missionNumber: 2,
    title: "Como a IA responde?",
    objective: "Entender o processo básico de como uma IA recebe uma pergunta e gera uma resposta.",
    challenge: "Explique com suas palavras como você acha que a IA faz para entender sua pergunta e criar uma resposta. Use uma analogia se quiser!",
    studentAnswer: "Eu acho que a IA funciona mais ou menos como uma biblioteca gigante. Quando eu faço uma pergunta, ela procura em milhões de textos que já leu e monta uma resposta juntando as informações mais importantes. É como se ela fosse uma pessoa que leu todos os livros do mundo e consegue lembrar de tudo!",
    tutorFeedback: "Que analogia incrível, Lucas! A ideia da \"biblioteca gigante\" é muito boa. Na prática, a IA foi treinada com bilhões de textos e aprendeu padrões de linguagem. Ela não \"lembra\" exatamente, mas aprendeu a prever qual palavra vem depois da outra. Um detalhe importante: a IA não entende de verdade — ela é muito boa em parecer que entende!",
    score: 9,
    maxScore: 10,
    completedAt: "28 Fev 2026",
    tips: ["A IA usa modelos de linguagem treinados com bilhões de textos", "Ela prevê a próxima palavra mais provável, não 'pensa' como nós"],
    tags: ["Processamento", "Linguagem natural", "Analogia"],
  },
  {
    id: "entendendo-3",
    trackSlug: "entendendo-ia",
    trackTitle: "Entendendo a IA",
    trackColor: "#7C3AED",
    missionNumber: 3,
    title: "Faça sua primeira pergunta",
    objective: "Realizar a primeira interação prática com a IA e avaliar a qualidade da resposta recebida.",
    challenge: "Faça uma pergunta sobre qualquer assunto para a IA. Depois, avalie: a resposta foi clara? Foi útil? Você mudaria algo na sua pergunta?",
    studentAnswer: "Perguntei: 'O que são buracos negros?' A IA respondeu explicando que são regiões do espaço com gravidade tão forte que nem a luz escapa. Achei a resposta clara e fácil de entender! Mas acho que poderia ter perguntado de um jeito mais específico, tipo 'Explique buracos negros para uma criança de 10 anos', para a resposta ficar ainda mais simples.",
    tutorFeedback: "Muito bem, Lucas! Você não só fez a pergunta como também refletiu sobre como melhorá-la — isso é pensamento crítico! Sua observação sobre ser mais específico é exatamente o que vamos aprender na próxima trilha: a arte de criar bons prompts. Você já está pensando como um criador!",
    score: 10,
    maxScore: 10,
    completedAt: "01 Mar 2026",
    tips: ["Quanto mais específica a pergunta, melhor a resposta da IA", "Sempre avalie se a resposta faz sentido — a IA pode errar!"],
    tags: ["Primeira interação", "Pensamento crítico", "Avaliação"],
  },
  {
    id: "entendendo-4",
    trackSlug: "entendendo-ia",
    trackTitle: "Entendendo a IA",
    trackColor: "#7C3AED",
    missionNumber: 4,
    title: "IA no mundo real",
    objective: "Identificar aplicações reais de IA em diferentes áreas e refletir sobre seu impacto.",
    challenge: "Liste pelo menos 5 aplicações de IA no mundo real, em áreas diferentes (saúde, educação, entretenimento, etc). Para cada uma, explique brevemente o que a IA faz.",
    studentAnswer: "1) Saúde: IA que analisa exames de raio-X e ajuda médicos a encontrar doenças mais rápido. 2) Educação: Plataformas como o LabIA que adaptam o ensino para cada aluno. 3) Entretenimento: Netflix e Spotify que recomendam filmes e músicas baseado no que eu gosto. 4) Transporte: Carros autônomos como os da Tesla que dirigem sozinhos. 5) Tradução: Google Tradutor que traduz textos e até conversas em tempo real.",
    tutorFeedback: "Resposta completa e diversificada! Você cobriu 5 áreas diferentes com exemplos reais e relevantes. Adorei que você incluiu o LabIA como exemplo de IA na educação — mostra que você entende que está usando IA agora mesmo! Cada exemplo demonstra um tipo diferente de IA. Trilha concluída com maestria!",
    score: 10,
    maxScore: 10,
    completedAt: "01 Mar 2026",
    tips: ["A IA está em mais lugares do que imaginamos", "Nem toda IA é visível — muitas trabalham nos bastidores"],
    tags: ["Aplicações reais", "Diversidade", "Impacto social"],
  },
  // --- Trilha: Criando Prompts ---
  {
    id: "prompts-1",
    trackSlug: "criando-prompts",
    trackTitle: "Criando Prompts",
    trackColor: "#F97316",
    missionNumber: 1,
    title: "Converse corretamente com IA",
    objective: "Aprender a se comunicar de forma clara e eficiente com a Inteligência Artificial.",
    challenge: "Converse com a IA sobre um tema que você goste. Faça pelo menos 3 perguntas diferentes e observe como pequenas mudanças na forma de perguntar alteram a resposta.",
    studentAnswer: "Conversei sobre futebol! Pergunta 1: 'Quem é o melhor jogador?' — A IA deu uma resposta genérica sobre vários jogadores. Pergunta 2: 'Quem é o melhor jogador de futebol da história segundo as estatísticas?' — Resposta mais focada, com dados. Pergunta 3: 'Compare Pelé e Messi usando gols, títulos e prêmios individuais' — Resposta super detalhada com tabela! Aprendi que quanto mais detalhes eu dou, melhor a resposta.",
    tutorFeedback: "Excelente experimento, Lucas! Você demonstrou perfeitamente como a especificidade melhora as respostas. Da pergunta vaga à pergunta estruturada, a qualidade subiu muito. Sua terceira pergunta já tem elementos de um bom prompt: contexto (futebol), critérios (gols, títulos, prêmios) e formato implícito (comparação). Você está pronto para a próxima missão!",
    score: 9,
    maxScore: 10,
    completedAt: "02 Mar 2026",
    tips: ["Perguntas vagas geram respostas vagas", "Adicionar critérios e contexto melhora drasticamente a resposta"],
    tags: ["Comunicação", "Especificidade", "Iteração"],
  },
  {
    id: "prompts-2",
    trackSlug: "criando-prompts",
    trackTitle: "Criando Prompts",
    trackColor: "#F97316",
    missionNumber: 2,
    title: "Estruture um prompt eficiente",
    objective: "Aprender a estruturar prompts usando a fórmula: Contexto + Objetivo + Formato para obter respostas precisas da IA.",
    challenge: "Crie um prompt para pedir à IA que explique fotossíntese para uma criança de 8 anos. Use a fórmula: defina o contexto, o objetivo e o formato desejado da resposta.",
    studentAnswer: "Meu prompt: 'Explique fotossíntese de forma simples para uma criança de 8 anos, usando uma analogia com algo do cotidiano, como cozinhar.' Contexto: ciência para crianças. Objetivo: explicar fotossíntese de forma acessível. Formato: analogia com cozinha. A IA respondeu comparando a planta a um chef que usa luz do sol como fogão, água como ingrediente e CO2 como tempero para 'cozinhar' seu alimento (glicose). Achei genial!",
    tutorFeedback: "Excelente prompt, Lucas! Você aplicou perfeitamente a fórmula Contexto + Objetivo + Formato. O contexto (criança de 8 anos) definiu a linguagem, o objetivo (explicar fotossíntese) foi claro, e o formato (analogia com cozinha) tornou a resposta criativa e memorável. A IA conseguiu gerar uma explicação perfeita porque seu prompt foi bem estruturado. Nota quase perfeita!",
    score: 9,
    maxScore: 10,
    completedAt: "03 Mar 2026",
    tips: ["A fórmula Contexto + Objetivo + Formato é sua melhor amiga", "Definir o público-alvo no prompt ajuda a IA a ajustar a linguagem", "Pedir um formato específico (lista, analogia, tabela) melhora muito a resposta"],
    tags: ["Estrutura de prompt", "Fórmula C+O+F", "Analogias"],
  },
  {
    id: "prompts-3",
    trackSlug: "criando-prompts",
    trackTitle: "Criando Prompts",
    trackColor: "#F97316",
    missionNumber: 3,
    title: "Refine e melhore respostas",
    objective: "Aprender a técnica de refinamento iterativo: pedir à IA que melhore, corrija ou aprofunde uma resposta anterior.",
    challenge: "Peça à IA para explicar como funciona a internet. Depois, refine o prompt 3 vezes: primeiro simplifique, depois peça exemplos práticos, e por fim peça um resumo em 3 tópicos. Compare as respostas.",
    studentAnswer: "Prompt 1: 'Como funciona a internet?' — Resposta técnica e longa, difícil de entender. Prompt 2: 'Simplifique essa explicação para uma criança de 10 anos' — Ficou mais fácil, mas ainda confuso. Prompt 3: 'Agora dê 3 exemplos do dia a dia que mostram a internet funcionando' — Exemplos com Netflix, WhatsApp e jogos online, muito claro! Prompt 4: 'Resuma tudo em 3 tópicos principais' — 1) A internet conecta computadores do mundo todo, 2) Os dados viajam por cabos e satélites, 3) Cada site tem um endereço único (IP). Perfeito!",
    tutorFeedback: "Brilhante trabalho de refinamento, Lucas! Você demonstrou uma habilidade essencial: a iteração. Em vez de aceitar a primeira resposta, você foi moldando a IA passo a passo até chegar no resultado ideal. Cada refinamento tornou a resposta mais clara e útil. Essa técnica de 'conversa progressiva' é usada por profissionais que trabalham com IA todos os dias. Você está pensando como um expert!",
    score: 10,
    maxScore: 10,
    completedAt: "03 Mar 2026",
    tips: ["Nunca aceite a primeira resposta — sempre dá para melhorar!", "Refinar é como esculpir: cada ajuste revela algo melhor", "Use palavras como 'simplifique', 'dê exemplos', 'resuma' para guiar a IA"],
    tags: ["Refinamento iterativo", "Simplificação", "Resumo"],
  },
  {
    id: "prompts-4",
    trackSlug: "criando-prompts",
    trackTitle: "Criando Prompts",
    trackColor: "#F97316",
    missionNumber: 4,
    title: "Analise a qualidade do prompt",
    objective: "Desenvolver pensamento crítico para avaliar e pontuar a qualidade de prompts, identificando pontos fortes e fracos.",
    challenge: "Analise estes 3 prompts e dê uma nota de 1 a 10 para cada, explicando o porquê: 1) 'Me fala sobre animais', 2) 'Liste 5 animais em extinção no Brasil com nome, habitat e principal ameaça', 3) 'Crie uma tabela comparando 5 animais em extinção no Brasil, incluindo nome popular, nome científico, habitat, principal ameaça e status de conservação, ordenados do mais crítico ao menos crítico'.",
    studentAnswer: "Prompt 1 — Nota 3/10: Muito vago, sem contexto nem objetivo. A IA pode falar sobre qualquer animal de qualquer jeito. Falta tudo: público, formato, foco. Prompt 2 — Nota 7/10: Bem melhor! Tem número específico (5), tema claro (extinção no Brasil) e formato implícito (lista com 3 dados). Mas poderia pedir um formato mais organizado. Prompt 3 — Nota 10/10: Perfeito! Tem formato (tabela), dados específicos (5 colunas), critério de ordenação e contexto completo. A IA vai gerar exatamente o que foi pedido.",
    tutorFeedback: "Análise impecável, Lucas! Suas notas e justificativas mostram que você internalizou completamente os princípios de um bom prompt. Você identificou com precisão: a falta de especificidade no prompt 1, a melhoria parcial no prompt 2, e a excelência do prompt 3. Sua capacidade de avaliar criticamente prompts é uma habilidade valiosa. Trilha Criando Prompts concluída com maestria! Você agora é um Mestre dos Prompts!",
    score: 10,
    maxScore: 10,
    completedAt: "04 Mar 2026",
    tips: ["Um bom prompt tem: contexto, objetivo, formato e critérios claros", "Avalie sempre: a IA entenderia exatamente o que eu quero?", "Prompts vagos = respostas genéricas. Prompts precisos = respostas incríveis"],
    tags: ["Pensamento crítico", "Avaliação de prompts", "Qualidade"],
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

// ─── Ranking / Leaderboard ───
export interface RankingPlayer {
  id: number;
  name: string;
  avatar: string;
  level: number;
  title: string;
  xp: number;
  missions: number;
  badges: number;
  streak: number;
  isCurrentUser?: boolean;
  trend: "up" | "down" | "same";
  trendPositions?: number;
}

export const RANKING_PLAYERS: RankingPlayer[] = [
  {
    id: 1,
    name: "Ana Beatriz",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=80&h=80&fit=crop&crop=face",
    level: 5,
    title: "Mestra Digital",
    xp: 4850,
    missions: 16,
    badges: 4,
    streak: 12,
    trend: "same",
  },
  {
    id: 2,
    name: "Pedro Henrique",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    level: 4,
    title: "Criador de Apps",
    xp: 4200,
    missions: 14,
    badges: 3,
    streak: 8,
    trend: "up",
    trendPositions: 1,
  },
  {
    id: 3,
    name: "Maria Silva",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    level: 4,
    title: "Solucionadora",
    xp: 3900,
    missions: 13,
    badges: 3,
    streak: 5,
    trend: "down",
    trendPositions: 1,
  },
  {
    id: 4,
    name: "Lucas Oliveira",
    avatar: "",
    level: 2,
    title: "Explorador",
    xp: 2100,
    missions: 5,
    badges: 1,
    streak: 3,
    isCurrentUser: true,
    trend: "up",
    trendPositions: 2,
  },
  {
    id: 5,
    name: "Julia Santos",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    level: 2,
    title: "Exploradora",
    xp: 1950,
    missions: 5,
    badges: 1,
    streak: 2,
    trend: "down",
    trendPositions: 1,
  },
  {
    id: 6,
    name: "Gabriel Costa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    level: 2,
    title: "Explorador",
    xp: 1800,
    missions: 4,
    badges: 1,
    streak: 1,
    trend: "same",
  },
  {
    id: 7,
    name: "Isabella Lima",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    level: 1,
    title: "Iniciante",
    xp: 1200,
    missions: 3,
    badges: 1,
    streak: 4,
    trend: "up",
    trendPositions: 2,
  },
  {
    id: 8,
    name: "Rafael Souza",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    level: 1,
    title: "Iniciante",
    xp: 950,
    missions: 2,
    badges: 0,
    streak: 1,
    trend: "down",
    trendPositions: 1,
  },
  {
    id: 9,
    name: "Camila Ferreira",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    level: 1,
    title: "Iniciante",
    xp: 600,
    missions: 1,
    badges: 0,
    streak: 1,
    trend: "same",
  },
  {
    id: 10,
    name: "Thiago Alves",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    level: 1,
    title: "Iniciante",
    xp: 350,
    missions: 1,
    badges: 0,
    streak: 0,
    trend: "same",
  },
];
