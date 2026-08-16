import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Boxes,
  Braces,
  Check,
  Clock3,
  Cloud,
  Container,
  Cpu,
  Database,
  FileClock,
  Gauge,
  GitBranch,
  Globe2,
  HardDrive,
  Layers3,
  ListChecks,
  Lock,
  Monitor,
  Network,
  Package,
  RefreshCcw,
  Route,
  Scale,
  Search,
  Server,
  ShieldCheck,
  Split,
  TriangleAlert,
  UserRound,
  Zap,
} from "lucide-react";
import type { SlideDefinition } from "./deck";
import { AcademicSlide, SourceNote } from "./academic-slide-shell";
import styles from "./priority-revision.module.css";

type Tone = "green" | "blue" | "amber" | "red" | "neutral";

type Concept = {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
  tone?: Tone;
};

function ConceptCards({ items, columns = 3 }: { items: Concept[]; columns?: 2 | 3 | 4 | 5 }) {
  return (
    <div className={styles.conceptGrid} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {items.map(({ icon: Icon, label, title, text, tone = "green" }) => (
        <section key={title} className={`${styles.conceptCard} ${styles[tone]}`}>
          <header><Icon /><span>{label}</span></header>
          <b>{title}</b>
          <p>{text}</p>
        </section>
      ))}
    </div>
  );
}

function Flow({
  items,
  compact = false,
}: {
  items: Array<{ icon: LucideIcon; title: string; detail: string; tone?: Tone }>;
  compact?: boolean;
}) {
  return (
    <div className={`${styles.flow} ${compact ? styles.compactFlow : ""}`}>
      {items.map(({ icon: Icon, title, detail, tone = "green" }, index) => (
        <div key={title} className={styles.flowStage}>
          <section className={`${styles[tone]}`}><Icon /><b>{title}</b><small>{detail}</small></section>
          {index < items.length - 1 && <ArrowRight />}
        </div>
      ))}
    </div>
  );
}

function Definition({ term, children }: { term: string; children: React.ReactNode }) {
  return <div className={styles.definition}><b>{term}</b><span>{children}</span></div>;
}

function CoverSlide() {
  const layers: Array<{ icon: LucideIcon; title: string; text: string }> = [
    { icon: Server, title: "Virtualização", text: "divide hardware físico em máquinas isoladas" },
    { icon: Container, title: "Containers", text: "empacotam processos e dependências" },
    { icon: Boxes, title: "Kubernetes", text: "coordena processamento distribuído" },
    { icon: Database, title: "Replicação", text: "mantém cópias do estado" },
    { icon: Globe2, title: "Multi-região", text: "expõe latência, consenso e recuperação" },
  ];
  return (
    <AcademicSlide title="Cloud computing: da virtualização à operação multi-região" section="fundamentos" className={styles.coverSlide}>
      <div className={`${styles.body} ${styles.coverBody}`}>
        <section className={styles.coverText}>
          <p>Uma visão técnica de como a cloud isola recursos, distribui aplicações e mantém dados corretos quando processos, máquinas, zonas ou regiões falham.</p>
          <div className={styles.presenterBlock}>
            <span>Integrantes</span>
            <div>
              <b>Bernardo Amorim</b><b>Gabriel Jota</b><b>Henrique Oliveira</b><b>Guilherme Oliveira</b>
            </div>
          </div>
        </section>
        <div className={styles.layerStack}>
          {layers.map(({ icon: Icon, title, text }, index) => (
            <section key={title}><span>{index + 1}</span><Icon /><div><b>{title}</b><small>{text}</small></div></section>
          ))}
        </div>
      </div>
    </AcademicSlide>
  );
}

function SeminarOverviewSlide() {
  const cards: Concept[] = [
    { icon: Cloud, label: "1", title: "Resumo da área", text: "Cloud, virtualização, containers, orquestração, rede, dados e sistemas distribuídos." },
    { icon: Lock, label: "2", title: "Tópico adicional", text: "MicroVMs como fronteira intermediária entre containers e VMs tradicionais.", tone: "blue" },
    { icon: FileClock, label: "3", title: "Evolução científica", text: "Mesos (2011), Firecracker (2020) e FaaSNet (2021), com um slide dedicado a cada artigo.", tone: "amber" },
    { icon: Activity, label: "4", title: "Tecnologia atual", text: "Aposentadoria do Ingress-NGINX em 2026 e migração para Gateway API.", tone: "red" },
    { icon: ListChecks, label: "5", title: "Questões", text: "Quatro questões de ENADE e concurso, seguidas por resolução comentada.", tone: "blue" },
    { icon: UserRound, label: "6", title: "Participação", text: "Roda de discussão com um cenário multi-região e requisitos incompatíveis entre si." },
  ];
  return (
    <AcademicSlide title="Estrutura do seminário" section="fundamentos">
      <div className={`${styles.body} ${styles.overviewBody}`}>
        <ConceptCards items={cards} columns={3} />
        <div className={styles.durationBar}><Clock3 /><b>Roteiro de 100 a 110 minutos</b><span>Conteúdo técnico, artigos, quatro questões e discussão final</span></div>
      </div>
    </AcademicSlide>
  );
}

function VmMemoryIoSlide() {
  return (
    <AcademicSlide title="Como uma VM acessa memória e dispositivos" section="virtualizacao">
      <div className={`${styles.body} ${styles.splitBody}`}>
        <section className={styles.explainerPanel}>
          <span className={styles.eyebrow}>CAMINHO PRINCIPAL</span>
          <Flow items={[
            { icon: Package, title: "Aplicação", detail: "executa dentro da VM" },
            { icon: Monitor, title: "Kernel convidado", detail: "gerencia a máquina aparente", tone: "blue" },
            { icon: Braces, title: "Hypervisor", detail: "traduz e controla acesso", tone: "amber" },
            { icon: Cpu, title: "Hardware", detail: "CPU, RAM, disco e rede", tone: "neutral" },
          ]} />
          <p className={styles.mainStatement}>A VM enxerga um computador completo, mas o hypervisor continua decidindo como seus recursos virtuais usam o hardware físico.</p>
        </section>
        <section className={styles.definitionPanel}>
          <Definition term="EPT/NPT">Tabelas mantidas com apoio do processador para traduzir memória do guest até a memória física do host.</Definition>
          <Definition term="virtio">Família de dispositivos paravirtualizados que reduz o custo de emular hardware tradicional para disco e rede.</Definition>
          <Definition term="Ideia central">CPU, memória e I/O percorrem caminhos diferentes. Por isso, o overhead de uma VM não é um único número.</Definition>
        </section>
      </div>
    </AcademicSlide>
  );
}

function VmContainerBoundarySlide() {
  return (
    <AcademicSlide title="VMs e containers: fronteiras de isolamento diferentes" section="virtualizacao">
      <div className={`${styles.body} ${styles.compareBody}`}>
        <section className={styles.stackCard}>
          <header><Server /><div><span>MÁQUINA VIRTUAL</span><b>Outro kernel</b></div></header>
          <div className={styles.stack}><i>Aplicação</i><i>Bibliotecas</i><i className={styles.kernelLayer}>Kernel convidado</i><i>Hardware virtual</i><i>Hypervisor</i></div>
          <p>Permite sistemas operacionais diferentes e oferece uma fronteira forte, mas exige boot e memória para outro kernel.</p>
        </section>
        <section className={`${styles.stackCard} ${styles.containerStackCard}`}>
          <header><Container /><div><span>CONTAINER</span><b>Kernel compartilhado</b></div></header>
          <div className={styles.stack}><i>Aplicação</i><i>Bibliotecas</i><i className={styles.kernelLayer}>Kernel do host</i><i>Container runtime</i></div>
          <p>Cria processos isolados rapidamente e com alta densidade, mas amplia o impacto de uma vulnerabilidade no kernel comum.</p>
        </section>
        <div className={styles.decisionStrip}><Cloud /><span>Na cloud, containers normalmente rodam dentro de VMs: a VM separa tenants; o container organiza e empacota aplicações.</span></div>
      </div>
    </AcademicSlide>
  );
}

function MicroVmDefinitionSlide() {
  const choices: Concept[] = [
    { icon: Container, label: "CONTAINER", title: "Processo isolado", text: "Inicialização muito rápida, alta densidade e kernel compartilhado.", tone: "blue" },
    { icon: Lock, label: "MICROVM", title: "VM reduzida", text: "Kernel próprio e poucos dispositivos, criada para subir rapidamente e limitar a superfície de emulação." },
    { icon: Server, label: "VM TRADICIONAL", title: "Máquina completa", text: "Mais compatibilidade e recursos de hardware virtual, com maior custo de memória e inicialização.", tone: "neutral" },
  ];
  return (
    <AcademicSlide title="MicroVM: uma VM reduzida para workloads efêmeros" section="virtualizacao">
      <div className={`${styles.body} ${styles.microVmBody}`}>
        <ConceptCards items={choices} columns={3} />
        <div className={styles.microVmAnswer}>
          <ShieldCheck /><div><b>Por que ela existe?</b><p>Containers são leves, mas compartilham o kernel. VMs isolam melhor, mas costumam carregar componentes desnecessários. A microVM mantém a fronteira de virtualização e remove dispositivos e funcionalidades que um workload efêmero não precisa.</p></div>
        </div>
      </div>
    </AcademicSlide>
  );
}

function MicroVmUseCasesSlide() {
  return (
    <AcademicSlide title="Quando usar microVMs" section="virtualizacao">
      <div className={`${styles.body} ${styles.useCaseBody}`}>
        <section className={styles.useCaseColumn}>
          <header><ShieldCheck /><div><span>FAZ SENTIDO</span><b>O código não é plenamente confiável</b></div></header>
          <ul><li>Funções serverless de vários clientes</li><li>Sandboxes para executar código enviado por usuários</li><li>Executores de CI compartilhados</li><li>Plataformas multi-tenant com forte isolamento</li></ul>
        </section>
        <section className={`${styles.useCaseColumn} ${styles.mutedUseCase}`}>
          <header><Scale /><div><span>PODE SER EXCESSO</span><b>O ambiente é controlado</b></div></header>
          <ul><li>Serviços internos de um único tenant</li><li>Workloads longos e estáveis</li><li>Clusters em que densidade é a prioridade</li><li>Equipes sem necessidade operacional clara</li></ul>
        </section>
        <div className={styles.useCaseRule}><Gauge /><span>A escolha não é uma disputa entre tecnologias. Ela depende do modelo de ameaça, do tempo de inicialização, da densidade e da complexidade que a equipe aceita operar.</span></div>
        <SourceNote>Referência: Agache et al., Firecracker: Lightweight Virtualization for Serverless Applications, NSDI 2020.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function KubernetesProblemSlide() {
  const items: Concept[] = [
    { icon: TriangleAlert, label: "FALHA", title: "Um processo termina", text: "É necessário criar outra instância sem depender de intervenção manual.", tone: "red" },
    { icon: Server, label: "PLACEMENT", title: "Uma máquina fica sem capacidade", text: "A nova instância deve ser colocada em outro Node adequado.", tone: "amber" },
    { icon: Network, label: "REDE", title: "O endereço muda", text: "Clientes precisam continuar encontrando réplicas saudáveis.", tone: "blue" },
    { icon: Package, label: "VERSÃO", title: "A aplicação é atualizada", text: "A troca precisa ser gradual e reversível." },
  ];
  return (
    <AcademicSlide title="O problema que o Kubernetes resolve" section="kubernetes">
      <div className={`${styles.body} ${styles.problemBody}`}>
        <p className={styles.lead}>Executar um container é simples. Manter centenas deles distribuídos, atualizados e disponíveis enquanto máquinas falham é o problema de orquestração.</p>
        <ConceptCards items={items} columns={4} />
        <div className={styles.reconcileBar}><RefreshCcw /><span>Kubernetes compara continuamente o estado desejado com o estado observado e executa ações para aproximar os dois.</span></div>
      </div>
    </AcademicSlide>
  );
}

function KubernetesBasicsSlide() {
  const basics: Concept[] = [
    { icon: Cloud, label: "CLUSTER", title: "Conjunto administrado", text: "Control plane e máquinas de trabalho tratados como um único ambiente." },
    { icon: Server, label: "NODE", title: "Máquina de trabalho", text: "VM ou servidor que oferece CPU, memória, rede e runtime." },
    { icon: Package, label: "POD", title: "Unidade de execução", text: "Um ou mais containers que compartilham rede e ciclo de vida.", tone: "blue" },
    { icon: RefreshCcw, label: "DEPLOYMENT", title: "Estado desejado", text: "Declara versão e quantidade de Pods, com atualização e rollback.", tone: "amber" },
    { icon: Network, label: "SERVICE", title: "Ponto estável", text: "Representa um conjunto variável de Pods por nome e endereço estáveis.", tone: "neutral" },
  ];
  return (
    <AcademicSlide title="Cinco conceitos básicos do Kubernetes" section="kubernetes">
      <div className={`${styles.body} ${styles.basicsBody}`}>
        <ConceptCards items={basics} columns={5} />
        <div className={styles.relationLine}><GitBranch /><span>Deployment cria e substitui Pods; Pods rodam em Nodes; Service mantém um endereço estável para os Pods selecionados.</span></div>
      </div>
    </AcademicSlide>
  );
}

function ManifestToPodSlide() {
  return (
    <AcademicSlide title="Do manifesto ao Pod" section="kubernetes">
      <div className={`${styles.body} ${styles.pipelineBody}`}>
        <Flow compact items={[
          { icon: Package, title: "Manifesto", detail: "Deployment com 3 réplicas" },
          { icon: Cloud, title: "API server", detail: "valida e registra", tone: "blue" },
          { icon: Database, title: "etcd", detail: "armazena o estado do cluster", tone: "neutral" },
          { icon: Search, title: "Scheduler", detail: "escolhe um Node", tone: "amber" },
          { icon: Server, title: "kubelet", detail: "converge o Node", tone: "blue" },
          { icon: Container, title: "Pod", detail: "containers em execução" },
        ]} />
        <div className={styles.pipelineNotes}>
          <Definition term="Declarativo">O usuário descreve o resultado desejado, não uma sequência fixa de comandos.</Definition>
          <Definition term="Assíncrono">A API pode aceitar o objeto antes de o Pod existir. Controllers e agentes completam o trabalho depois.</Definition>
          <Definition term="Reconciliação">Se o Pod desaparecer, o sistema detecta a diferença e cria outro.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function ControlPlaneSlide() {
  const controlPlane: Concept[] = [
    { icon: Cloud, label: "API SERVER", title: "Porta de entrada", text: "Autentica, autoriza, valida e oferece a API usada por pessoas e componentes." },
    { icon: Database, label: "ETCD", title: "Estado persistente", text: "Banco chave-valor consistente que guarda objetos e metadados do cluster.", tone: "neutral" },
    { icon: RefreshCcw, label: "CONTROLLERS", title: "Laços de controle", text: "Observam recursos e executam ações para corrigir diferenças.", tone: "blue" },
    { icon: Search, label: "SCHEDULER", title: "Escolha do Node", text: "Filtra Nodes inviáveis e pontua os candidatos para cada Pod.", tone: "amber" },
  ];
  return (
    <AcademicSlide title="O control plane mantém o estado desejado" section="kubernetes">
      <div className={`${styles.body} ${styles.controlPlaneBody}`}>
        <ConceptCards items={controlPlane} columns={4} />
        <div className={styles.controlPlaneRule}><Lock /><span>O etcd não executa containers e o scheduler não os inicia. Cada componente possui uma responsabilidade estreita e se comunica por meio da API.</span></div>
      </div>
    </AcademicSlide>
  );
}

function NodeComponentsSlide() {
  return (
    <AcademicSlide title="O que roda em cada Node" section="kubernetes">
      <div className={`${styles.body} ${styles.nodeBody}`}>
        <section className={styles.nodeMachine}>
          <header><Server /><div><span>NODE</span><b>VM ou servidor de trabalho</b></div></header>
          <div className={styles.nodeLayers}>
            <section><Package /><div><b>Pods</b><small>workloads agendados para esta máquina</small></div></section>
            <section><Container /><div><b>Container runtime</b><small>cria e supervisiona containers por meio da CRI</small></div></section>
            <section><Network /><div><b>Rede do Node</b><small>CNI, rotas, interfaces e regras de encaminhamento</small></div></section>
            <section><Cpu /><div><b>Sistema operacional</b><small>kernel, CPU, memória e dispositivos</small></div></section>
          </div>
        </section>
        <section className={styles.kubeletPanel}><Activity /><div><span>KUBELET</span><b>Agente local</b><p>Observa os Pods atribuídos ao Node, conversa com o runtime, monta volumes, executa probes e publica o estado da máquina para a API.</p></div></section>
      </div>
    </AcademicSlide>
  );
}

function PodNetworkSlide() {
  return (
    <AcademicSlide title="Como um Pod entra na rede" section="rede">
      <div className={`${styles.body} ${styles.podNetworkBody}`}>
        <Flow compact items={[
          { icon: Package, title: "Pod criado", detail: "recebe uma sandbox" },
          { icon: Network, title: "Network namespace", detail: "interfaces e rotas próprias", tone: "blue" },
          { icon: Braces, title: "Plugin CNI", detail: "configura conectividade", tone: "amber" },
          { icon: Server, title: "Rede do Node", detail: "encaminha tráfego" },
          { icon: Cloud, title: "Fabric do cluster", detail: "liga Nodes e subnets", tone: "neutral" },
        ]} />
        <div className={styles.networkDefinitions}>
          <Definition term="CNI">Especificação e conjunto de plugins usados pelo runtime para adicionar ou remover uma interface da rede de uma sandbox.</Definition>
          <Definition term="Fabric">Infraestrutura de encaminhamento formada por links, switches, overlays, rotas ou eBPF. Não é um componente único do Kubernetes.</Definition>
          <Definition term="Resultado">Cada Pod recebe um IP alcançável conforme o modelo de rede implementado pelo cluster.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function ServiceEndpointSliceSlide() {
  return (
    <AcademicSlide title="Service e EndpointSlice separam nome estável de Pods efêmeros" section="rede">
      <div className={`${styles.body} ${styles.serviceBody}`}>
        <section className={styles.serviceStable}><Network /><span>SERVICE</span><b>api.default.svc</b><code>10.96.14.20:80</code><p>Nome e endereço lógico permanecem estáveis para os clientes.</p></section>
        <ArrowRight className={styles.serviceArrow} />
        <section className={styles.endpointPanel}>
          <header><GitBranch /><div><span>ENDPOINTSLICE</span><b>Lista atual de backends</b></div></header>
          <div><i className={styles.readyDot}/><code>10.244.1.8:8080</code><small>ready</small></div>
          <div><i className={styles.readyDot}/><code>10.244.2.4:8080</code><small>ready</small></div>
          <div className={styles.terminatingEndpoint}><i/><code>10.244.3.7:8080</code><small>terminating</small></div>
        </section>
        <div className={styles.serviceRule}><RefreshCcw /><span>O control plane atualiza EndpointSlices quando Pods aparecem, ficam prontos ou terminam. Componentes de rede usam essa informação para encaminhar apenas aos backends elegíveis.</span></div>
      </div>
    </AcademicSlide>
  );
}

function RequestPathSlide() {
  return (
    <AcademicSlide title="Caminho completo de uma requisição" section="rede">
      <div className={`${styles.body} ${styles.requestBody}`}>
        <Flow compact items={[
          { icon: UserRound, title: "Cliente", detail: "DNS e conexão" },
          { icon: Cloud, title: "Load balancer", detail: "entrada da VPC", tone: "neutral" },
          { icon: Route, title: "Gateway", detail: "host, path e políticas", tone: "blue" },
          { icon: Network, title: "Service", detail: "destino lógico", tone: "amber" },
          { icon: GitBranch, title: "EndpointSlice", detail: "backend saudável", tone: "blue" },
          { icon: Package, title: "Pod", detail: "aplicação responde" },
        ]} />
        <div className={styles.pathResponsibilities}>
          <section><b>L4</b><span>IP, porta, conexão e balanceamento de transporte.</span></section>
          <section><b>L7</b><span>Host, caminho HTTP, TLS, headers e regras de aplicação.</span></section>
          <section><b>Saúde</b><span>Readiness retira Pods do conjunto antes de direcionar novos tráfegos.</span></section>
          <section><b>Diagnóstico</b><span>Um Pod Ready não garante que DNS, Gateway, Service ou load balancer estejam corretos.</span></section>
        </div>
      </div>
    </AcademicSlide>
  );
}

function VpcSlide() {
  const items: Concept[] = [
    { icon: Cloud, label: "VPC", title: "Rede virtual isolada", text: "Define espaço de endereços, conectividade e fronteira administrativa." },
    { icon: Layers3, label: "SUBNET", title: "Segmento de endereços", text: "Normalmente associado a uma zona e a uma tabela de rotas.", tone: "blue" },
    { icon: Route, label: "ROTAS", title: "Próximo salto", text: "Determinam para onde pacotes destinados a cada prefixo devem seguir.", tone: "amber" },
    { icon: Lock, label: "POLÍTICAS", title: "Filtragem", text: "Security groups, ACLs e firewalls limitam fluxos permitidos.", tone: "red" },
  ];
  return (
    <AcademicSlide title="VPC, subnets e rotas formam a rede da cloud" section="rede">
      <div className={`${styles.body} ${styles.vpcBody}`}>
        <ConceptCards items={items} columns={4} />
        <div className={styles.providerRow}><span>AWS VPC</span><span>Azure VNet</span><span>Google Cloud VPC</span><span>Huawei Cloud VPC</span></div>
        <p className={styles.providerNote}>Os nomes e detalhes variam, mas o contrato central é semelhante: endereçamento privado, segmentação, roteamento e controle de acesso definidos por software.</p>
      </div>
    </AcademicSlide>
  );
}

type Paper = {
  period: string;
  year: string;
  title: string;
  venue: string;
  icon: LucideIcon;
  problem: string;
  proposal: string;
  result: string;
  limitation: string;
  connection: string;
  source: string;
};

const papers: Paper[] = [
  {
    period: "2010-2015",
    year: "2011",
    title: "Mesos: A Platform for Fine-Grained Resource Sharing in the Data Center",
    venue: "NSDI 2011",
    icon: Boxes,
    problem: "Diferentes frameworks precisavam compartilhar o mesmo cluster sem abrir mão de seus próprios algoritmos de escalonamento.",
    proposal: "Mesos introduziu ofertas de recursos e escalonamento em dois níveis: o cluster oferece capacidade; cada framework decide quais ofertas aceitar e quais tarefas executar.",
    result: "Os autores demonstraram boa localidade de dados, tolerância a falhas e escalabilidade para 50 mil nós emulados.",
    limitation: "A flexibilidade desloca parte da complexidade para os frameworks e não resolve, por si só, empacotamento, rede ou isolamento de workloads.",
    connection: "Antecipou a separação entre gestão global de recursos e decisões específicas da aplicação, uma ideia presente em orquestradores modernos.",
    source: "Hindman et al., NSDI 2011.",
  },
  {
    period: "2016-2020",
    year: "2020",
    title: "Firecracker: Lightweight Virtualization for Serverless Applications",
    venue: "NSDI 2020",
    icon: Lock,
    problem: "Serverless exigia iniciar muitas cargas multi-tenant rapidamente, mas containers sozinhos não ofereciam a fronteira de isolamento desejada pelo provedor.",
    proposal: "Um VMM especializado cria microVMs com kernel próprio e um modelo mínimo de dispositivos, reduzindo memória, tempo de boot e superfície de ataque.",
    result: "A arquitetura foi usada em AWS Lambda e Fargate para combinar virtualização de hardware com workloads efêmeros em larga escala.",
    limitation: "A especialização reduz compatibilidade e não elimina o custo operacional de gerenciar kernels, imagens e capacidade de hosts.",
    connection: "Mostra que container é uma forma de empacotamento; a fronteira de execução pode continuar sendo uma VM.",
    source: "Agache et al., NSDI 2020.",
  },
  {
    period: "2021-2026",
    year: "2021",
    title: "FaaSNet: Scalable and Fast Provisioning of Custom Serverless Container Runtimes",
    venue: "USENIX ATC 2021",
    icon: Zap,
    problem: "Durante picos, milhares de workers precisavam obter imagens de função; um registry central se tornava gargalo de rede e provisionamento.",
    proposal: "FaaSNet organiza workers em uma árvore adaptativa para que os próprios nós propaguem imagens sob demanda.",
    result: "No experimento, o sistema provisionou 2.500 containers em 1.000 VMs em 8,3 segundos e superou os baselines avaliados.",
    limitation: "A solução otimiza distribuição e startup, mas não substitui decisões de placement, isolamento, consistência ou controle de capacidade.",
    connection: "Escalar aplicações depende também do caminho de distribuição de artefatos, não apenas de criar mais Pods ou VMs.",
    source: "Wang et al., USENIX ATC 2021.",
  },
];

function PaperSlide({ paper }: { paper: Paper }) {
  const Icon = paper.icon;
  return (
    <AcademicSlide title={`${paper.year}: ${paper.title}`} section="kubernetes">
      <div className={`${styles.body} ${styles.paperBody}`}>
        <section className={styles.paperIdentity}><span>{paper.period}</span><Icon /><strong>{paper.year}</strong><b>{paper.venue}</b></section>
        <div className={styles.paperDetails}>
          <Definition term="Problema">{paper.problem}</Definition>
          <Definition term="Proposta">{paper.proposal}</Definition>
          <Definition term="Resultado">{paper.result}</Definition>
          <Definition term="Limitação">{paper.limitation}</Definition>
          <div className={styles.paperConnection}><GitBranch /><div><b>Conexão com o seminário</b><p>{paper.connection}</p></div></div>
        </div>
        <SourceNote>{paper.source}</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function ArticleSynthesisSlide() {
  return (
    <AcademicSlide title="Evolução dos artigos: da alocação ao provisionamento em massa" section="kubernetes">
      <div className={`${styles.body} ${styles.articleSynthesisBody}`}>
        <Flow items={[
          { icon: Boxes, title: "2011: compartilhar", detail: "múltiplos frameworks em um cluster" },
          { icon: Lock, title: "2020: isolar", detail: "microVMs para workloads multi-tenant", tone: "blue" },
          { icon: Zap, title: "2021: provisionar", detail: "distribuição rápida de runtimes", tone: "amber" },
        ]} />
        <div className={styles.synthesisGrid}>
          <Definition term="O que mudou">A unidade de preocupação saiu do cluster compartilhado, passou pela sandbox de execução e chegou ao caminho crítico de criação em massa.</Definition>
          <Definition term="O que permaneceu">Escalabilidade sempre depende de remover um gargalo concreto, não apenas de adicionar máquinas.</Definition>
          <Definition term="Trade-off recorrente">Mais isolamento, flexibilidade e velocidade exigem novos mecanismos de coordenação e novos custos operacionais.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function IngressRetirementSlide() {
  return (
    <AcademicSlide title="Tecnologia atual: Ingress-NGINX foi aposentado em 2026" section="rede">
      <div className={`${styles.body} ${styles.retirementBody}`}>
        <div className={styles.retirementDate}><TriangleAlert /><span>24 MAR 2026</span><b>Fim do suporte oficial</b></div>
        <div className={styles.retirementPoints}>
          <Definition term="O que terminou">Não há novos releases, correções de bugs nem atualizações para vulnerabilidades descobertas depois da aposentadoria.</Definition>
          <Definition term="O que continua">Deployments existentes e artefatos publicados podem continuar funcionando, mas ficam sem manutenção upstream.</Definition>
          <Definition term="Por que a migração exige cuidado">Ingress-NGINX acumulou annotations, defaults e comportamentos específicos. Uma conversão sintaticamente correta ainda pode alterar o tráfego.</Definition>
        </div>
        <div className={styles.retirementAction}><Route /><span>Inventariar recursos, annotations, ConfigMaps, TLS, timeouts e regras de rewrite antes de escolher Gateway API ou outro controller mantido.</span></div>
        <SourceNote>Fontes: Kubernetes Blog, anúncio de aposentadoria de novembro de 2025 e confirmação em 24 de março de 2026.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function GatewayApiSlide() {
  return (
    <AcademicSlide title="Gateway API separa infraestrutura e regras da aplicação" section="rede">
      <div className={`${styles.body} ${styles.gatewayBody}`}>
        <Flow items={[
          { icon: Braces, title: "GatewayClass", detail: "controller e capacidades" },
          { icon: Cloud, title: "Gateway", detail: "listeners e infraestrutura", tone: "blue" },
          { icon: Route, title: "HTTPRoute", detail: "hosts, paths e backends", tone: "amber" },
          { icon: Network, title: "Service", detail: "destino da aplicação", tone: "neutral" },
        ]} />
        <div className={styles.gatewayRoles}>
          <section><span>PLATAFORMA</span><b>Seleciona a implementação e publica Gateways</b><p>Controla endereços, listeners, certificados e políticas compartilhadas.</p></section>
          <section><span>APLICAÇÃO</span><b>Declara rotas para seus Services</b><p>Configura hosts, paths, filtros e backends dentro dos limites autorizados.</p></section>
          <section><span>MIGRAÇÃO</span><b>Ingress2Gateway auxilia, mas não decide semântica</b><p>A ferramenta converte padrões comuns; extensões específicas ainda exigem revisão e testes.</p></section>
        </div>
        <SourceNote>Fontes: documentação oficial do Gateway API e anúncio do Ingress2Gateway 1.0, março de 2026.</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function WalSlide() {
  return (
    <AcademicSlide title="WAL: o registro das mudanças antes das páginas de dados" section="replicacao">
      <div className={`${styles.body} ${styles.walBody}`}>
        <Flow items={[
          { icon: Package, title: "Transação", detail: "altera dados em memória" },
          { icon: FileClock, title: "Registro no WAL", detail: "descreve a mudança", tone: "blue" },
          { icon: HardDrive, title: "Flush do WAL", detail: "torna o log durável", tone: "amber" },
          { icon: Database, title: "Páginas de dados", detail: "podem ser gravadas depois", tone: "neutral" },
        ]} />
        <div className={styles.walExplanation}>
          <Definition term="WAL">Write-Ahead Log. A regra é registrar a mudança de forma durável antes de depender da página de dados alterada.</Definition>
          <Definition term="Recuperação">Após uma falha, o banco reproduz registros confirmados para reconstruir um estado consistente.</Definition>
          <Definition term="Replicação">Enviar WAL permite que outra instância receba a mesma sequência de mudanças.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function ReceivePersistApplySlide() {
  return (
    <AcademicSlide title="Receber, persistir e aplicar são etapas diferentes" section="replicacao">
      <div className={`${styles.body} ${styles.replicationStagesBody}`}>
        <section className={styles.primaryBox}><Database /><span>PRIMARY</span><b>gera WAL</b></section>
        <ArrowRight />
        <section className={styles.replicationStage}><Network /><span>1</span><b>Receber</b><p>Os bytes chegaram à memória ou ao buffer da réplica.</p></section>
        <ArrowRight />
        <section className={styles.replicationStage}><HardDrive /><span>2</span><b>Persistir</b><p>O log foi gravado em armazenamento durável.</p></section>
        <ArrowRight />
        <section className={styles.replicationStage}><RefreshCcw /><span>3</span><b>Aplicar</b><p>A réplica reproduziu o log e atualizou seu estado visível.</p></section>
        <div className={styles.replicationWarning}><TriangleAlert /><span>Um ACK pode representar qualquer uma dessas fronteiras. Sem conhecer a configuração, “a réplica confirmou” é uma frase ambígua.</span></div>
      </div>
    </AcademicSlide>
  );
}

function SyncAckSlide() {
  return (
    <AcademicSlide title="O que o ACK garante na replicação síncrona" section="replicacao">
      <div className={`${styles.body} ${styles.ackBody}`}>
        <Flow items={[
          { icon: Package, title: "Cliente", detail: "envia COMMIT" },
          { icon: Database, title: "Primary", detail: "persiste localmente", tone: "blue" },
          { icon: Network, title: "Réplica", detail: "recebe e faz remote flush", tone: "amber" },
          { icon: Check, title: "ACK", detail: "confirma a fronteira configurada" },
          { icon: UserRound, title: "Resposta", detail: "commit concluído", tone: "neutral" },
        ]} />
        <div className={styles.ackTradeoffs}>
          <Definition term="Vantagem">Se a confirmação exige persistência em outra zona, a perda do primary não elimina a única cópia durável do commit.</Definition>
          <Definition term="Custo">A latência de escrita inclui rede, fila e armazenamento remoto. Se a réplica necessária estiver indisponível, o commit pode bloquear ou falhar.</Definition>
          <Definition term="Pergunta correta">Qual réplica participa do ACK e qual etapa ela precisa concluir antes de responder?</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function AsyncReplicationSlide() {
  return (
    <AcademicSlide title="Na replicação assíncrona, o cliente não espera a cópia remota" section="replicacao">
      <div className={`${styles.body} ${styles.asyncBody}`}>
        <section className={styles.asyncTimeline}>
          <div><span>1</span><b>Primary persiste</b><small>commit local</small></div><ArrowRight />
          <div><span>2</span><b>Cliente recebe sucesso</b><small>latência menor</small></div><ArrowRight />
          <div><span>3</span><b>WAL é enviado</b><small>depois da resposta</small></div><ArrowRight />
          <div><span>4</span><b>Réplica aplica</b><small>surge o lag</small></div>
        </section>
        <div className={styles.asyncTradeoff}>
          <section><Gauge /><div><b>Benefício</b><p>A escrita normal não depende da latência ou disponibilidade da réplica.</p></div></section>
          <section><TriangleAlert /><div><b>Risco</b><p>Se o primary falhar antes da réplica receber o trecho final do WAL, commits já confirmados podem ser perdidos.</p></div></section>
          <section><Scale /><div><b>Contrato</b><p>O RPO deixa de ser automaticamente zero e passa a depender do lag e do procedimento de failover.</p></div></section>
        </div>
      </div>
    </AcademicSlide>
  );
}

function FailoverFencingSlide() {
  return (
    <AcademicSlide title="Failover seguro exige fencing" section="replicacao">
      <div className={`${styles.body} ${styles.failoverBody}`}>
        <section className={styles.splitBrainDiagram}>
          <div className={styles.oldPrimary}><Database /><span>PRIMARY ANTIGO</span><b>continua aceitando escritas?</b></div>
          <div className={styles.partition}><Split /><b>partição de rede</b></div>
          <div className={styles.promotedReplica}><Database /><span>RÉPLICA PROMOVIDA</span><b>também aceita escritas</b></div>
          <p>Duas autoridades produzem históricos incompatíveis: split-brain.</p>
        </section>
        <section className={styles.fencingDefinitions}>
          <Definition term="Fencing">Mecanismo que corta a capacidade do primary antigo escrever, por exemplo desligando a VM, revogando storage ou removendo credenciais.</Definition>
          <Definition term="Lease">Permissão temporária que precisa ser renovada. Sem renovação, o nó perde autoridade.</Definition>
          <Definition term="Quorum">Decisão apoiada pela maioria dos membros, evitando que duas minorias independentes se considerem líderes.</Definition>
        </section>
      </div>
    </AcademicSlide>
  );
}

function QuorumMultiAzSlide() {
  return (
    <AcademicSlide title="Quorum distribui autoridade entre zonas" section="replicacao">
      <div className={`${styles.body} ${styles.quorumBody}`}>
        <div className={styles.azGrid}>
          <section><span>AZ A</span><Database /><b>Nó 1</b><small>voto</small></section>
          <section><span>AZ B</span><Database /><b>Nó 2</b><small>voto</small></section>
          <section><span>AZ C</span><Database /><b>Nó 3</b><small>voto</small></section>
        </div>
        <div className={styles.quorumEquation}><b>3 membros</b><span>maioria = 2</span><strong>uma AZ pode falhar</strong></div>
        <div className={styles.quorumNotes}>
          <Definition term="Por que número ímpar?">Três e quatro membros toleram a mesma quantidade de falhas para decisões por maioria: uma. O quarto aumenta custo sem aumentar essa tolerância.</Definition>
          <Definition term="Limite">Quorum preserva uma única autoridade, mas não cria capacidade. As zonas restantes ainda precisam suportar carga e armazenamento.</Definition>
          <Definition term="Latência">A confirmação precisa alcançar membros suficientes. Placement e distância entre zonas entram no caminho de escrita.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function RttSlide() {
  return (
    <AcademicSlide title="RTT e o custo físico da distância" section="distribuidos">
      <div className={`${styles.body} ${styles.rttBody}`}>
        <section className={styles.regionPair}><div><Globe2 /><span>REGIÃO A</span><b>São Paulo</b></div><div className={styles.rttLine}><ArrowRight /><span>RTT</span><ArrowRight /></div><div><Globe2 /><span>REGIÃO B</span><b>outra geografia</b></div></section>
        <div className={styles.rttDefinitions}>
          <Definition term="RTT">Round-trip time: tempo para uma mensagem ir até o destino e uma resposta voltar.</Definition>
          <Definition term="Commit síncrono">Se uma região remota participa do ACK, pelo menos uma viagem de rede e o trabalho remoto entram na latência observada.</Definition>
          <Definition term="Limite físico">Software pode reduzir filas e cópias, mas não remove distância, propagação e falhas de enlaces intermediários.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

function ActiveModesSlide() {
  return (
    <AcademicSlide title="Active-passive e active-active resolvem problemas diferentes" section="distribuidos">
      <div className={`${styles.body} ${styles.activeModesBody}`}>
        <section className={styles.modeCard}><header><RefreshCcw /><div><span>ACTIVE-PASSIVE</span><b>Uma região recebe escritas</b></div></header><ul><li>Autoridade simples no caminho normal</li><li>Failover precisa promover o destino e bloquear a origem</li><li>Capacidade de standby pode ser parcial</li><li>RTO depende de detecção, promoção, rede e clientes</li></ul></section>
        <section className={`${styles.modeCard} ${styles.activeActiveCard}`}><header><Split /><div><span>ACTIVE-ACTIVE</span><b>Mais de uma região aceita operações</b></div></header><ul><li>Menor latência local para usuários distribuídos</li><li>Conflitos e invariantes precisam de tratamento explícito</li><li>Partições podem impedir algumas operações</li><li>Custo e complexidade aumentam significativamente</li></ul></section>
        <div className={styles.modeRule}><Scale /><span>Active-active não é uma versão superior de active-passive. Ele é necessário apenas quando requisitos de latência, disponibilidade de escrita ou distribuição geográfica justificam a complexidade.</span></div>
      </div>
    </AcademicSlide>
  );
}

function ConsistencyModelsSlide() {
  const models: Concept[] = [
    { icon: Lock, label: "FORTE", title: "Leitura reflete a ordem global", text: "Após um write confirmado, uma leitura válida observa esse write ou um estado posterior." },
    { icon: UserRound, label: "READ-YOUR-WRITES", title: "O cliente vê suas próprias mudanças", text: "Outros clientes podem observar versões anteriores por algum tempo.", tone: "blue" },
    { icon: GitBranch, label: "CAUSAL", title: "Causas precedem efeitos", text: "Operações relacionadas mantêm ordem; operações independentes podem divergir temporariamente.", tone: "amber" },
    { icon: RefreshCcw, label: "EVENTUAL", title: "Réplicas convergem sem novas escritas", text: "Não define quão rápido nem qual versão uma leitura imediata receberá.", tone: "neutral" },
  ];
  return (
    <AcademicSlide title="Modelos de consistência definem o que o cliente observa" section="distribuidos">
      <div className={`${styles.body} ${styles.consistencyBody}`}>
        <ConceptCards items={models} columns={4} />
        <div className={styles.consistencyRule}><Database /><span>Consistência não é sinônimo de replicação. Duas cópias podem existir e ainda oferecer garantias muito diferentes para leituras concorrentes.</span></div>
      </div>
    </AcademicSlide>
  );
}

function RaftSlide() {
  return (
    <AcademicSlide title="Raft: consenso para escolher uma única autoridade" section="distribuidos">
      <div className={`${styles.body} ${styles.raftBody}`}>
        <section className={styles.raftCluster}>
          <div className={styles.raftLeader}><Database /><span>LEADER</span><b>Termo 8</b><small>recebe comandos e replica o log</small></div>
          <ArrowRight /><div className={styles.raftFollower}><Database /><span>FOLLOWER</span><b>Termo 8</b><small>confirma entradas</small></div>
          <ArrowRight /><div className={styles.raftFollower}><Database /><span>FOLLOWER</span><b>Termo 8</b><small>confirma entradas</small></div>
        </section>
        <div className={styles.raftSteps}>
          <section><span>1</span><b>Eleição</b><p>Se o leader deixa de responder, membros iniciam uma eleição em um termo maior.</p></section>
          <section><span>2</span><b>Replicação</b><p>O leader ordena comandos em seu log e os envia aos followers.</p></section>
          <section><span>3</span><b>Commit</b><p>Uma entrada fica comprometida quando alcança o quorum exigido pelo algoritmo.</p></section>
          <section><span>4</span><b>Aplicação</b><p>Cada membro aplica entradas comprometidas na mesma ordem à máquina de estados.</p></section>
        </div>
      </div>
    </AcademicSlide>
  );
}

function CapSlide() {
  return (
    <AcademicSlide title="CAP só se aplica quando há partição" section="distribuidos">
      <div className={`${styles.body} ${styles.capBody}`}>
        <section className={styles.partitionScenario}><div><Globe2 /><b>Região A</b><small>continua saudável</small></div><div className={styles.brokenLink}><Split /><span>mensagens não atravessam</span></div><div><Globe2 /><b>Região B</b><small>continua saudável</small></div></section>
        <div className={styles.capChoices}>
          <section><Lock /><span>PRIORIZAR CONSISTÊNCIA</span><b>Recusar ou bloquear operações sem quorum</b><p>Evita duas autoridades, mas reduz disponibilidade durante a partição.</p></section>
          <section><Zap /><span>PRIORIZAR DISPONIBILIDADE</span><b>Aceitar operações dos dois lados</b><p>Responde a todos, mas precisa admitir divergência e reconciliação posterior.</p></section>
        </div>
        <div className={styles.capRule}><TriangleAlert /><span>CAP não significa escolher duas letras para o sistema inteiro. A decisão aparece por operação e somente quando a comunicação necessária está particionada.</span></div>
      </div>
    </AcademicSlide>
  );
}

function RpoRtoSlide() {
  return (
    <AcademicSlide title="RPO e RTO transformam risco em requisito" section="distribuidos">
      <div className={`${styles.body} ${styles.rpoBody}`}>
        <section className={styles.metricCard}><FileClock /><span>RPO</span><b>Quanto dado pode ser perdido?</b><p>Mede a distância aceitável entre o último estado recuperável e o instante da falha.</p><strong>Exemplo: RPO 5 min</strong></section>
        <section className={styles.metricCard}><Clock3 /><span>RTO</span><b>Quanto tempo o serviço pode ficar indisponível?</b><p>Mede o prazo para detectar, decidir, recuperar dependências e voltar a atender.</p><strong>Exemplo: RTO 15 min</strong></section>
        <div className={styles.rpoQuestions}>
          <Definition term="RPO zero">Qual cópia remota precisa participar do ACK e como ela é protegida de corrupção ou exclusão?</Definition>
          <Definition term="RTO baixo">Quais etapas são automáticas, quanto cada uma leva e com que frequência o failover é testado?</Definition>
          <Definition term="Custo">Capacidade ociosa, replicação síncrona, automação e testes são parte do preço do contrato.</Definition>
        </div>
      </div>
    </AcademicSlide>
  );
}

type ExamQuestion = {
  source: string;
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
    source: "ENADE 2021",
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
      "FILO não fornece garantia de deadline e pode adiar tarefas antigas indefinidamente.",
      "Rate Monotonic é associado a tarefas periódicas de tempo real, não a processamento em lote.",
      "Shortest Job First reduz espera média, mas não identifica necessariamente a tarefa aguardada pelo usuário.",
      "Round-robin favorece responsividade geral, mas não fornece por si só garantias rígidas de tempo real.",
      "Prioridades permitem favorecer tarefas interativas e reduzir a latência percebida.",
    ],
    connection: "Hypervisores e Nodes Kubernetes também escalonam entidades concorrentes sobre CPU física finita.",
  },
  {
    source: "FGV 2024",
    id: "60",
    title: "Hypervisor tipo 1",
    prompt: "Um monitor de máquina virtual, também denominado hypervisor tipo 1, é uma abordagem de virtualização que:",
    alternatives: [
      "usa um sistema operacional hospedeiro para fornecer todos os drivers de E/S.",
      "executa diretamente sobre o hardware, sem depender de um sistema operacional hospedeiro subjacente.",
      "usa o sistema operacional e o sistema de arquivos do host para criar processos e armazenar arquivos.",
      "depende das abstrações de um sistema operacional subjacente para executar instruções privilegiadas.",
      "exige sistemas operacionais iguais no host e nas máquinas virtuais convidadas.",
    ],
    answer: "B",
    answerLabel: "Execução bare metal",
    reasoning: [
      "A alternativa A descreve dependência típica de um hypervisor hospedado, do tipo 2.",
      "Um hypervisor tipo 1 controla o hardware diretamente e oferece recursos virtuais aos guests.",
      "Criar VMs como processos de um sistema operacional host caracteriza a abordagem hospedada.",
      "O tipo 1 não depende das abstrações de um sistema operacional host para controlar instruções privilegiadas.",
      "Guests podem executar sistemas operacionais diferentes entre si e em relação ao software de gerenciamento.",
    ],
    connection: "Esse é o modelo que sustenta a maior parte da virtualização de servidores em datacenters e provedores de cloud.",
    note: "Fonte: FGV, Ministério da Fazenda/STN, Auditor Federal de Finanças e Controle, área de TI, 2024, questão 60.",
  },
  {
    source: "ENADE 2021",
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
      "II confunde quantidade de recursos com duração contratada; elasticidade ajusta capacidade à demanda.",
      "III é restritiva demais: a infraestrutura comunitária pode ser operada pelas organizações, por terceiros ou por uma combinação.",
      "IV corresponde ao contrato de IaaS: controle lógico da VM sem administração do datacenter.",
    ],
    connection: "O seminário aprofunda as camadas que a definição de IaaS normalmente esconde: hypervisor, rede, storage e failure domains.",
    note: "A resolução segue o gabarito oficial do ENADE 2021 e a definição de cloud comunitária usada pelo exame.",
  },
  {
    source: "ENADE 2021",
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
      "Falhas parciais fazem parte do modelo: alguns nós podem continuar enquanto outro falha.",
      "Middleware e protocolos existem justamente para esconder heterogeneidade.",
      "Escalabilidade é a capacidade de crescer em carga, dados ou geografia mediante adição de recursos.",
      "Concorrência exige controle; transparência apenas oculta detalhes de distribuição.",
    ],
    connection: "Autoscaling adiciona capacidade, mas disponibilidade só melhora quando os recursos atravessam o failure domain correto.",
  },
];

function ExamQuestionSlide({ question }: { question: ExamQuestion }) {
  return (
    <AcademicSlide title={`${question.source}: questão ${question.id}`} section="fechamento">
      <div className={`${styles.body} ${styles.questionBody}`}>
        <section className={styles.questionPrompt}>
          <span>{question.title}</span>
          <h2>{question.prompt}</h2>
          {question.statements && <div className={styles.statementList}>{question.statements.map((statement) => <p key={statement}>{statement}</p>)}</div>}
          <div className={styles.questionInstruction}><UserRound /><span>Escolha uma alternativa e prepare uma justificativa para discutir com a turma.</span></div>
        </section>
        <div className={styles.alternatives}>{question.alternatives.map((alternative, index) => <div key={alternative}><b>{String.fromCharCode(65 + index)}</b><span>{alternative}</span></div>)}</div>
        <SourceNote>{question.note ?? `Fonte: ${question.source}, prova de Ciência da Computação. Enunciado condensado para projeção; resolução no próximo slide.`}</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function ExamResolutionSlide({ question }: { question: ExamQuestion }) {
  return (
    <AcademicSlide title={`Resolução: ${question.title}`} section="fechamento">
      <div className={`${styles.body} ${styles.resolutionBody}`}>
        <section className={styles.answerPanel}><span>GABARITO</span><strong>{question.answer}</strong><b>{question.answerLabel}</b></section>
        <div className={styles.reasoningList}>{question.reasoning.map((reason, index) => <section key={reason}><span>{index + 1}</span><p>{reason}</p></section>)}</div>
        <div className={styles.examConnection}><Cloud /><div><b>Conexão com o seminário</b><p>{question.connection}</p></div></div>
      </div>
    </AcademicSlide>
  );
}

function DiscussionSlide() {
  return (
    <AcademicSlide title="Roda de discussão: qual requisito deve ser renegociado?" section="fechamento">
      <div className={`${styles.body} ${styles.discussionBody}`}>
        <section className={styles.discussionScenario}><span>CENÁRIO</span><h2>Uma fintech brasileira precisa sobreviver à perda completa de uma região.</h2><ul><li>95% das operações são leituras; 5% alteram saldo.</li><li>Meta comercial: RTO de 60 segundos e nenhuma transação perdida.</li><li>Escritas não podem ganhar mais de 80 ms no caminho normal.</li><li>O orçamento permite duas regiões, mas não capacidade plena duplicada.</li></ul></section>
        <div className={styles.discussionPositions}>
          <section><ShieldCheck /><b>A. Active-passive síncrono</b><p>Prioriza RPO zero, mas adiciona latência remota e pode bloquear escritas durante partições.</p></section>
          <section><RefreshCcw /><b>B. Active-passive assíncrono</b><p>Preserva latência local, mas admite perda potencial e exige recuperação bem testada.</p></section>
          <section><Split /><b>C. Active-active seletivo</b><p>Distribui leituras e algumas operações, mas precisa declarar quais invariantes podem ser relaxadas.</p></section>
        </div>
        <div className={styles.discussionRules}><span><UserRound /> Formem três grupos e defendam uma opção.</span><span><Clock3 /> Dois minutos de preparação e um minuto de réplica.</span><span><Scale /> Toda defesa deve declarar RPO, RTO, latência, partições e custo.</span></div>
        <p className={styles.discussionPrompt}>Os quatro requisitos não cabem juntos no orçamento e na física da rede. Qual deles vocês renegociariam primeiro, e por quê?</p>
      </div>
    </AcademicSlide>
  );
}

export const priorityReplacements: Record<string, SlideDefinition> = {
  "Cloud por baixo das abstrações": { title: "Cloud computing: da virtualização à operação multi-região", duration: "1 min", maxStep: 0, section: "fundamentos", component: CoverSlide },
  "Memória e I/O": { title: "Como uma VM acessa memória e dispositivos", duration: "2 min", maxStep: 0, section: "virtualizacao", component: VmMemoryIoSlide },
  "VMs e containers": { title: "VMs e containers: fronteiras de isolamento diferentes", duration: "2 min", maxStep: 0, section: "virtualizacao", component: VmContainerBoundarySlide },
  "Por que orquestrar": { title: "O problema que o Kubernetes resolve", duration: "2 min", maxStep: 0, section: "kubernetes", component: KubernetesProblemSlide },
  "Reconciliação": { title: "Cinco conceitos básicos do Kubernetes", duration: "2 min", maxStep: 0, section: "kubernetes", component: KubernetesBasicsSlide },
  "Cadeia de objetos": { title: "Do manifesto ao Pod", duration: "2 min", maxStep: 0, section: "kubernetes", component: ManifestToPodSlide },
  "Arquitetura do cluster": { title: "O control plane mantém o estado desejado", duration: "2 min", maxStep: 0, section: "kubernetes", component: ControlPlaneSlide },
  "API Server e etcd": { title: "O que roda em cada Node", duration: "2 min", maxStep: 0, section: "kubernetes", component: NodeComponentsSlide },
  "Rede do Pod": { title: "Como um Pod entra na rede", duration: "2 min", maxStep: 0, section: "rede", component: PodNetworkSlide },
  "Service": { title: "Service e EndpointSlice", duration: "2 min", maxStep: 0, section: "rede", component: ServiceEndpointSliceSlide },
  "Caminho da requisição": { title: "Caminho completo de uma requisição", duration: "2 min", maxStep: 0, section: "rede", component: RequestPathSlide },
  "VPC": { title: "VPC, subnets e rotas", duration: "2 min", maxStep: 0, section: "rede", component: VpcSlide },
  "Primary, réplica e WAL": { title: "WAL: o registro das mudanças", duration: "2 min", maxStep: 0, section: "replicacao", component: WalSlide },
  "Receber, persistir e aplicar": { title: "Receber, persistir e aplicar", duration: "2 min", maxStep: 0, section: "replicacao", component: ReceivePersistApplySlide },
  "Replicação síncrona": { title: "ACK na replicação síncrona", duration: "2 min", maxStep: 0, section: "replicacao", component: SyncAckSlide },
  "Replicação assíncrona": { title: "Replicação assíncrona", duration: "2 min", maxStep: 0, section: "replicacao", component: AsyncReplicationSlide },
  "Lag e failover": { title: "Failover seguro e fencing", duration: "2 min", maxStep: 0, section: "replicacao", component: FailoverFencingSlide },
  "Quorum multi-AZ": { title: "Quorum entre zonas", duration: "2 min", maxStep: 0, section: "replicacao", component: QuorumMultiAzSlide },
  "Latência geográfica": { title: "RTT e distância geográfica", duration: "2 min", maxStep: 0, section: "distribuidos", component: RttSlide },
  "Active–passive e active–active": { title: "Active-passive e active-active", duration: "2 min", maxStep: 0, section: "distribuidos", component: ActiveModesSlide },
  "Modelos de consistência": { title: "Modelos de consistência", duration: "2 min", maxStep: 0, section: "distribuidos", component: ConsistencyModelsSlide },
  "Consenso e Raft": { title: "Raft e consenso", duration: "3 min", maxStep: 0, section: "distribuidos", component: RaftSlide },
  "CAP durante partição": { title: "CAP durante uma partição", duration: "2 min", maxStep: 0, section: "distribuidos", component: CapSlide },
  "RPO e RTO": { title: "RPO e RTO", duration: "2 min", maxStep: 0, section: "distribuidos", component: RpoRtoSlide },
};

export const overviewSlides: SlideDefinition[] = [
  { title: "Estrutura do seminário", duration: "1 min", maxStep: 0, section: "fundamentos", component: SeminarOverviewSlide },
];

export const additionalTopicSlides: SlideDefinition[] = [
  { title: "O que é uma microVM", duration: "2 min", maxStep: 0, section: "virtualizacao", component: MicroVmDefinitionSlide },
  { title: "Quando usar microVMs", duration: "2 min", maxStep: 0, section: "virtualizacao", component: MicroVmUseCasesSlide },
];

export const articleSlides: SlideDefinition[] = [
  ...papers.map((paper) => ({ title: `${paper.year}: ${paper.title}`, duration: "2 min", maxStep: 0, section: "kubernetes" as const, component: () => <PaperSlide paper={paper} /> })),
  { title: "Síntese da evolução dos artigos", duration: "2 min", maxStep: 0, section: "kubernetes", component: ArticleSynthesisSlide },
];

export const currentTechnologySlides: SlideDefinition[] = [
  { title: "Aposentadoria do Ingress-NGINX", duration: "2 min", maxStep: 0, section: "rede", component: IngressRetirementSlide },
  { title: "Gateway API", duration: "2 min", maxStep: 0, section: "rede", component: GatewayApiSlide },
];

export const examSlides: SlideDefinition[] = examQuestions.flatMap((question) => [
  { title: `${question.source}: questão ${question.id}`, duration: "2 min", maxStep: 0, section: "fechamento" as const, component: () => <ExamQuestionSlide question={question} /> },
  { title: `Resolução: ${question.title}`, duration: "2 min", maxStep: 0, section: "fechamento" as const, component: () => <ExamResolutionSlide question={question} /> },
]);

export const discussionSlide: SlideDefinition = {
  title: "Roda de discussão",
  duration: "7 min",
  maxStep: 0,
  section: "fechamento",
  component: DiscussionSlide,
};
