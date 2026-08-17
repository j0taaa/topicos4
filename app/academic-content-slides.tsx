import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Boxes,
  Clock3,
  Cloud,
  Container,
  FileClock,
  Gauge,
  GitBranch,
  Layers3,
  ListChecks,
  Lock,
  Network,
  Package,
  RadioTower,
  RefreshCcw,
  Route,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Zap,
} from "lucide-react";
import type { SlideDefinition } from "./deck";
import { AcademicSlide, SourceNote } from "./academic-slide-shell";
import styles from "./academic-slides.module.css";

const requirementCards: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Cloud, title: "Resumo da área", text: "Cloud computing combina infraestrutura programável, isolamento, elasticidade e serviços distribuídos para entregar capacidade sob demanda." },
  { icon: Layers3, title: "Fundamentos técnicos", text: "A narrativa conecta hardware, VMs, containers, Kubernetes, rede, replicação, consistência, consenso e recuperação." },
  { icon: Lock, title: "Tópico adicional", text: "MicroVMs mostram uma fronteira intermediária entre a densidade de containers e o isolamento de uma máquina virtual." },
  { icon: RadioTower, title: "Tecnologia atual", text: "A aposentadoria do Ingress-NGINX em 2026 motiva a migração para a Gateway API e novos contratos de rede no Kubernetes." },
  { icon: FileClock, title: "Evolução científica", text: "Três artigos, de 2011, 2020 e 2021, mostram a evolução de compartilhamento de cluster, isolamento leve e provisionamento serverless." },
  { icon: ListChecks, title: "Avaliação e debate", text: "Quatro questões do ENADE 2021 são respondidas pela turma e resolvidas passo a passo antes de uma roda de discussão." },
];

function SeminarOverviewSlide() {
  return (
    <AcademicSlide title="Visão geral do seminário" section="fundamentos">
      <div className={styles.overviewBody}>
        <div className={styles.requirementGrid}>
          {requirementCards.map(({ icon: Icon, title, text }, index) => (
            <section key={title} className={styles.requirementCard}>
              <span>{index + 1}</span><Icon /><div><b>{title}</b><p>{text}</p></div>
            </section>
          ))}
        </div>
        <div className={styles.timingBar}>
          <Clock3 /><b>Roteiro projetado: aproximadamente 100 minutos</b>
          <span>conteúdo técnico + quatro questões + discussão final</span>
        </div>
      </div>
    </AcademicSlide>
  );
}

function MicroVmBoundarySlide() {
  return (
    <AcademicSlide title="Tópico adicional · microVMs" section="virtualizacao">
      <div className={styles.additionalBody}>
        <section className={styles.boundaryCard}>
          <span>Container tradicional</span>
          <div><Container /><b>Processos compartilham o kernel</b></div>
          <p>Namespaces e cgroups oferecem inicialização rápida e alta densidade. A fronteira de segurança, porém, continua dependendo do kernel do host.</p>
        </section>
        <ArrowRight className={styles.bigArrow} />
        <section className={`${styles.boundaryCard} ${styles.highlightCard}`}>
          <span>MicroVM</span>
          <div><Lock /><b>Um kernel mínimo por workload</b></div>
          <p>O processo continua sendo empacotado como uma carga efêmera, mas é executado atrás de uma fronteira de virtualização com poucos dispositivos e pequena superfície de emulação.</p>
        </section>
        <div className={styles.additionalQuestions}>
          <span><ShieldCheck /><b>Ganho:</b> isolamento de hardware para executar código menos confiável.</span>
          <span><Gauge /><b>Custo:</b> mais memória, boot e complexidade que um container comum.</span>
          <span><Scale /><b>Decisão:</b> a fronteira certa depende do modelo de ameaça e da densidade necessária.</span>
        </div>
      </div>
    </AcademicSlide>
  );
}

function MicroVmUseCasesSlide() {
  return (
    <AcademicSlide title="MicroVM não substitui container ou VM" section="virtualizacao">
      <div className={styles.currentBody}>
        <div className={styles.draFlow}>
          <section><Package /><b>Imagem da aplicação</b><code>código + dependências</code></section>
          <ArrowRight />
          <section><Lock /><b>MicroVM enxuta</b><code>kernel + poucos devices</code></section>
          <ArrowRight />
          <section><Zap /><b>Workload efêmero</b><code>função, job ou sandbox</code></section>
        </div>
        <div className={styles.currentGrid}>
          <section><span>Quando ajuda</span><b>Multi-tenant e código não confiável</b><p>Funções serverless, executores de CI, sandboxes e plataformas que rodam código de terceiros se beneficiam de uma fronteira mais forte.</p></section>
          <section><span>Quando atrapalha</span><b>Workloads estáveis e controlados</b><p>Em serviços internos com baixo risco, containers comuns podem entregar melhor densidade e operação mais simples.</p></section>
          <section className={styles.impactCard}><span>Princípio</span><b>Isolamento é uma propriedade arquitetural</b><p>“Usar container” não define sozinho a fronteira. O runtime pode escolher processos, microVMs ou VMs completas conforme o risco.</p></section>
        </div>
        <SourceNote>Referência conceitual: Firecracker, lightweight virtualization for serverless applications, NSDI 2020.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

type Paper = { period: string; year: string; icon: LucideIcon; title: string; venue: string; problem: string; contribution: string };
const papers: Paper[] = [
  { period: "2010–2015", year: "2011", icon: Boxes, title: "Mesos: A Platform for Fine-Grained Resource Sharing in the Data Center", venue: "NSDI 2011", problem: "Como compartilhar um cluster entre frameworks distintos sem construir um único scheduler monolítico?", contribution: "Ofertas de recursos e escalonamento em dois níveis desacoplam a alocação global das decisões específicas de cada framework." },
  { period: "2016–2020", year: "2020", icon: Lock, title: "Firecracker: Lightweight Virtualization for Serverless Applications", venue: "NSDI 2020", problem: "Como iniciar workloads serverless rapidamente sem abandonar o isolamento por virtualização?", contribution: "MicroVMs com modelo mínimo de dispositivos reduzem memória, tempo de inicialização e superfície de ataque." },
  { period: "2021–2026", year: "2021", icon: Zap, title: "FaaSNet: Scalable and Fast Provisioning of Custom Serverless Container Runtimes", venue: "USENIX ATC 2021", problem: "Como distribuir imagens e iniciar milhares de runtimes personalizados durante picos de serverless?", contribution: "Uma árvore de distribuição transforma workers em pares que propagam imagens, evitando o registry como gargalo central." },
];

function ArticleTimelineSlide() {
  return (
    <AcademicSlide title="Artigos · três momentos da evolução" section="kubernetes">
      <div className={styles.articleBody}>
        <div className={styles.paperTimeline}>
          {papers.map(({ period, year, icon: Icon, title, venue, problem }, index) => (
            <section key={title} className={styles.paperCard}>
              <header><span>{period}</span><strong>{year}</strong></header><Icon /><h2>{title}</h2><small>{venue}</small>
              <div><b>Pergunta de pesquisa</b><p>{problem}</p></div>
              {index < papers.length - 1 && <ArrowRight className={styles.timelineArrow} />}
            </section>
          ))}
        </div>
        <SourceNote>Artigos selecionados em publicações técnicas da USENIX: NSDI 2011, NSDI 2020 e USENIX ATC 2021.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function ArticleSynthesisSlide() {
  return (
    <AcademicSlide title="O que evoluiu e o que permaneceu" section="kubernetes">
      <div className={styles.synthesisBody}>
        <div className={styles.evolutionChain}>
          {papers.map(({ year, icon: Icon, contribution }, index) => (
            <div key={year} className={styles.evolutionStage}>
              <section><Icon /><b>{year}</b><p>{contribution}</p></section>
              {index < papers.length - 1 && <ArrowRight />}
            </div>
          ))}
        </div>
        <div className={styles.persistGrid}>
          <section><Scale /><div><b>Trade-off permanente</b><p>Mais isolamento e flexibilidade exigem mais estado, coordenação e custo operacional.</p></div></section>
          <section><RefreshCcw /><div><b>Mudança de unidade</b><p>O foco saiu do cluster compartilhado, passou pela sandbox e chegou ao provisionamento massivo.</p></div></section>
          <section><GitBranch /><div><b>Conexão com Kubernetes</b><p>Schedulers, runtimes e distribuição de artefatos continuam compondo um único caminho crítico.</p></div></section>
        </div>
      </div>
    </AcademicSlide>
  );
}

function IngressRetirementSlide() {
  return (
    <AcademicSlide title="Tecnologia atual · aposentadoria do Ingress-NGINX" section="rede">
      <div className={styles.currentBody}>
        <div className={styles.draFlow}>
          <section><Route /><b>Ingress</b><code>objeto estável, poucas extensões</code></section>
          <ArrowRight />
          <section><TriangleAlert /><b>24 mar. 2026</b><code>fim do suporte ao controller</code></section>
          <ArrowRight />
          <section><Network /><b>Gateway API</b><code>modelo extensível e orientado a papéis</code></section>
        </div>
        <div className={styles.currentGrid}>
          <section><span>O fato</span><b>O controller deixou de receber correções</b><p>O projeto oficial anunciou o encerramento de releases, correções de bugs e patches de segurança após março de 2026.</p></section>
          <section><span>O risco</span><b>“Ainda funciona” não significa “ainda é seguro”</b><p>Instalações existentes podem continuar processando tráfego, mas passam a acumular vulnerabilidades e incompatibilidades sem manutenção upstream.</p></section>
          <section className={styles.impactCard}><span>Impacto arquitetural</span><b>A migração não é apenas trocar um Pod</b><p>Annotations específicas precisam virar recursos e políticas explícitas; equipes devem revisar ownership, observabilidade e comportamento de rotas.</p></section>
        </div>
        <SourceNote>Fonte: Kubernetes Blog e Kubernetes Security Response Committee, anúncios de novembro de 2025 a março de 2026.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function GatewayApiSlide() {
  return (
    <AcademicSlide title="Gateway API muda o contrato de rede" section="rede">
      <div className={styles.currentBody}>
        <div className={styles.draFlow}>
          <section><Cloud /><b>GatewayClass</b><code>implementação e capacidade</code></section>
          <ArrowRight />
          <section><Network /><b>Gateway</b><code>listeners e infraestrutura</code></section>
          <ArrowRight />
          <section><Route /><b>HTTPRoute</b><code>regras e backends da aplicação</code></section>
        </div>
        <div className={styles.currentGrid}>
          <section><span>Separação de papéis</span><b>Infraestrutura e aplicação deixam de editar o mesmo objeto</b><p>GatewayClass, Gateway e Route distribuem responsabilidades e permitem políticas de acesso coerentes com RBAC.</p></section>
          <section><span>Migração</span><b>Ingress2Gateway ajuda, mas não decide semântica</b><p>A versão 1.0 da ferramenta converte recursos comuns; extensões e annotations exigem validação humana e testes de tráfego.</p></section>
          <section className={styles.impactCard}><span>Lição</span><b>APIs de infraestrutura também envelhecem</b><p>Um contrato declarativo reduz operação manual, mas cria dependência de versão, implementação e governança, exatamente como qualquer outra API.</p></section>
        </div>
        <SourceNote>Fonte: Kubernetes Gateway API e anúncio oficial do Ingress2Gateway 1.0, março de 2026.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

export const overviewSlides: SlideDefinition[] = [
  { title: "Visão geral do seminário", duration: "1 min", maxStep: 0, section: "fundamentos", component: SeminarOverviewSlide },
];
export const additionalTopicSlides: SlideDefinition[] = [
  { title: "Tópico adicional · microVMs", duration: "1,25 min", maxStep: 0, section: "virtualizacao", component: MicroVmBoundarySlide },
  { title: "Quando usar microVMs", duration: "1,25 min", maxStep: 0, section: "virtualizacao", component: MicroVmUseCasesSlide },
];
export const articleSlides: SlideDefinition[] = [
  { title: "Artigos · três momentos da evolução", duration: "1 min", maxStep: 0, section: "kubernetes", component: ArticleTimelineSlide },
  { title: "Síntese dos artigos", duration: "1 min", maxStep: 0, section: "kubernetes", component: ArticleSynthesisSlide },
];
export const currentTechnologySlides: SlideDefinition[] = [
  { title: "Aposentadoria do Ingress-NGINX", duration: "1,25 min", maxStep: 0, section: "rede", component: IngressRetirementSlide },
  { title: "Gateway API", duration: "1,25 min", maxStep: 0, section: "rede", component: GatewayApiSlide },
];
