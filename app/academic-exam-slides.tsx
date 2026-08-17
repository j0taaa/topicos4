import { Check, Clock3, Cloud, RefreshCcw, Scale, ShieldCheck, Split, Timer, UserRound } from "lucide-react";
import type { SlideDefinition } from "./deck";
import { AcademicSlide, SourceNote } from "./academic-slide-shell";
import styles from "./academic-slides.module.css";

type ExamQuestion = {
  id: string;
  title: string;
  prompt: string;
  statements?: string[];
  alternatives: string[];
  answer: string;
  answerLabel: string;
  reasoning: string[];
  connection: string;
  note?: string;
};

const examQuestions: ExamQuestion[] = [
  {
    id: "09",
    title: "Escalonamento em sistemas operacionais",
    prompt: "Qual associação entre algoritmo de escalonamento e tipo de ambiente está correta?",
    alternatives: [
      "FILO: propício para sistemas de tempo real.",
      "Rate Monotonic: propício para sistemas em lote.",
      "Tarefa mais curta primeiro: propício para sistemas interativos.",
      "Round-robin: propício para sistemas de tempo real.",
      "Escalonamento por prioridades: propício para sistemas interativos.",
    ],
    answer: "E",
    answerLabel: "Prioridades em sistemas interativos",
    reasoning: [
      "FILO não oferece garantia de deadline e pode bloquear tarefas antigas.",
      "Rate Monotonic é associado a tarefas periódicas de tempo real, não a batch.",
      "Shortest Job First reduz espera média, mas não identifica necessariamente a tarefa que aguarda interação do usuário.",
      "Round-robin favorece responsividade geral, mas não fornece por si só garantias rígidas de tempo real.",
      "Prioridades permitem elevar tarefas interativas e reduzir a latência percebida pelo usuário.",
    ],
    connection: "Um hypervisor e um Node Kubernetes também dependem de políticas de escalonamento; capacidade nominal não elimina disputa por CPU.",
  },
  {
    id: "21",
    title: "Dispositivos e camadas de rede",
    prompt: "Qual descrição de dispositivo de rede está tecnicamente correta?",
    alternatives: [
      "Repetidores não reconhecem quadros ou pacotes, apenas o próprio cabeçalho.",
      "Hubs encaminham quadros a todas as portas e colocam transmissões simultâneas em buffer para arbitrá-las.",
      "Bridges isolam domínios de colisão e consultam a carga útil do quadro para descobrir o destinatário.",
      "Roteadores usam endereços de pacotes; em redes de broadcast, o roteamento é mais complicado e exige algoritmos próprios.",
      "Gateways de transporte podem interligar hosts que usam protocolos de transporte orientados a conexão diferentes.",
    ],
    answer: "E",
    answerLabel: "Gateway de transporte",
    reasoning: [
      "Repetidores operam na camada física e regeneram sinais; não interpretam sequer um cabeçalho próprio.",
      "Hubs também operam na camada física: transmissões simultâneas colidem, em vez de serem enfileiradas e arbitradas pelo hub.",
      "Bridges usam o endereço MAC no cabeçalho do quadro; não precisam examinar a carga útil para decidir a porta de saída.",
      "Em uma rede de broadcast, todos os nós compartilham o meio, o que simplifica, e não complica, o problema básico de encaminhamento.",
      "Um gateway de transporte pode traduzir entre protocolos de transporte distintos, preservando a comunicação entre as extremidades.",
    ],
    connection: "CNI, bridge, roteamento, Service e load balancer atuam em camadas diferentes; confundi-las leva a diagnósticos errados no caminho de uma requisição Kubernetes.",
  },
  {
    id: "25",
    title: "Modelos e características de cloud",
    prompt: "Quais afirmações estão corretas segundo os modelos de computação em nuvem?",
    statements: [
      "I. Em SaaS, o usuário não administra a infraestrutura subjacente e as atualizações do software cabem ao provedor.",
      "II. Elasticidade é aumentar ou diminuir automaticamente o tempo de disponibilidade dos recursos contratados.",
      "III. A nuvem comunitária necessariamente gerencia recursos pertencentes a cada organização participante.",
      "IV. Em IaaS, o usuário controla sistemas operacionais, armazenamento e aplicações, mas não a infraestrutura física da nuvem.",
    ],
    alternatives: ["I e II.", "I e IV.", "II e III.", "I, III e IV.", "II, III e IV."],
    answer: "B",
    answerLabel: "I e IV",
    reasoning: [
      "I descreve corretamente a divisão de responsabilidades do SaaS.",
      "II troca quantidade de recursos por tempo de disponibilidade; elasticidade ajusta capacidade à demanda.",
      "III é restritiva demais: a infraestrutura comunitária pode ser operada por uma ou mais organizações, por terceiro ou por combinação deles.",
      "IV corresponde ao contrato de IaaS: controle lógico do consumidor sobre a VM, sem administração do datacenter.",
    ],
    connection: "A apresentação aprofunda exatamente o que a definição de IaaS esconde: hypervisor, rede, storage e failure domains.",
    note: "A redação do item III é discutível; a resolução segue o gabarito oficial e a definição do NIST usada pelo exame.",
  },
  {
    id: "35",
    title: "Características de sistemas distribuídos",
    prompt: "Assinale a alternativa tecnicamente correta.",
    alternatives: [
      "A comunicação coordenada exige relógios físicos locais sincronizados com um relógio global.",
      "A falha de um peer interrompe todos os demais componentes até seu retorno.",
      "O compartilhamento de recursos exige hardware e software homogêneos.",
      "Adicionar dispositivos para atender demanda temporária ou crescente está ligado à escalabilidade.",
      "Acesso concorrente a um recurso compartilhado é consequência da transparência.",
    ],
    answer: "D",
    answerLabel: "Escalabilidade",
    reasoning: [
      "Sistemas distribuídos coordenam eventos sem depender de um relógio global perfeito.",
      "Falhas parciais são parte do modelo: alguns nós podem continuar enquanto outro falha.",
      "Middleware e protocolos existem justamente para esconder heterogeneidade.",
      "Escalabilidade descreve a capacidade de crescer em carga, dados ou geografia mediante adição de recursos.",
      "Concorrência requer controle e consistência; transparência apenas oculta detalhes de distribuição.",
    ],
    connection: "Autoscaling adiciona capacidade, mas alta disponibilidade só existe quando os novos recursos atravessam o failure domain correto.",
  },
];

function ExamQuestionSlide({ question }: { question: ExamQuestion }) {
  return (
    <AcademicSlide title={`ENADE 2021 · questão ${question.id}`} section="fechamento">
      <div className={styles.questionBody}>
        <section className={styles.questionPrompt}>
          <span className={styles.examBadge}>CIÊNCIA DA COMPUTAÇÃO</span>
          <h2>{question.prompt}</h2>
          {question.statements && (
            <div className={styles.statementList}>
              {question.statements.map((statement) => {
                const marker = statement.slice(0, statement.indexOf(".") + 1);
                const text = statement.slice(statement.indexOf(".") + 1).trim();
                return <p key={statement}><b>{marker}</b><span>{text}</span></p>;
              })}
            </div>
          )}
          <div className={styles.answerTimer}><Timer /><div><b>60 segundos para responder</b><span>Escolha uma alternativa e prepare uma justificativa.</span></div></div>
        </section>
        <div className={styles.alternativeList}>
          {question.alternatives.map((alternative, index) => (
            <div key={alternative}><b>{String.fromCharCode(65 + index)}</b><span>{alternative}</span></div>
          ))}
        </div>
        <SourceNote>Fonte: ENADE 2021, Bacharelado em Ciência da Computação. Enunciado condensado para projeção; resolução no próximo slide.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function ExamResolutionSlide({ question }: { question: ExamQuestion }) {
  return (
    <AcademicSlide title={`Resolução · ${question.title}`} section="fechamento">
      <div className={styles.resolutionBody}>
        <section className={styles.answerPanel}><span>Gabarito oficial</span><strong>{question.answer}</strong><div><Check /><b>{question.answerLabel}</b></div></section>
        <div className={styles.reasoningList}>
          {question.reasoning.map((reason, index) => <div key={reason}><span>{index + 1}</span><p>{reason}</p></div>)}
        </div>
        <div className={styles.cloudConnection}><Cloud /><div><b>Conexão com o seminário</b><p>{question.connection}</p></div></div>
        <SourceNote>{question.note ?? `Questão ${question.id}: resolução baseada no gabarito oficial do ENADE 2021.`}</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function DiscussionSlide() {
  return (
    <AcademicSlide title="Roda de discussão · qual contrato você defenderia?" section="fechamento">
      <div className={styles.discussionBody}>
        <section className={styles.scenarioCard}>
          <span>CENÁRIO</span><h2>Uma fintech brasileira precisa continuar operando após a perda completa de uma região.</h2>
          <ul>
            <li>95% das operações são leituras; 5% alteram saldo.</li>
            <li>Meta comercial: RTO de 60 segundos e “nenhuma transação perdida”.</li>
            <li>Escritas não podem ganhar mais de 80 ms de latência no caminho normal.</li>
            <li>O orçamento permite duas regiões, mas não capacidade plena duplicada.</li>
          </ul>
        </section>
        <div className={styles.positionGrid}>
          <div><ShieldCheck /><b>A · Active–passive síncrono</b><p>Prioriza RPO zero, aceitando latência remota e risco de indisponibilidade durante partições.</p></div>
          <div><RefreshCcw /><b>B · Active–passive assíncrono</b><p>Preserva latência local, mas exige admitir perda potencial e desenhar reconciliação.</p></div>
          <div><Split /><b>C · Active–active seletivo</b><p>Distribui leituras e algumas escritas, mas precisa definir quais invariantes podem ser relaxadas.</p></div>
        </div>
        <div className={styles.discussionRules}>
          <span><UserRound /> Formem três grupos e defendam uma opção.</span>
          <span><Clock3 /> Dois minutos para argumentos e um para réplica.</span>
          <span><Scale /> Toda defesa deve declarar RPO, RTO, latência e custo.</span>
        </div>
        <p className={styles.finalPrompt}>Não existe resposta gratuita: qual requisito vocês renegociariam, e por quê?</p>
      </div>
    </AcademicSlide>
  );
}

export const examSlides: SlideDefinition[] = examQuestions.flatMap((question) => [
  { title: `ENADE 2021 · questão ${question.id}`, duration: "0,75 min", maxStep: 0, section: "fechamento" as const, component: () => <ExamQuestionSlide question={question} /> },
  { title: `Resolução · questão ${question.id}`, duration: "1 min", maxStep: 0, section: "fechamento" as const, component: () => <ExamResolutionSlide question={question} /> },
]);
export const discussionSlide: SlideDefinition = { title: "Roda de discussão", duration: "4 min", maxStep: 0, section: "fechamento", component: DiscussionSlide };
