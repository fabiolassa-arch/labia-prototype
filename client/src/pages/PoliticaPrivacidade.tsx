/**
 * PoliticaPrivacidade — Política de Privacidade do LabIA
 * Design: Documento legal com visual amigável, seções expansíveis
 * Paleta: #1C1C2E (bg), #7C3AED (roxo), #F97316 (laranja), #10B981 (verde)
 * Fonte: Nunito (headings) + Inter (body)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Shield, ChevronDown, Eye, Lock, Database, UserCheck,
  Globe, Trash2, Baby, Server, AlertTriangle, Mail, Heart,
  CheckCircle2, XCircle, MessageSquare, Cookie, Share2, Bell,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

/* ─── Section Component ─── */
function LegalSection({
  icon: Icon,
  title,
  color,
  number,
  children,
  defaultOpen = false,
}: {
  icon: any;
  title: string;
  color: string;
  number: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="mx-5 mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * number }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all"
        style={{
          background: open ? `${color}10` : "rgba(255,255,255,0.03)",
          border: `1px solid ${open ? `${color}25` : "rgba(255,255,255,0.06)"}`,
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon size={15} style={{ color }} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
            Seção {number}
          </p>
          <p className="text-white font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>
            {title}
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-3 pb-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Paragraph ─── */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/55 text-[13px] leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </p>
  );
}

/* ─── List Item ─── */
function Li({ children, type = "check" }: { children: React.ReactNode; type?: "check" | "x" | "dot" }) {
  const icons = {
    check: <CheckCircle2 size={12} className="text-[#10B981] mt-0.5 flex-shrink-0" />,
    x: <XCircle size={12} className="text-[#EF4444] mt-0.5 flex-shrink-0" />,
    dot: <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />,
  };
  return (
    <div className="flex items-start gap-2 mb-2">
      {icons[type]}
      <p className="text-white/55 text-[13px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
        {children}
      </p>
    </div>
  );
}

/* ─── Data Table Row ─── */
function DataRow({ label, purpose, retention }: { label: string; purpose: string; retention: string }) {
  return (
    <div className="flex flex-col gap-1 px-3 py-3 border-b border-white/[0.04] last:border-0">
      <p className="text-white/70 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
        {label}
      </p>
      <div className="flex items-start gap-1">
        <span className="text-white/30 text-[10px] flex-shrink-0 w-16">Finalidade:</span>
        <p className="text-white/45 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>{purpose}</p>
      </div>
      <div className="flex items-start gap-1">
        <span className="text-white/30 text-[10px] flex-shrink-0 w-16">Retenção:</span>
        <p className="text-white/45 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>{retention}</p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function PoliticaPrivacidade() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="sticky top-0 z-20 bg-[#1C1C2E]/95 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 px-5 pt-14 pb-4">
            <button
              onClick={() => setLocation("/configuracoes")}
              className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <ArrowLeft size={18} className="text-white/70" />
            </button>
            <div>
              <h1
                className="text-white text-lg font-black"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Política de Privacidade
              </h1>
              <p className="text-white/30 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
                Última atualização: 01 de março de 2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* Intro card */}
        <motion.div
          className="mx-5 mt-3 mb-5 p-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.08))",
            border: "1px solid rgba(16,185,129,0.15)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 flex items-center justify-center">
              <Shield size={18} className="text-[#10B981]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>
                Sua privacidade importa!
              </p>
              <p className="text-white/40 text-[11px]" style={{ fontFamily: "Inter, sans-serif" }}>
                Protegemos seus dados com cuidado especial
              </p>
            </div>
          </div>
          <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Esta Política de Privacidade descreve como o LabIA coleta, utiliza, armazena e protege os dados
            pessoais dos usuários, com atenção especial à proteção de crianças e adolescentes, em conformidade
            com a <strong className="text-white/70">LGPD (Lei 13.709/2018)</strong> e o <strong className="text-white/70">ECA (Lei 8.069/1990)</strong>.
          </p>
        </motion.div>

        {/* LGPD Badge */}
        <motion.div
          className="mx-5 mb-5 flex items-center gap-3 p-3 rounded-xl"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.12)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
            <Lock size={20} className="text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-white/70 text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
              Em conformidade com a LGPD
            </p>
            <p className="text-white/35 text-[10px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Lei Geral de Proteção de Dados Pessoais — Lei n.o 13.709/2018
            </p>
          </div>
        </motion.div>

        {/* Sections */}
        <LegalSection icon={Database} title="Dados que Coletamos" color="#7C3AED" number={1} defaultOpen>
          <P>
            O LabIA coleta apenas os dados estritamente necessários para o funcionamento da plataforma
            e a personalização da experiência educacional. Veja abaixo os dados coletados e suas finalidades:
          </P>
          <div className="rounded-xl overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <DataRow
              label="Nome e apelido"
              purpose="Identificação e personalização da experiência"
              retention="Enquanto a conta estiver ativa"
            />
            <DataRow
              label="E-mail"
              purpose="Login, recuperação de senha e comunicações"
              retention="Enquanto a conta estiver ativa + 30 dias"
            />
            <DataRow
              label="Faixa etária"
              purpose="Adequação do conteúdo e conformidade legal"
              retention="Enquanto a conta estiver ativa"
            />
            <DataRow
              label="Progresso nas trilhas"
              purpose="Gamificação, ranking e personalização"
              retention="Enquanto a conta estiver ativa"
            />
            <DataRow
              label="Interações com o Tutor IA"
              purpose="Melhoria do modelo e personalização"
              retention="90 dias (anonimizado após)"
            />
            <DataRow
              label="Dados de uso (analytics)"
              purpose="Melhorias na plataforma e correção de bugs"
              retention="12 meses (agregado e anonimizado)"
            />
          </div>
          <Li type="x">Não coletamos dados de localização precisa (GPS)</Li>
          <Li type="x">Não coletamos dados biométricos (impressão digital, reconhecimento facial)</Li>
          <Li type="x">Não coletamos dados financeiros ou de pagamento diretamente</Li>
        </LegalSection>

        <LegalSection icon={Baby} title="Proteção de Menores" color="#EC4899" number={2}>
          <P>
            O LabIA tem um compromisso especial com a proteção de crianças e adolescentes, em conformidade
            com o <strong className="text-white/70">Estatuto da Criança e do Adolescente (ECA)</strong> e
            a <strong className="text-white/70">LGPD</strong>.
          </P>
          <Li type="check">Menores de 12 anos: consentimento específico do responsável legal é obrigatório</Li>
          <Li type="check">Adolescentes (12-16 anos): consentimento assistido pelo responsável</Li>
          <Li type="check">O Tutor IA possui filtros de conteúdo adequados à faixa etária</Li>
          <Li type="check">Não exibimos publicidade direcionada a menores de idade</Li>
          <Li type="check">Não compartilhamos dados de menores com terceiros para fins comerciais</Li>
          <P>
            O responsável legal pode, a qualquer momento, acessar os dados do menor, solicitar correção
            ou exclusão, e revogar o consentimento dado. Para isso, basta entrar em contato pelo e-mail
            <strong className="text-white/70"> privacidade@labia.app</strong>.
          </P>
        </LegalSection>

        <LegalSection icon={Eye} title="Como Usamos seus Dados" color="#F97316" number={3}>
          <P>
            Os dados coletados são utilizados exclusivamente para as seguintes finalidades:
          </P>
          <Li type="check">Fornecer e personalizar a experiência educacional nas trilhas</Li>
          <Li type="check">Calcular progresso, XP, ranking e insígnias</Li>
          <Li type="check">Melhorar as respostas e a qualidade do Tutor IA</Li>
          <Li type="check">Enviar notificações sobre missões, conquistas e lembretes</Li>
          <Li type="check">Gerar relatórios de progresso para o aluno e responsáveis</Li>
          <Li type="check">Corrigir bugs e melhorar a performance da plataforma</Li>
          <P>
            <strong className="text-white/70">Base legal:</strong> O tratamento de dados é realizado com
            base no consentimento do titular (ou responsável, no caso de menores), na execução do contrato
            de uso da plataforma e no legítimo interesse para melhorias do serviço.
          </P>
        </LegalSection>

        <LegalSection icon={Share2} title="Compartilhamento de Dados" color="#3B82F6" number={4}>
          <P>
            O LabIA <strong className="text-white/70">não vende</strong> dados pessoais dos usuários.
            O compartilhamento ocorre apenas nas seguintes situações:
          </P>
          <Li type="dot">
            <strong className="text-white/70">Provedores de infraestrutura:</strong> servidores em nuvem
            (AWS/Google Cloud) para hospedagem segura dos dados
          </Li>
          <Li type="dot">
            <strong className="text-white/70">Serviço de IA:</strong> interações com o Tutor IA são
            processadas de forma anonimizada por provedores de IA
          </Li>
          <Li type="dot">
            <strong className="text-white/70">Analytics:</strong> dados agregados e anonimizados para
            análise de uso da plataforma
          </Li>
          <Li type="dot">
            <strong className="text-white/70">Obrigação legal:</strong> quando exigido por lei, ordem
            judicial ou autoridade competente
          </Li>
          <P>
            Todos os parceiros e fornecedores assinam acordos de processamento de dados (DPA) e estão
            em conformidade com a LGPD.
          </P>
        </LegalSection>

        <LegalSection icon={Server} title="Armazenamento e Segurança" color="#10B981" number={5}>
          <P>
            Os dados são armazenados em servidores seguros localizados no <strong className="text-white/70">Brasil</strong>,
            com as seguintes medidas de proteção:
          </P>
          <Li type="check">Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)</Li>
          <Li type="check">Autenticação multifator para acesso administrativo</Li>
          <Li type="check">Backups diários com retenção de 30 dias</Li>
          <Li type="check">Monitoramento 24/7 contra acessos não autorizados</Li>
          <Li type="check">Testes de segurança (pentest) realizados semestralmente</Li>
          <Li type="check">Logs de acesso auditáveis por 12 meses</Li>
          <P>
            Em caso de incidente de segurança que possa afetar dados pessoais, o LabIA notificará
            os usuários afetados e a ANPD (Autoridade Nacional de Proteção de Dados) em até
            <strong className="text-white/70"> 72 horas</strong>, conforme exigido pela LGPD.
          </P>
        </LegalSection>

        <LegalSection icon={Cookie} title="Cookies e Tecnologias" color="#F59E0B" number={6}>
          <P>
            O LabIA utiliza cookies e tecnologias similares para melhorar a experiência do usuário:
          </P>
          <Li type="check">
            <strong className="text-white/70">Cookies essenciais:</strong> necessários para login e
            funcionamento básico da plataforma
          </Li>
          <Li type="check">
            <strong className="text-white/70">Cookies de preferências:</strong> salvam configurações
            como tema, idioma e tamanho da fonte
          </Li>
          <Li type="check">
            <strong className="text-white/70">Cookies analíticos:</strong> dados anonimizados sobre
            uso da plataforma para melhorias
          </Li>
          <Li type="x">
            <strong className="text-white/70">Cookies de publicidade:</strong> NÃO utilizamos cookies
            para rastreamento publicitário
          </Li>
          <P>
            Você pode gerenciar suas preferências de cookies nas Configurações do app. Desativar cookies
            essenciais pode afetar o funcionamento da plataforma.
          </P>
        </LegalSection>

        <LegalSection icon={UserCheck} title="Seus Direitos (LGPD)" color="#7C3AED" number={7}>
          <P>
            Em conformidade com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
          </P>
          <Li type="check"><strong className="text-white/70">Acesso:</strong> solicitar cópia de todos os dados que temos sobre você</Li>
          <Li type="check"><strong className="text-white/70">Correção:</strong> atualizar dados incompletos ou incorretos</Li>
          <Li type="check"><strong className="text-white/70">Exclusão:</strong> solicitar a remoção dos seus dados pessoais</Li>
          <Li type="check"><strong className="text-white/70">Portabilidade:</strong> receber seus dados em formato estruturado</Li>
          <Li type="check"><strong className="text-white/70">Revogação:</strong> retirar o consentimento a qualquer momento</Li>
          <Li type="check"><strong className="text-white/70">Oposição:</strong> se opor ao tratamento em determinadas situações</Li>
          <Li type="check"><strong className="text-white/70">Informação:</strong> saber com quem seus dados foram compartilhados</Li>
          <P>
            Para exercer qualquer desses direitos, entre em contato pelo e-mail
            <strong className="text-white/70"> privacidade@labia.app</strong> ou pela Central de Ajuda
            no app. O prazo de resposta é de até <strong className="text-white/70">15 dias úteis</strong>.
          </P>
        </LegalSection>

        <LegalSection icon={Trash2} title="Exclusão e Retenção de Dados" color="#EF4444" number={8}>
          <P>
            Ao solicitar a exclusão da conta, os seguintes prazos se aplicam:
          </P>
          <Li type="dot">
            <strong className="text-white/70">Dados pessoais:</strong> excluídos em até 30 dias após
            a solicitação
          </Li>
          <Li type="dot">
            <strong className="text-white/70">Interações com o Tutor IA:</strong> anonimizadas
            imediatamente, excluídas em 90 dias
          </Li>
          <Li type="dot">
            <strong className="text-white/70">Dados de analytics:</strong> mantidos de forma agregada
            e anonimizada por 12 meses
          </Li>
          <Li type="dot">
            <strong className="text-white/70">Backups:</strong> dados removidos dos backups em até 60 dias
          </Li>
          <P>
            Alguns dados podem ser retidos por período superior quando exigido por obrigação legal
            ou regulatória.
          </P>
        </LegalSection>

        <LegalSection icon={Bell} title="Alterações nesta Política" color="#3B82F6" number={9}>
          <P>
            Esta Política de Privacidade pode ser atualizada periodicamente. Alterações significativas
            serão comunicadas com pelo menos <strong className="text-white/70">15 dias de antecedência</strong> por
            meio de notificação no app e/ou e-mail.
          </P>
          <P>
            Recomendamos que você revise esta política periodicamente. A data da última atualização
            está sempre indicada no topo desta página.
          </P>
        </LegalSection>

        <LegalSection icon={Mail} title="Encarregado de Dados (DPO)" color="#10B981" number={10}>
          <P>
            O LabIA possui um Encarregado de Proteção de Dados (DPO) responsável por garantir a
            conformidade com a LGPD:
          </P>
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <UserCheck size={13} className="text-[#10B981] flex-shrink-0" />
              <div>
                <p className="text-white/60 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Encarregado de Dados
                </p>
                <p className="text-white/35 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Nome do DPO (a definir)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Mail size={13} className="text-[#7C3AED] flex-shrink-0" />
              <p className="text-white/60 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                dpo@labia.app
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <MessageSquare size={13} className="text-[#F97316] flex-shrink-0" />
              <p className="text-white/60 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                ANPD: www.gov.br/anpd
              </p>
            </div>
          </div>
          <P>
            Caso não esteja satisfeito com a resposta do LabIA, você pode apresentar reclamação à
            Autoridade Nacional de Proteção de Dados (ANPD).
          </P>
        </LegalSection>

        {/* Footer */}
        <motion.div
          className="mx-5 mt-2 mb-8 p-4 rounded-2xl text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Heart size={16} className="text-[#10B981]/40 mx-auto mb-2" />
          <p className="text-white/30 text-[11px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            O LabIA se compromete a proteger seus dados com o mesmo cuidado que dedicamos à educação
            das crianças e adolescentes que usam nossa plataforma.
          </p>
          <p className="text-white/20 text-[10px] mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
            LabIA Educação Ltda. • CNPJ: XX.XXX.XXX/0001-XX
          </p>
          <p className="text-white/15 text-[10px] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Versão da Política: 1.0 — Vigência: 01/03/2026
          </p>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
