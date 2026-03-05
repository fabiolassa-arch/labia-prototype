/**
 * Ajuda e Suporte — FAQ por categorias + Formulário de contato
 * Design: Cards expansíveis com ícones coloridos, formulário interativo
 * Paleta: #1C1C2E (bg), #7C3AED (roxo), #F97316 (laranja), #10B981 (verde), #3B82F6 (azul)
 * Fonte: Nunito (headings) + Inter (body)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, Search, ChevronDown, HelpCircle, BookOpen,
  Zap, Award, Shield, MessageSquare, Send, CheckCircle2,
  Lightbulb, Smartphone, CreditCard, Users, Bot,
  Sparkles, Phone, Mail, Clock,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

/* ─── FAQ Data ─── */
const FAQ_CATEGORIES = [
  {
    id: "inicio",
    title: "Primeiros Passos",
    icon: Sparkles,
    color: "#F97316",
    questions: [
      {
        q: "Como começo a usar o LabIA?",
        a: "Após criar sua conta, você será guiado pelo Tutor IA em um onboarding interativo. Comece pela trilha 'Entendendo a IA' — ela é desbloqueada automaticamente e vai te ensinar os conceitos básicos de inteligência artificial de forma divertida!",
      },
      {
        q: "Preciso ter conhecimento prévio de tecnologia?",
        a: "Não! O LabIA foi feito para jovens de 13 a 21 anos, independente do nível de conhecimento. As trilhas começam do zero e vão avançando gradualmente. O Tutor IA adapta as explicações ao seu ritmo.",
      },
      {
        q: "O app é gratuito?",
        a: "Sim! O LabIA é totalmente gratuito. Todas as trilhas, missões e funcionalidades estão disponíveis sem custo. Nosso objetivo é democratizar o acesso à educação em inteligência artificial.",
      },
    ],
  },
  {
    id: "trilhas",
    title: "Trilhas e Missões",
    icon: BookOpen,
    color: "#7C3AED",
    questions: [
      {
        q: "Como desbloquear novas trilhas?",
        a: "As trilhas seguem uma ordem progressiva. Complete todas as missões de uma trilha para desbloquear a próxima. A ordem é: Entendendo a IA → Criando Prompts → Criando Soluções → Meu Primeiro App.",
      },
      {
        q: "Posso refazer uma missão já concluída?",
        a: "Sim! Você pode revisar qualquer missão concluída clicando nela na timeline da trilha. A tela de revisão mostra seu desafio, resposta, feedback do tutor e nota. Use os botões 'Copiar' para salvar o conteúdo.",
      },
      {
        q: "O que acontece se eu errar uma missão?",
        a: "Não se preocupe! O Tutor IA vai te dar feedback construtivo e dicas para melhorar. Você pode tentar novamente quantas vezes quiser. O importante é aprender, não acertar de primeira!",
      },
      {
        q: "Quanto tempo leva para completar uma trilha?",
        a: "Cada trilha tem 4-5 missões que levam em média 15-30 minutos cada. Você pode completar no seu ritmo — não há prazo! A maioria dos alunos termina uma trilha em 1-2 semanas estudando um pouco por dia.",
      },
    ],
  },
  {
    id: "tutor",
    title: "Tutor IA",
    icon: Bot,
    color: "#10B981",
    questions: [
      {
        q: "O Tutor IA é uma pessoa real?",
        a: "Não, o Tutor IA é um assistente de inteligência artificial treinado especialmente para educação. Ele foi projetado para ser amigável, paciente e adaptar as explicações ao seu nível de conhecimento.",
      },
      {
        q: "Posso conversar com o Tutor fora das missões?",
        a: "Sim! O Tutor IA está disponível a qualquer momento pelo chat. Você pode tirar dúvidas sobre IA, pedir explicações extras ou até explorar temas que vão além das trilhas.",
      },
      {
        q: "As respostas do Tutor são sempre corretas?",
        a: "O Tutor IA é muito preciso, mas como toda IA, pode cometer erros ocasionais. Sempre que tiver dúvida, confira com outras fontes. Parte do aprendizado é desenvolver pensamento crítico sobre as respostas da IA!",
      },
    ],
  },
  {
    id: "conquistas",
    title: "XP e Conquistas",
    icon: Award,
    color: "#FFD700",
    questions: [
      {
        q: "Como ganho XP?",
        a: "Você ganha XP completando missões (50-100 XP cada), coletando recompensas diárias (10-100 XP), mantendo sequências de estudo e alcançando marcos especiais. Quanto mais você pratica, mais XP acumula!",
      },
      {
        q: "Para que servem as insígnias?",
        a: "As insígnias são conquistas que reconhecem seu progresso. Cada trilha concluída desbloqueia uma insígnia exclusiva. Elas aparecem no seu perfil e portfólio, e você pode compartilhá-las nas redes sociais!",
      },
      {
        q: "Como funciona o ranking?",
        a: "O ranking compara seu XP com outros alunos. Você pode ver a classificação semanal, mensal ou geral. Colete recompensas diárias e mantenha sua sequência de estudos para subir no ranking!",
      },
    ],
  },
  {
    id: "conta",
    title: "Conta e Privacidade",
    icon: Shield,
    color: "#3B82F6",
    questions: [
      {
        q: "Como altero minha senha?",
        a: "Vá em Perfil → Meus Dados → Alterar Senha. Você precisará informar a senha atual e criar uma nova. A senha deve ter pelo menos 8 caracteres, incluindo letras e números.",
      },
      {
        q: "Meus dados estão seguros?",
        a: "Sim! Seguimos a LGPD (Lei Geral de Proteção de Dados) e o ECA (Estatuto da Criança e do Adolescente). Seus dados são criptografados e nunca compartilhados com terceiros sem consentimento.",
      },
      {
        q: "Como excluir minha conta?",
        a: "Vá em Configurações → Conta → Excluir conta. Atenção: esta ação é permanente e remove todos os seus dados, progresso e conquistas. Recomendamos exportar seu portfólio antes.",
      },
    ],
  },
  {
    id: "tecnico",
    title: "Problemas Técnicos",
    icon: Smartphone,
    color: "#EF4444",
    questions: [
      {
        q: "O app está travando, o que faço?",
        a: "Tente fechar e reabrir o app. Se o problema persistir, limpe o cache do app nas configurações do celular. Caso continue, desinstale e reinstale. Se nada funcionar, entre em contato pelo formulário abaixo.",
      },
      {
        q: "Perdi meu progresso, como recuperar?",
        a: "Seu progresso é salvo automaticamente na nuvem. Faça login com a mesma conta (e-mail ou rede social) e seus dados serão restaurados. Se o problema persistir, entre em contato com nosso suporte.",
      },
      {
        q: "O app funciona offline?",
        a: "Algumas funcionalidades básicas funcionam offline, mas as missões e o chat com o Tutor IA precisam de conexão com a internet. Recomendamos uma conexão estável para a melhor experiência.",
      },
    ],
  },
];

/* ─── FAQ Item Component ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-white/[0.04] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="mt-0.5 flex-shrink-0">
          <HelpCircle size={14} className="text-white/30" />
        </div>
        <p
          className="flex-1 text-white/80 text-[13px] leading-relaxed font-medium"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {question}
        </p>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown size={14} className="text-white/25" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-11">
              <p
                className="text-white/50 text-[12px] leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Category Card ─── */
function CategoryCard({
  category,
  index,
}: {
  category: (typeof FAQ_CATEGORIES)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      className="mx-4 mb-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-t-2xl transition-all"
        style={{
          background: expanded
            ? `linear-gradient(135deg, ${category.color}15, ${category.color}08)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${expanded ? `${category.color}25` : "rgba(255,255,255,0.06)"}`,
          borderBottom: expanded ? "none" : `1px solid rgba(255,255,255,0.06)`,
          borderRadius: expanded ? "16px 16px 0 0" : "16px",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${category.color}18` }}
        >
          <Icon size={17} style={{ color: category.color }} />
        </div>
        <div className="flex-1 text-left">
          <p
            className="text-white text-sm font-bold"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {category.title}
          </p>
          <p
            className="text-white/30 text-[10px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {category.questions.length} perguntas
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-white/25" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden rounded-b-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderLeft: `1px solid ${category.color}25`,
              borderRight: `1px solid ${category.color}25`,
              borderBottom: `1px solid ${category.color}25`,
            }}
          >
            {category.questions.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [categoria, setCategoria] = useState("");
  const [enviado, setEnviado] = useState(false);

  const categorias = [
    { id: "", label: "Selecione uma categoria..." },
    { id: "bug", label: "Reportar um problema" },
    { id: "duvida", label: "Dúvida sobre o app" },
    { id: "sugestao", label: "Sugestão de melhoria" },
    { id: "conta", label: "Problema com a conta" },
    { id: "outro", label: "Outro assunto" },
  ];

  const handleSubmit = () => {
    if (!assunto.trim() || !mensagem.trim() || !categoria) {
      toast.error("Preencha todos os campos para enviar");
      return;
    }
    setEnviado(true);
    toast.success("Mensagem enviada com sucesso!");
  };

  if (enviado) {
    return (
      <motion.div
        className="mx-4 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.03))",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#10B981]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-[#10B981]" />
            </div>
          </motion.div>
          <h3
            className="text-white text-base font-bold mb-2"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Mensagem enviada!
          </h3>
          <p
            className="text-white/50 text-xs leading-relaxed mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Recebemos sua mensagem e responderemos em até 48 horas úteis pelo e-mail cadastrado na sua conta.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/30 text-[10px]">
            <Clock size={10} />
            <span style={{ fontFamily: "Inter, sans-serif" }}>
              Tempo médio de resposta: 24h
            </span>
          </div>
          <button
            onClick={() => {
              setEnviado(false);
              setAssunto("");
              setMensagem("");
              setCategoria("");
            }}
            className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold text-white/60 bg-white/5 hover:bg-white/10 transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Enviar outra mensagem
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-4 mb-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      {/* Section title */}
      <div className="flex items-center gap-2.5 mb-3 px-1">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(249,115,22,0.1)" }}
        >
          <MessageSquare size={14} className="text-[#F97316]" />
        </div>
        <h2
          className="text-white font-bold text-sm uppercase tracking-wider"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Fale Conosco
        </h2>
      </div>

      <div
        className="rounded-2xl p-4 space-y-3.5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Categoria select */}
        <div>
          <label
            className="text-white/40 text-[11px] font-medium mb-1.5 block"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Categoria
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white/80 outline-none transition-all"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id} style={{ background: "#2a2a3e", color: "#fff" }}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Assunto */}
        <div>
          <label
            className="text-white/40 text-[11px] font-medium mb-1.5 block"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Assunto
          </label>
          <input
            type="text"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Descreva brevemente o assunto..."
            className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white/80 placeholder:text-white/20 outline-none transition-all focus:ring-1 focus:ring-[#F97316]/30"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Mensagem */}
        <div>
          <label
            className="text-white/40 text-[11px] font-medium mb-1.5 block"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Mensagem
          </label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Conte-nos mais detalhes sobre sua dúvida ou problema..."
            rows={4}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white/80 placeholder:text-white/20 outline-none resize-none transition-all focus:ring-1 focus:ring-[#F97316]/30"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <p
            className="text-white/20 text-[10px] mt-1 text-right"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {mensagem.length}/500
          </p>
        </div>

        {/* Submit button */}
        <motion.button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
          style={{
            fontFamily: "Nunito, sans-serif",
            background: "linear-gradient(135deg, #F97316, #F59E0B)",
            boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <Send size={15} />
          Enviar mensagem
        </motion.button>

        {/* Info */}
        <div className="flex items-start gap-2 pt-1">
          <Lightbulb size={12} className="text-[#F59E0B]/40 mt-0.5 flex-shrink-0" />
          <p
            className="text-white/25 text-[10px] leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Responderemos pelo e-mail cadastrado na sua conta em até 48h úteis. Para problemas urgentes, use nossos canais diretos abaixo.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function AjudaSuporte() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter FAQ based on search
  const filteredCategories = searchQuery.trim()
    ? FAQ_CATEGORIES.map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.questions.length > 0)
    : FAQ_CATEGORIES;

  const totalResults = filteredCategories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="sticky top-0 z-20 bg-[#1C1C2E]/95 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 px-5 pt-14 pb-3">
            <button
              onClick={() => setLocation("/configuracoes")}
              className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <ArrowLeft size={18} className="text-white/70" />
            </button>
            <div className="flex-1">
              <h1
                className="text-white text-lg font-black"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Ajuda e Suporte
              </h1>
              <p
                className="text-white/30 text-[10px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {FAQ_CATEGORIES.reduce((a, c) => a + c.questions.length, 0)} perguntas frequentes
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-5 pb-3">
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${searchFocused ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: searchFocused ? "0 0 15px rgba(124,58,237,0.1)" : "none",
              }}
            >
              <Search size={15} className="text-white/25 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Buscar nas perguntas frequentes..."
                className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/20 outline-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-white/30 text-xs hover:text-white/50 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Limpar
                </button>
              )}
            </div>
            {searchQuery && (
              <p
                className="text-white/25 text-[10px] mt-1.5 px-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {totalResults} resultado{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </motion.div>

        {/* Quick Help Banner */}
        <motion.div
          className="mx-4 mb-4 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))",
              border: "1px solid rgba(124,58,237,0.15)",
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-[#7C3AED]/15 flex items-center justify-center flex-shrink-0">
              <Bot size={22} className="text-[#7C3AED]" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-white text-[13px] font-bold"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Precisa de ajuda rápida?
              </p>
              <p
                className="text-white/40 text-[10px] leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                O Tutor IA pode responder suas dúvidas em tempo real pelo chat!
              </p>
            </div>
            <motion.button
              onClick={() => setLocation("/chat")}
              className="px-3 py-2 rounded-xl text-[11px] font-bold text-white flex-shrink-0"
              style={{
                fontFamily: "Nunito, sans-serif",
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Abrir chat
            </motion.button>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))
        ) : (
          <motion.div
            className="mx-4 py-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HelpCircle size={36} className="text-white/10 mx-auto mb-3" />
            <p
              className="text-white/30 text-sm font-bold mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Nenhum resultado encontrado
            </p>
            <p
              className="text-white/15 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Tente buscar com outros termos ou envie sua dúvida pelo formulário abaixo.
            </p>
          </motion.div>
        )}

        {/* Contact Form */}
        <ContactForm />

        {/* Direct Contact Channels */}
        <motion.div
          className="mx-4 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.1)" }}
            >
              <Phone size={14} className="text-[#3B82F6]" />
            </div>
            <h2
              className="text-white font-bold text-sm uppercase tracking-wider"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Canais Diretos
            </h2>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <button
              onClick={() => toast("Abrindo e-mail... (protótipo)")}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
                <Mail size={14} className="text-[#F97316]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  suporte@labia.edu.br
                </p>
                <p className="text-white/25 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Resposta em até 48h úteis
                </p>
              </div>
            </button>
            <button
              onClick={() => toast("Abrindo WhatsApp... (protótipo)")}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <MessageSquare size={14} className="text-[#10B981]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  WhatsApp
                </p>
                <p className="text-white/25 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Seg-Sex, 9h às 18h
                </p>
              </div>
            </button>
            <button
              onClick={() => toast("Abrindo comunidade... (protótipo)")}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                <Users size={14} className="text-[#7C3AED]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  Comunidade LabIA
                </p>
                <p className="text-white/25 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tire dúvidas com outros alunos
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
