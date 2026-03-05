/**
 * TermosDeUso — Termos de Uso do LabIA
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, FileText, ChevronDown, Shield, Users,
  BookOpen, AlertTriangle, Scale, Clock, Mail, Heart, Sparkles,
  CheckCircle2, XCircle, MessageSquare,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";

function LegalSection({ icon: Icon, title, color, number, children, defaultOpen = false }: {
  icon: any; title: string; color: string; number: number; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const t = useLabiaTheme();
  return (
    <motion.div className="mx-5 mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * number }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all"
        style={{ background: open ? `${color}10` : t.cardBg, border: `1px solid ${open ? `${color}25` : t.cardBorder}` }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
          <Icon size={15} style={{ color }} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Seção {number}</p>
          <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>{title}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} style={{ color: t.textMuted }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-4 pt-3 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  const t = useLabiaTheme();
  return <p className="text-[13px] leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{children}</p>;
}

function Li({ children, type = "check" }: { children: React.ReactNode; type?: "check" | "x" | "dot" }) {
  const t = useLabiaTheme();
  const icons = {
    check: <CheckCircle2 size={12} className="text-[#10B981] mt-0.5 flex-shrink-0" />,
    x: <XCircle size={12} className="text-[#EF4444] mt-0.5 flex-shrink-0" />,
    dot: <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: t.textMuted }} />,
  };
  return (
    <div className="flex items-start gap-2 mb-2">
      {icons[type]}
      <p className="text-[13px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{children}</p>
    </div>
  );
}

export default function TermosDeUso() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const strong = { color: t.textPrimary };

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <motion.div className="sticky top-0 z-20 backdrop-blur-lg" style={{ background: t.headerBg }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 px-5 pt-14 pb-4">
            <button onClick={() => setLocation("/configuracoes")} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: t.cardBg }}>
              <ArrowLeft size={18} style={{ color: t.textSecondary }} />
            </button>
            <div>
              <h1 className="text-lg font-black" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Termos de Uso</h1>
              <p className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Última atualização: 01 de março de 2026</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mx-5 mt-3 mb-5 p-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(249,115,22,0.08))", border: "1px solid rgba(124,58,237,0.15)" }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 flex items-center justify-center"><FileText size={18} className="text-[#7C3AED]" /></div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Bem-vindo ao LabIA!</p>
              <p className="text-[11px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Leia com atenção antes de usar o app</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
            Estes Termos de Uso regulam o acesso e a utilização da plataforma LabIA, um aplicativo educacional
            de inteligência artificial voltado para crianças e adolescentes de 8 a 16 anos. Ao criar uma conta,
            você concorda com estes termos.
          </p>
        </motion.div>

        <LegalSection icon={BookOpen} title="Sobre o LabIA" color="#7C3AED" number={1} defaultOpen>
          <P>O LabIA é uma plataforma educacional gamificada que ensina conceitos de Inteligência Artificial para crianças e adolescentes por meio de trilhas de aprendizado, missões interativas e um tutor virtual baseado em IA.</P>
          <P>A plataforma é operada pela <strong style={strong}>LabIA Educação Ltda.</strong>, inscrita no CNPJ sob o n.o XX.XXX.XXX/0001-XX, com sede na cidade de São Paulo, Estado de São Paulo.</P>
          <P>O objetivo do LabIA é democratizar o acesso ao conhecimento sobre IA, promovendo o pensamento crítico, a criatividade e a resolução de problemas de forma lúdica e segura.</P>
        </LegalSection>

        <LegalSection icon={Users} title="Cadastro e Idade Mínima" color="#F97316" number={2}>
          <P>Para utilizar o LabIA, é necessário criar uma conta informando nome, e-mail e faixa etária. O aplicativo é destinado a usuários de <strong style={strong}>8 a 16 anos</strong>.</P>
          <Li type="check">Menores de 12 anos precisam do consentimento de um responsável legal para criar conta</Li>
          <Li type="check">O responsável pode acompanhar o progresso do menor pelo painel parental</Li>
          <Li type="check">O e-mail do responsável será solicitado durante o cadastro para menores de 12 anos</Li>
          <Li type="x">Não é permitido criar contas com informações falsas ou de terceiros</Li>
          <Li type="x">Não é permitido compartilhar credenciais de acesso com outras pessoas</Li>
          <P>O LabIA se reserva o direito de suspender contas que violem estas regras, após notificação prévia.</P>
        </LegalSection>

        <LegalSection icon={Shield} title="Uso Adequado da Plataforma" color="#10B981" number={3}>
          <P>O LabIA deve ser utilizado exclusivamente para fins educacionais. O usuário se compromete a:</P>
          <Li type="check">Utilizar a plataforma de forma respeitosa e construtiva</Li>
          <Li type="check">Interagir com o Tutor IA de maneira adequada à faixa etária</Li>
          <Li type="check">Respeitar os direitos de propriedade intelectual do conteúdo</Li>
          <Li type="x">Não utilizar linguagem ofensiva, discriminatória ou inadequada</Li>
          <Li type="x">Não tentar manipular o sistema de pontuação ou ranking</Li>
          <Li type="x">Não copiar, distribuir ou comercializar o conteúdo das missões</Li>
          <P>O Tutor IA possui filtros de conteúdo para garantir interações seguras e adequadas à idade do usuário.</P>
        </LegalSection>

        <LegalSection icon={Sparkles} title="Conteúdo e Propriedade Intelectual" color="#3B82F6" number={4}>
          <P>Todo o conteúdo disponibilizado na plataforma é de propriedade exclusiva do LabIA ou de seus licenciadores.</P>
          <P>O conteúdo criado pelo usuário durante as missões permanece de propriedade do usuário, porém o LabIA poderá utilizá-lo de forma anonimizada para melhorar a plataforma.</P>
          <Li type="check">Você pode exportar e compartilhar suas conquistas e certificados</Li>
          <Li type="check">Seu portfólio digital é seu e pode ser baixado a qualquer momento</Li>
          <Li type="x">Não é permitido reproduzir o conteúdo das trilhas fora da plataforma</Li>
        </LegalSection>

        <LegalSection icon={Scale} title="Responsabilidades e Limitações" color="#EC4899" number={5}>
          <P>O LabIA se compromete a oferecer uma experiência educacional de qualidade, mas não garante que a plataforma estará disponível ininterruptamente ou livre de erros.</P>
          <P>As respostas do Tutor IA são geradas por inteligência artificial e têm caráter educacional. Elas <strong style={strong}>não substituem</strong> orientação profissional de professores, pedagogos ou psicólogos.</P>
          <Li type="dot">O LabIA não se responsabiliza por decisões tomadas com base nas respostas do Tutor IA</Li>
          <Li type="dot">Manutenções programadas serão comunicadas com antecedência de 24 horas</Li>
          <Li type="dot">Em caso de falha técnica, o progresso do usuário será preservado quando possível</Li>
        </LegalSection>

        <LegalSection icon={AlertTriangle} title="Suspensão e Cancelamento" color="#EF4444" number={6}>
          <P>O LabIA pode suspender ou cancelar a conta do usuário nas seguintes situações:</P>
          <Li type="x">Violação dos Termos de Uso ou da Política de Privacidade</Li>
          <Li type="x">Uso inadequado do Tutor IA ou tentativa de manipulação do sistema</Li>
          <Li type="x">Comportamento que coloque em risco outros usuários da plataforma</Li>
          <P>O usuário pode solicitar o cancelamento da conta a qualquer momento através das Configurações do app ou por e-mail. Após o cancelamento, os dados serão permanentemente excluídos, conforme a Política de Privacidade.</P>
        </LegalSection>

        <LegalSection icon={Clock} title="Alterações nos Termos" color="#F59E0B" number={7}>
          <P>O LabIA pode atualizar estes Termos de Uso periodicamente. Quando houver alterações significativas, os usuários serão notificados com pelo menos <strong style={strong}>15 dias de antecedência</strong>.</P>
          <P>O uso continuado da plataforma após a notificação constitui aceitação dos novos termos. Caso não concorde com as alterações, o usuário poderá cancelar sua conta sem penalidades.</P>
        </LegalSection>

        <LegalSection icon={Mail} title="Contato e Dúvidas" color="#7C3AED" number={8}>
          <P>Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso, entre em contato:</P>
          <div className="space-y-2 mb-3">
            {[
              { icon: Mail, color: "#7C3AED", label: "contato@labia.app" },
              { icon: MessageSquare, color: "#F97316", label: "Central de Ajuda no app (Configurações → Ajuda)" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <item.icon size={13} style={{ color: item.color }} className="flex-shrink-0" />
                <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{item.label}</p>
              </div>
            ))}
          </div>
          <P>Tempo médio de resposta: até 5 dias úteis. Para questões urgentes envolvendo menores de idade, o prazo é de 48 horas.</P>
        </LegalSection>

        <motion.div className="mx-5 mt-2 mb-8 p-4 rounded-2xl text-center" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Heart size={16} className="mx-auto mb-2" style={{ color: "rgba(236,72,153,0.4)" }} />
          <p className="text-[11px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
            O LabIA foi criado com carinho para inspirar a próxima geração de criadores e pensadores digitais.
          </p>
          <p className="text-[10px] mt-2" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>LabIA Educação Ltda. • CNPJ: XX.XXX.XXX/0001-XX</p>
          <p className="text-[10px] mt-1" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Versão dos Termos: 1.0 — Vigência: 01/03/2026</p>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
