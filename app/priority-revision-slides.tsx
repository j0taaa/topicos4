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
      </div>
    </AcademicSlide>
  );
}

function VmMemoryIoSlide() {
  return (
    <AcademicSlide title="Como uma VM acessa memória e dispositivos" section="virtualizacao">
      <div className={`${styles.body} ${styles.memoryIoBody}`}>
        <section className={styles.pathPanel}>
          <header><Cpu /><div><span>MEMÓRIA</span><b>Tradução em dois níveis</b></div></header>
          <div className={styles.addrChain}>
            <div><b>Endereço virtual</b><small>visto pelo processo dentro da VM</small></div>
            <div className={styles.addrHop}>1ª tradução · tabela de páginas do kernel convidado</div>
            <div><b>Endereço físico do guest</b><small>a memória que a VM acredita possuir</small></div>
            <div className={styles.addrHop}>2ª tradução · EPT / NPT</div>
            <div><b>Endereço físico do host</b><small>onde o dado realmente reside</small></div>
          </div>
          <div className={styles.pathNote}>
            <b>O que é EPT/NPT?</b>
            <span>Uma segunda tabela de páginas, criada pelo hypervisor e percorrida <em>pelo próprio processador</em> (Intel: EPT · AMD: NPT). Sem ela, cada acesso do guest precisaria ser traduzido por software; com ela, a segunda tradução acontece em hardware, quase sem custo extra por acesso.</span>
          </div>
        </section>
        <section className={`${styles.pathPanel} ${styles.ioPanel}`}>
          <header><HardDrive /><div><span>ENTRADA E SAÍDA</span><b>Dois modos de acesso ao dispositivo</b></div></header>
          <div className={styles.ioModes}>
            <div className={styles.ioMode}>
              <Monitor />
              <b>Dispositivo emulado</b>
              <span>COMPATIBILIDADE</span>
              <small>O hypervisor intercepta e imita hardware tradicional; qualquer guest funciona, ao custo de mais trocas de contexto e cópias.</small>
            </div>
            <div className={styles.ioMode}>
              <Braces />
              <b>virtio · paravirtualizado</b>
              <span>DESEMPENHO</span>
              <small>O guest sabe que está virtualizado e coopera por filas compartilhadas: menos interceptações no caminho de disco e rede.</small>
            </div>
          </div>
        </section>
        <div className={styles.useCaseRule}><Gauge /><span>CPU, memória e I/O percorrem caminhos diferentes no host. O overhead de uma VM não é um único número: depende do perfil da carga.</span></div>
      </div>
    </AcademicSlide>
  );
}

function VmContainerBoundarySlide() {
  return (
    <AcademicSlide title="VMs e containers: fronteiras de isolamento diferentes" section="virtualizacao">
      <div className={`${styles.body} ${styles.compareBody}`}>
        <div className={styles.slideIntro}>
          <p className={styles.lead}>A VM virtualiza a máquina; o container virtualiza o ambiente. Ambos isolam workloads no mesmo hardware, mas desenham a fronteira em lugares diferentes.</p>
          <p className={styles.supportText}>Na VM, a fronteira inclui um kernel convidado completo: boot de segundos, memória para outro sistema operacional e atualizações próprias, em troca de isolamento forte e kernels distintos por workload. No container, a fronteira é o próprio processo, confinado por mecanismos do kernel do host: sobe em milissegundos e empilha centenas de instâncias por máquina, mas uma vulnerabilidade no kernel compartilhado afeta todos os containers ao mesmo tempo. Na cloud, as técnicas se combinam: containers rodando dentro de VMs, com a VM separando tenants e o container empacotando a aplicação.</p>
        </div>
        <div className={styles.compareExtra}>
          <section className={styles.stackCard}>
            <header><Server /><div><span>MÁQUINA VIRTUAL</span><b>Outro kernel</b></div></header>
            <div className={styles.stack}><i>Aplicação</i><i>Bibliotecas</i><i className={styles.kernelLayer}>Kernel convidado</i><i>Hardware virtual</i><i>Hypervisor</i></div>
            <div className={styles.stackAttrs}>
              <div><b>Boot</b><span>segundos a minutos</span></div>
              <div><b>Memória</b><span>SO convidado completo</span></div>
              <div><b>Fronteira</b><span>kernels independentes</span></div>
            </div>
          </section>
          <section className={`${styles.stackCard} ${styles.containerStackCard}`}>
            <header><Container /><div><span>CONTAINER</span><b>Kernel compartilhado</b></div></header>
            <div className={styles.stack}><i>Aplicação</i><i>Bibliotecas</i><i className={styles.kernelLayer}>Kernel do host</i><i>Container runtime</i></div>
            <div className={styles.stackAttrs}>
              <div><b>Boot</b><span>milissegundos</span></div>
              <div><b>Memória</b><span>processo e bibliotecas</span></div>
              <div><b>Fronteira</b><span>processos no mesmo kernel</span></div>
            </div>
          </section>
        </div>
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
  const stats = [
    { value: "~125 ms", label: "para inicializar uma microVM do zero (Firecracker)" },
    { value: "~5 MiB", label: "memória adicional por microVM ativa" },
    { value: "150 000", label: "microVMs simultâneas em um único host, no experimento do paper" },
  ];
  return (
    <AcademicSlide title="MicroVM: uma VM reduzida para workloads efêmeros" section="virtualizacao">
      <div className={`${styles.body} ${styles.microVmBody}`}>
        <div className={styles.slideIntro}>
          <p className={styles.lead}>Uma microVM é uma máquina virtual reduzida ao essencial: kernel próprio, memória e poucos dispositivos, sem BIOS, sem USB e sem placas emuladas.</p>
          <p className={styles.supportText}>A ideia é manter a fronteira de isolamento por hardware que o container não oferece, descartando tudo que um workload curto e descartável não usa. Os números do Firecracker, o VMM criado pela Amazon para o AWS Lambda e aberto em 2018, mostram o resultado: boot perto do de um container, overhead de memória de poucos mebibytes e densidade de centenas de milhares de instâncias por host.</p>
        </div>
        <div className={`${styles.compareExtra} ${styles.microVmChoices}`}>
          <ConceptCards items={choices} columns={3} />
        </div>
        <div className={styles.microVmStats}>
          {stats.map((stat) => <div key={stat.value}><b>{stat.value}</b><span>{stat.label}</span></div>)}
        </div>
      </div>
    </AcademicSlide>
  );
}

function MicroVmUseCasesSlide() {
  return (
    <AcademicSlide title="Quando usar microVMs" section="virtualizacao">
      <div className={`${styles.body} ${styles.useCaseBody}`}>
        <div className={styles.slideIntro}>
          <p className={styles.lead}>A escolha entre container e microVM é uma decisão de modelo de ameaça, não de preferência tecnológica.</p>
          <p className={styles.supportText}>Quando o código que executa não é plenamente confiável, porque vem de outros tenants, de usuários externos ou de pipelines arbitrários, o isolamento por processo é frágil demais, e uma VM por instância se justifica mesmo custando mais memória. Quando o ambiente é controlado, o código é o mesmo por semanas e a densidade importa, containers oferecem a melhor relação entre custo e segurança suficiente.</p>
        </div>
        <div className={styles.compareExtra}>
          <section className={styles.useCaseColumn}>
            <header><ShieldCheck /><div><span>FAZ SENTIDO</span><b>O código não é plenamente confiável</b></div></header>
            <ul>
              <li><b>Funções serverless de vários clientes</b><span>cada invocação pode vir de um tenant diferente.</span></li>
              <li><b>Código enviado por usuários</b><span>sandbox exige fronteira de hardware, não de processo.</span></li>
              <li><b>Executores de CI compartilhados</b><span>pipelines rodam código arbitrário; evita vazamento entre builds.</span></li>
              <li><b>Plataformas multi-tenant</b><span>fronteira por VM com custo previsível por instância.</span></li>
            </ul>
          </section>
          <section className={`${styles.useCaseColumn} ${styles.mutedUseCase}`}>
            <header><Scale /><div><span>PODE SER EXCESSO</span><b>O ambiente é controlado</b></div></header>
            <ul>
              <li><b>Serviços internos de um único tenant</b><span>código confiável não justifica uma VM por instância.</span></li>
              <li><b>Workloads longos e estáveis</b><span>tempo de boot importa pouco quando o processo vive por semanas.</span></li>
              <li><b>Densidade como prioridade</b><span>containers empilham mais instâncias por host.</span></li>
              <li><b>Operação sem necessidade clara</b><span>cada microVM adiciona kernel, atualização e monitoração.</span></li>
            </ul>
          </section>
        </div>
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
        <p className={styles.supportText}>Com dez máquinas e cinquenta containers, perguntas operacionais aparecem toda hora: em qual máquina cabe a nova réplica? E se aquela máquina reiniciar? Quem reencaminha o tráfego enquanto o substituto sobe? Como distribuir uma nova versão sem derrubar o serviço? Responder isso com scripts e intervenção manual não escala: cada incidente depende de uma pessoa disponível. Kubernetes transforma essas perguntas em código: a resposta é declarada uma vez, e control loops a aplicam continuamente.</p>
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
        <div className={styles.slideIntro}>
          <p className={styles.lead}>Toda a conversa sobre Kubernetes gira em torno de cinco palavras.</p>
          <p className={styles.supportText}>Cluster é o conjunto inteiro: as máquinas de trabalho (Nodes) mais a camada de controle. O Pod é a menor unidade que o Kubernetes cria e destrói: um ou mais containers que sobem juntos, dividem rede e morrem juntos. Ninguém executa um Pod diretamente em produção: declara-se um Deployment, que diz qual versão e quantas réplicas devem existir. Como Pods nascem e morrem com IPs novos, o Service oferece o nome e o endereço estáveis que os clientes usam. Os próximos slides mostram esses objetos conversando.</p>
        </div>
        <ConceptCards items={basics} columns={5} />
        <div className={styles.relationLine}><GitBranch /><span>Deployment cria e substitui Pods; Pods rodam em Nodes; Service mantém um endereço estável para os Pods selecionados.</span></div>
      </div>
    </AcademicSlide>
  );
}

function ManifestToPodSlide() {
  const steps = [
    { icon: Package, title: "Manifesto", detail: "O usuário envia um YAML declarando um Deployment com 3 réplicas." },
    { icon: Cloud, title: "API server", detail: "Autentica a requisição, valida o objeto e o registra.", tone: "blue" },
    { icon: Database, title: "etcd", detail: "Guarda o estado desejado de forma persistente e consistente.", tone: "neutral" },
    { icon: Search, title: "Scheduler", detail: "Observa Pods sem Node, filtra candidatos e escolhe uma máquina para cada um.", tone: "amber" },
    { icon: Server, title: "kubelet", detail: "Agente do Node vê o Pod atribuído a ele e converge a máquina.", tone: "blue" },
    { icon: Container, title: "Pod", detail: "O runtime sobe os containers, que passam a ser supervisionados como processos.", tone: "green" },
  ] as Array<{ icon: LucideIcon; title: string; detail: string; tone?: Tone }>;
  return (
    <AcademicSlide title="Do manifesto ao Pod" section="kubernetes">
      <div className={`${styles.body} ${styles.pipelineBody}`}>
        <p className={styles.supportText}>Quando alguém aplica um manifesto, nenhum componente comanda os outros: o API Server valida e registra o pedido, o estado desejado fica persistido no etcd, e cada peça restante observa a API e reage à sua maneira. O scheduler decide em qual Node cada Pod deve rodar; o kubelet daquele Node, vendo o Pod atribuído a si, pede ao runtime que suba os containers. O usuário não acompanha esses passos: ele declara o resultado e o cluster converge.</p>
        <div className={styles.pipelineLayout}>
          <ol className={styles.pipelineSteps}>
            {steps.map(({ icon: Icon, title, detail, tone = "green" }, index) => (
              <li key={title} className={styles[tone]}>
                <span>{index + 1}</span>
                <Icon />
                <b>{title}</b>
                <small>{detail}</small>
              </li>
            ))}
          </ol>
          <aside className={styles.pipelineNotes}>
            <Definition term="Declarativo">O usuário descreve o resultado desejado, não uma sequência fixa de comandos.</Definition>
            <Definition term="Assíncrono">A API pode aceitar o objeto antes de o Pod existir. Controllers e agentes completam o trabalho depois.</Definition>
            <Definition term="Reconciliação">Se o Pod desaparecer, o sistema detecta a diferença e cria outro.</Definition>
            <div className={styles.useCaseRule}><Zap /><span>Nenhum componente conhece o caminho completo: cada um observa a API, faz a sua parte e registra o resultado.</span></div>
          </aside>
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
        <div className={styles.slideIntro}>
          <p className={styles.lead}>O control plane é o cérebro do cluster: ele não executa containers, apenas decide e registra.</p>
          <p className={styles.supportText}>Todos os componentes se comunicam pela API do API Server, nunca por conexões diretas entre si. O API Server valida cada requisição e grava o estado no etcd; os controllers observam esse estado e agem quando algo difere do declarado; o scheduler apenas decide, para cada Pod sem Node, onde ele deve rodar. Cada peça tem uma responsabilidade estreita, o que permite executar várias cópias de cada componente em máquinas diferentes para tolerar falhas.</p>
        </div>
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
        <section className={styles.nodeExplanation}>
          <p className={styles.lead}>O control plane escolhe o Node; os agentes locais transformam essa decisão em processos funcionando.</p>
          <p className={styles.nodeSummary}>Um Node não decide onde um Pod deve ir. Ele recebe a atribuição pela API, prepara os recursos, inicia os containers e informa continuamente se continuam saudáveis.</p>
          <div className={styles.nodeResponsibilities}>
            <section><Activity /><div><b>Kubelet</b><span>Compara o estado dos Pods atribuídos com o que está rodando, inicia ou reinicia processos e publica o status.</span></div></section>
            <section><Container /><div><b>Container runtime</b><span>Baixa imagens e cria processos isolados, como containerd ou CRI-O.</span></div></section>
            <section><Network /><div><b>Rede do Node</b><span>O plugin CNI cria interfaces, rotas e conectividade para cada Pod.</span></div></section>
          </div>
          <div className={styles.nodeNote}><ShieldCheck /><span>Se o Node desaparece, o control plane marca seus Pods como indisponíveis e tenta criá-los em outro Node.</span></div>
        </section>
        <section className={styles.nodeMachine}>
          <header><Server /><div><span>NODE DE TRABALHO</span><b>Onde o Pod é executado</b></div></header>
          <div className={styles.nodeLayers}>
            <section><Package /><div><b>Pods</b><small>workloads agendados para esta máquina</small></div></section>
            <section className={styles.nodeKubeletLayer}><Activity /><div><b>Kubelet</b><small>converge os Pods e publica o estado</small></div></section>
            <section><Container /><div><b>Container runtime</b><small>cria e supervisiona containers por meio da CRI</small></div></section>
            <section><Network /><div><b>Rede do Node</b><small>CNI, rotas, interfaces e regras de encaminhamento</small></div></section>
            <section><Cpu /><div><b>Sistema operacional</b><small>kernel, CPU, memória e dispositivos</small></div></section>
          </div>
        </section>
        <section className={styles.kubeletPanel}><Activity /><div><span>KUBELET</span><b>O agente local fecha o ciclo</b><p>Observa os Pods atribuídos ao Node, conversa com o runtime, monta volumes, executa probes e publica o estado da máquina para a API.</p></div></section>
      </div>
    </AcademicSlide>
  );
}

function PodNetworkSlide() {
  return (
    <AcademicSlide title="Como um Pod entra na rede" section="rede">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Um Pod não nasce conectado ao cluster. Ele recebe uma sandbox de rede própria, separada da máquina e dos demais Pods.</li>
          <li>Os containers que vivem dentro do mesmo Pod compartilham interfaces, rotas e portas. Por isso, podem conversar por <code>localhost</code>, mas não devem assumir que o IP do Pod será permanente.</li>
          <li>O runtime pede ao plugin CNI que conecte a sandbox à rede do Node. O plugin cria a interface virtual, instala as rotas e aplica o modelo de conectividade escolhido pelo cluster. O resultado é um IP alcançável, não uma identidade durável.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.verticalPath}>
            <section><Package /><div><b>Pod criado</b><small>recebe uma sandbox de rede</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.bluePath}><Network /><div><b>Network namespace</b><small>interfaces, rotas e portas próprias</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.amberPath}><Braces /><div><b>Plugin CNI</b><small>configura a interface e as rotas</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><Server /><div><b>Rede do Node</b><small>encaminha para o fabric do cluster</small></div></section>
          </div>
          <div className={styles.visualNote}><b>Contrato de rede</b><span>O Pod tem conectividade própria, mas seu endereço pode mudar quando ele for recriado.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function ServiceEndpointSliceSlide() {
  return (
    <AcademicSlide title="Service e EndpointSlice separam nome estável de Pods efêmeros" section="rede">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>O IP de um Pod é um detalhe temporário da execução. Se a instância morrer ou for movida para outro Node, o endereço muda.</li>
          <li>O cliente, porém, precisa continuar usando um nome que não dependa do ciclo de vida de cada réplica. O Service fornece esse nome e um endereço lógico estável para descoberta e conexão.</li>
          <li>O EndpointSlice mantém a lista dos Pods elegíveis naquele momento. Endpoints que perderam readiness saem da lista; substitutos entram quando estão prontos. A aplicação continua falando com o Service, não com os IPs individuais.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.serviceVisual}>
            <section className={styles.serviceStable}><Network /><span>SERVICE</span><b>api.default.svc</b><code>10.96.14.20:80</code><p>nome estável</p></section>
            <ArrowRight className={styles.serviceArrow} />
            <section className={styles.endpointPanel}>
              <header><GitBranch /><div><span>ENDPOINTSLICE</span><b>backends atuais</b></div></header>
              <div><i className={styles.readyDot}/><code>10.244.1.8:8080</code><small>ready</small></div>
              <div><i className={styles.readyDot}/><code>10.244.2.4:8080</code><small>ready</small></div>
              <div className={styles.terminatingEndpoint}><i/><code>10.244.3.7:8080</code><small>terminating</small></div>
            </section>
          </div>
          <div className={styles.visualNote}><RefreshCcw /><span>O control plane atualiza a lista; a rede encaminha apenas para os backends elegíveis.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function RequestPathSlide() {
  const hops: Array<[LucideIcon, string, string]> = [
    [UserRound, "Cliente", "DNS e conexão"],
    [Cloud, "Load balancer", "entrada da VPC"],
    [Route, "Gateway", "host, path e políticas"],
    [Network, "Service", "destino lógico"],
    [GitBranch, "EndpointSlice", "backend saudável"],
    [Package, "Pod", "aplicação responde"],
  ];
  return (
    <AcademicSlide title="Caminho completo de uma requisição" section="rede">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Uma requisição externa atravessa várias camadas antes de chegar ao processo. Cada camada tem uma responsabilidade e uma chance própria de falhar.</li>
          <li>O load balancer fornece a entrada da rede; o Gateway interpreta host, caminho, TLS e políticas; o Service traduz um nome estável em backends; o EndpointSlice informa quais Pods estão elegíveis.</li>
          <li>Por isso, “o Pod está saudável” é apenas uma parte do diagnóstico. DNS, balanceador, Gateway, Service, readiness e aplicação possuem estados diferentes e intervalos próprios de detecção.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.verticalPath}>
            {hops.map(([Icon, title, detail], index) => <div key={title} className={styles.pathStepGroup}><section><span>{index + 1}</span><Icon /><div><b>{title}</b><small>{detail}</small></div></section>{index < hops.length - 1 && <ArrowRight className={styles.verticalArrow}/>}</div>)}
          </div>
          <div className={styles.visualNote}><b>Diagnóstico</b><span>Um erro no caminho pode parecer uma falha da aplicação, mesmo quando o processo está respondendo.</span></div>
        </section>
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
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Uma VPC é um domínio lógico de rede criado por software sobre a infraestrutura do provedor.</li>
          <li>Ela define quais endereços podem existir, como subnets se conectam e quais fluxos são permitidos, sem criar uma rede física exclusiva para cada cliente. A separação é administrativa e lógica, não uma promessa de hardware dedicado.</li>
          <li>Subnets organizam endereços por zona ou função; tabelas de rotas escolhem o próximo salto; firewalls e grupos de segurança filtram o tráfego. Ter uma rota até o destino não significa ter permissão para usá-la.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.vpcVisual}`}>
          <ConceptCards items={items} columns={2} />
          <div className={styles.providerRow}><span>AWS VPC</span><span>Azure VNet</span><span>Google Cloud VPC</span><span>Huawei Cloud VPC</span></div>
          <p className={styles.providerNote}>O nome varia por provedor; o contrato central permanece: endereçamento, segmentação, roteamento e controle de acesso.</p>
        </section>
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
        <p className={styles.paperLead}>{paper.problem}</p>
        <div className={styles.paperDetails}>
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
        <div className={styles.articleSynthesisIntro}>
          <p className={styles.lead}>Os três artigos atacam gargalos diferentes da mesma pergunta: como transformar infraestrutura compartilhada em execução rápida, isolada e escalável?</p>
          <p className={styles.supportText}>Mesos separa a decisão global de recursos das decisões de cada framework. Firecracker reduz a unidade de isolamento para que workloads efêmeros possam subir com segurança. FaaSNet trata o caminho de distribuição das imagens, que se torna o gargalo quando milhares de runtimes precisam iniciar juntos. A evolução não elimina as camadas anteriores; acrescenta mecanismos onde a escala revela um novo limite.</p>
        </div>
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
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Ingress-NGINX é o controller mais usado para expor Services do cluster ao mundo externo: ele implementa o objeto Ingress, atuando como um proxy reverso baseado em NGINX que roteia tráfego HTTP/HTTPS para o Service correto conforme host e path.</li>
          <li>A partir desse ponto, novas vulnerabilidades, bugs e incompatibilidades deixam de ter uma correção oficial garantida. Um deployment existente pode continuar funcionando, mas passa a carregar um risco operacional crescente.</li>
          <li>A troca pelo Gateway API não é só mudar o nome: o objeto único do Ingress, cheio de annotations, é substituído por três papéis — GatewayClass, Gateway e HTTPRoute —, que separam infraestrutura e regras da aplicação. Annotations, TLS, timeouts e rewrites específicos do NGINX precisam ser reconstruídos como recursos explícitos e revalidados antes da migração.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.retirementVisual}`}>
          <div className={styles.retirementDate}><TriangleAlert /><span>24 MAR 2026</span><b>Fim do suporte oficial</b></div>
          <div className={styles.retirementPoints}>
            <Definition term="O que terminou">Novos releases, correções de bugs e atualizações para vulnerabilidades futuras.</Definition>
            <Definition term="O que continua">Deployments existentes podem continuar funcionando, sem manutenção upstream.</Definition>
          </div>
          <div className={styles.retirementAction}><Route /><span>Inventariar annotations, ConfigMaps, TLS, timeouts e rewrite antes de escolher um controller mantido.</span></div>
          <SourceNote>Fontes: Kubernetes Blog e confirmação de 24 de março de 2026.</SourceNote>
        </section>
      </div>
    </AcademicSlide>
  );
}

function GatewayApiSlide() {
  return (
    <AcademicSlide title="Gateway API separa infraestrutura e regras da aplicação" section="rede">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Gateway API divide a configuração em objetos com responsabilidades diferentes, em vez de concentrar tudo em um Ingress cheio de annotations.</li>
          <li>A equipe da plataforma controla a infraestrutura e as capacidades expostas. A equipe da aplicação declara apenas as rotas que está autorizada a usar, como hosts, caminhos e Services de destino.</li>
          <li>A separação melhora o contrato entre as equipes, mas não elimina diferenças entre controllers. Listeners, filtros, TLS e políticas precisam ser testados na implementação escolhida, especialmente durante a migração.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.gatewayVisual}`}>
          <div className={styles.verticalPath}>
            <section><Braces /><div><b>GatewayClass</b><small>controller e capacidades</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.bluePath}><Cloud /><div><b>Gateway</b><small>listeners e infraestrutura</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.amberPath}><Route /><div><b>HTTPRoute</b><small>hosts, paths e backends</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><Network /><div><b>Service</b><small>destino da aplicação</small></div></section>
          </div>
          <div className={styles.gatewayRoles}><section><span>PLATAFORMA</span><p>publica Gateways e capacidades</p></section><section><span>APLICAÇÃO</span><p>declara rotas para Services</p></section></div>
          <SourceNote>Fontes: documentação oficial do Gateway API e Ingress2Gateway 1.0.</SourceNote>
        </section>
      </div>
    </AcademicSlide>
  );
}

function WalSlide() {
  return (
    <AcademicSlide title="WAL: o registro das mudanças antes das páginas de dados" section="replicacao">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>O banco não precisa gravar a página inteira de dados a cada transação. Primeiro registra no <strong>Write-Ahead Log</strong> o que mudou, em uma sequência ordenada de registros.</li>
          <li>Quando o registro do WAL chega a armazenamento durável, o banco consegue confirmar a escrita mesmo que a página de dados ainda esteja apenas na memória. A página pode ser atualizada depois, em outro momento.</li>
          <li>Depois de uma falha, o banco lê o WAL e reaplica as mudanças confirmadas. Enviar essa mesma sequência para outra instância também é a base da replicação.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.verticalPath}>
            <section><Package /><div><b>Transação</b><small>altera dados em memória</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.bluePath}><FileClock /><div><b>Registro no WAL</b><small>descreve a mudança</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.amberPath}><HardDrive /><div><b>Flush do WAL</b><small>torna o log durável</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><Database /><div><b>Páginas de dados</b><small>podem ser gravadas depois</small></div></section>
          </div>
          <div className={styles.visualNote}><b>Regra do WAL</b><span>A mudança precisa estar durável antes de o banco depender da página de dados alterada.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function ReceivePersistApplySlide() {
  return (
    <AcademicSlide title="Receber, persistir e aplicar são etapas diferentes" section="replicacao">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Uma réplica pode ter recebido os bytes do WAL sem que eles sejam duráveis. Nesse ponto, uma queda do processo ou da máquina ainda pode apagar o trecho recebido.</li>
          <li>Persistir significa gravar o log em armazenamento que sobreviva ao processo. Aplicar é outra operação: a réplica reproduz o log e atualiza o estado que as leituras conseguem observar.</li>
          <li>Por isso, “a réplica confirmou” é uma frase incompleta. O significado do ACK depende de qual fronteira foi alcançada: memória, armazenamento durável ou estado aplicado.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.verticalPath}>
            <section><Database /><div><b>Primary</b><small>gera e envia o WAL</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.bluePath}><Network /><div><b>1. Receber</b><small>bytes chegam ao buffer</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.amberPath}><HardDrive /><div><b>2. Persistir</b><small>log gravado de forma durável</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><RefreshCcw /><div><b>3. Aplicar</b><small>estado visível é atualizado</small></div></section>
          </div>
          <div className={styles.visualNote}><TriangleAlert /><span>O ACK precisa declarar até qual etapa remota ele garante.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function SyncAckSlide() {
  return (
    <AcademicSlide title="O que o ACK garante na replicação síncrona" section="replicacao">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Na replicação síncrona, o sucesso entregue ao cliente depende de uma condição remota. O primary só responde depois que a réplica participante alcança a fronteira configurada.</li>
          <li>Se essa fronteira for o <strong>remote flush</strong>, a escrita confirmada existe de forma durável em outro failure domain. A perda do primary não elimina a única cópia do commit.</li>
          <li>A proteção tem custo: rede, filas e armazenamento remoto entram na latência. Se a réplica necessária estiver indisponível, a escrita pode bloquear ou falhar em vez de confirmar sem garantia.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.verticalPath}>
            <section><Package /><div><b>Cliente</b><small>envia COMMIT</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.bluePath}><Database /><div><b>Primary</b><small>persiste localmente</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.amberPath}><Network /><div><b>Réplica</b><small>faz remote flush</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><Check /><div><b>ACK</b><small>fronteira configurada foi alcançada</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><UserRound /><div><b>Resposta</b><small>commit concluído</small></div></section>
          </div>
          <div className={styles.visualNote}><b>Pergunta correta</b><span>Qual réplica participa do ACK e qual etapa ela precisa concluir?</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function AsyncReplicationSlide() {
  return (
    <AcademicSlide title="Na replicação assíncrona, o cliente não espera a cópia remota" section="replicacao">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Na replicação assíncrona, o primary confirma depois da persistência local. O envio e a gravação remota acontecem fora do caminho crítico da resposta ao cliente.</li>
          <li>Isso reduz a latência e permite continuar escrevendo mesmo quando a réplica está lenta. Em troca, existe uma janela em que o commit confirmado só existe no primary.</li>
          <li>Se o primary falhar antes de o trecho final do WAL chegar à réplica promovida, dados já confirmados podem ser perdidos. O RPO depende do lag observado e do procedimento de failover.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <div className={styles.verticalPath}>
            <section><Database /><div><b>1. Primary persiste</b><small>commit local</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.bluePath}><Check /><div><b>2. Cliente recebe sucesso</b><small>latência menor</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section className={styles.amberPath}><FileClock /><div><b>3. WAL é enviado</b><small>depois da resposta</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><RefreshCcw /><div><b>4. Réplica aplica</b><small>surge o lag</small></div></section>
          </div>
          <div className={styles.visualNote}><TriangleAlert /><span>Entre a resposta e a aplicação remota existe uma janela de possível perda.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function FailoverFencingSlide() {
  return (
    <AcademicSlide title="Failover seguro exige fencing" section="replicacao">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Detectar que o primary não responde não prova que ele parou. Uma partição pode esconder o primary antigo da equipe enquanto ele continua aceitando escritas.</li>
          <li>Promover a réplica sem bloquear a autoridade antiga cria dois primaries. Cada lado aceita operações e produz um histórico diferente, o chamado <strong>split-brain</strong>.</li>
          <li>Fencing corta a capacidade do nó antigo escrever. Pode desligar a VM, revogar o volume ou remover credenciais. Leases e quorum ajudam a garantir que apenas uma autoridade permaneça válida.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.failoverVisual}`}>
          <div className={styles.failoverCompare}>
            <section className={styles.oldPrimary}><Database /><span>PRIMARY ANTIGO</span><b>continua escrevendo?</b></section>
            <div className={styles.partition}><Split /><b>partição</b></div>
            <section className={styles.promotedReplica}><Database /><span>RÉPLICA PROMOVIDA</span><b>também escreve</b></section>
          </div>
          <div className={styles.visualNote}><ShieldCheck /><span>Fencing precisa acontecer antes de aceitar a réplica como única autoridade.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function QuorumMultiAzSlide() {
  return (
    <AcademicSlide title="Quorum distribui autoridade entre zonas" section="replicacao">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Quorum é uma regra de maioria. Com três membros, duas respostas bastam para confirmar uma entrada e escolher uma autoridade.</li>
          <li>Distribuir os membros por três zonas faz com que a perda de uma zona ainda deixe dois votos. As cópias precisam estar em failure domains diferentes para que essa matemática corresponda a falhas independentes.</li>
          <li>Quorum não cria capacidade nem elimina latência. As zonas restantes precisam absorver a carga, e a confirmação ainda precisa alcançar membros suficientes antes de responder.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.quorumVisual}`}>
          <div className={styles.azGrid}>
            <section><span>AZ A</span><Database /><b>Nó 1</b><small>voto</small></section>
            <section><span>AZ B</span><Database /><b>Nó 2</b><small>voto</small></section>
            <section><span>AZ C</span><Database /><b>Nó 3</b><small>voto</small></section>
          </div>
          <div className={styles.quorumEquation}><b>3 membros</b><span>maioria = 2</span><strong>uma AZ pode falhar</strong></div>
          <div className={styles.visualNote}><Scale /><span>Placement, capacidade e distância entre zonas fazem parte do quorum real.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function RttSlide() {
  return (
    <AcademicSlide title="RTT e o custo físico da distância" section="distribuidos">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>RTT é o tempo para uma mensagem ir até o destino e uma resposta voltar. Ele transforma distância física em latência observável pela aplicação.</li>
          <li>Se uma região remota participa do ACK, pelo menos uma viagem de rede e o trabalho remoto entram no caminho crítico de cada escrita. Paralelismo reduz filas, mas não elimina a propagação.</li>
          <li>Por isso, muitas arquiteturas confirmam dentro da região e replicam entre regiões de forma assíncrona. O desenho aceita RPO maior para não colocar a geografia inteira em cada commit.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual}`}>
          <section className={styles.regionPair}><div><Globe2 /><span>REGIÃO A</span><b>São Paulo</b></div><div className={styles.rttLine}><ArrowRight /><span>RTT</span><ArrowRight /></div><div><Globe2 /><span>REGIÃO B</span><b>outra geografia</b></div></section>
          <div className={styles.visualNote}><b>Limite físico</b><span>Software pode reduzir filas e cópias, mas não remove distância, propagação ou falhas de enlaces.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function ActiveModesSlide() {
  return (
    <AcademicSlide title="Active-passive e active-active resolvem problemas diferentes" section="distribuidos">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Em active-passive, uma região recebe as escritas e a outra mantém uma cópia pronta para promoção. A autoridade é simples no caminho normal, mas o failover precisa bloquear a origem antiga.</li>
          <li>Em active-active, mais de uma região aceita operações. Usuários podem ter menor latência local, mas conflitos, invariantes e partições precisam de tratamento explícito por tipo de dado.</li>
          <li>Active-active não é uma versão superior de active-passive. Só compensa quando latência ou disponibilidade regional justificam a complexidade de múltiplas autoridades.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.modesVisual}`}>
          <div className={styles.modeCompare}>
            <section className={styles.modeCard}><header><RefreshCcw /><div><span>ACTIVE-PASSIVE</span><b>Uma região escreve</b></div></header><ul><li>autoridade simples</li><li>promover e bloquear origem</li><li>standby pode ser parcial</li></ul></section>
            <section className={`${styles.modeCard} ${styles.activeActiveCard}`}><header><Split /><div><span>ACTIVE-ACTIVE</span><b>Mais de uma região escreve</b></div></header><ul><li>menor latência local</li><li>conflitos explícitos</li><li>maior complexidade</li></ul></section>
          </div>
          <div className={styles.visualNote}><Scale /><span>O modo depende do contrato de latência, disponibilidade e consistência.</span></div>
        </section>
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
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Consistência descreve o que uma leitura pode observar depois de uma escrita. Replicação apenas diz que existem cópias; não define qual versão cada cliente verá.</li>
          <li>Consistência forte faz uma escrita confirmada aparecer para leituras posteriores. Read-your-writes garante esse comportamento para o próprio cliente; consistência causal preserva a ordem entre operações relacionadas.</li>
          <li>Consistência eventual aceita divergência temporária e promete convergência quando novas escritas cessam. Ela pode reduzir coordenação, mas transfere parte da complexidade para a aplicação.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.consistencyVisual}`}>
          <ConceptCards items={models} columns={2} />
          <div className={styles.visualNote}><Database /><span>Duas cópias podem existir e ainda oferecer garantias muito diferentes para leituras concorrentes.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function RaftSlide() {
  return (
    <AcademicSlide title="Raft: consenso para escolher uma única autoridade" section="distribuidos">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>Raft resolve um problema específico: vários membros precisam concordar sobre uma única ordem de comandos, mesmo quando alguns falham ou ficam isolados.</li>
          <li>Um leader recebe comandos e replica o log. Uma entrada só é comprometida depois de alcançar a maioria; então todos os membros aplicam a mesma sequência à máquina de estados.</li>
          <li>Se o leader falha, os membros elegem outro em um termo maior. As regras de eleição impedem que um membro com histórico atrasado se torne autoridade e apague decisões já comprometidas.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.raftVisual}`}>
          <div className={styles.verticalPath}>
            <section className={styles.bluePath}><Database /><div><b>LEADER</b><small>recebe comandos e replica o log</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><Database /><div><b>FOLLOWER A</b><small>confirma entradas do termo 8</small></div></section>
            <ArrowRight className={styles.verticalArrow} />
            <section><Database /><div><b>FOLLOWER B</b><small>confirma entradas do termo 8</small></div></section>
          </div>
          <div className={styles.visualNote}><Check /><span>Maioria confirma; todos aplicam a mesma ordem.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function CapSlide() {
  return (
    <AcademicSlide title="CAP só se aplica quando há partição" section="distribuidos">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li>CAP descreve o comportamento durante uma partição de rede, quando dois grupos continuam vivos, mas não conseguem trocar as mensagens necessárias para coordenar.</li>
          <li>Priorizar consistência significa recusar ou bloquear operações sem quorum. O sistema evita duas autoridades, mas fica indisponível para parte dos clientes naquele intervalo.</li>
          <li>Priorizar disponibilidade significa aceitar operações dos dois lados. O sistema responde mais, mas precisa admitir divergência e reconciliar conflitos depois. A escolha pode variar por operação.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.capVisual}`}>
          <section className={styles.partitionScenario}><div><Globe2 /><b>Região A</b><small>continua saudável</small></div><div className={styles.brokenLink}><Split /><span>mensagens bloqueadas</span></div><div><Globe2 /><b>Região B</b><small>continua saudável</small></div></section>
          <div className={styles.capChoices}>
            <section><Lock /><span>CONSISTÊNCIA</span><b>bloquear sem quorum</b><p>evita duas autoridades</p></section>
            <section><Zap /><span>DISPONIBILIDADE</span><b>aceitar dos dois lados</b><p>reconcilia depois</p></section>
          </div>
          <div className={styles.visualNote}><TriangleAlert /><span>CAP não é uma escolha global permanente; aparece quando a comunicação necessária está particionada.</span></div>
        </section>
      </div>
    </AcademicSlide>
  );
}

function RpoRtoSlide() {
  return (
    <AcademicSlide title="RPO e RTO transformam risco em requisito" section="distribuidos">
      <div className={`${styles.body} ${styles.classicSplit}`}>
        <ul className="bullet-list">
          <li><strong>RPO</strong> define quanto estado o negócio aceita perder. RPO de cinco minutos não significa que a falha será detectada em cinco minutos; significa que o estado recuperável pode estar até cinco minutos atrasado.</li>
          <li><strong>RTO</strong> define quanto tempo o serviço pode ficar indisponível. Ele inclui detectar a falha, decidir, promover dados, recuperar dependências, atualizar rotas e validar readiness.</li>
          <li>RPO baixo exige cópia remota e uma política de confirmação adequada. RTO baixo exige automação, capacidade pronta e testes frequentes. Os dois são contratos operacionais, não apenas campos de configuração.</li>
        </ul>
        <section className={`visual-panel ${styles.classicVisual} ${styles.rpoVisual}`}>
          <section className={styles.metricCard}><FileClock /><span>RPO</span><b>quanto dado pode ser perdido?</b><p>distância entre o último estado recuperável e a falha</p><strong>Exemplo: RPO 5 min</strong></section>
          <section className={styles.metricCard}><Clock3 /><span>RTO</span><b>quanto tempo pode ficar indisponível?</b><p>detectar, decidir, recuperar e voltar a atender</p><strong>Exemplo: RTO 15 min</strong></section>
          <div className={styles.visualNote}><Scale /><span>Capacidade ociosa, replicação, automação e testes fazem parte do custo do contrato.</span></div>
        </section>
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
  conceptNotes: string[];
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
    conceptNotes: [
      "FILO executa primeiro a tarefa que chegou por último; não garante prazo.",
      "Rate Monotonic atribui prioridade fixa a tarefas periódicas de tempo real.",
      "SJF escolhe a tarefa com menor duração estimada e reduz espera média.",
      "Round-robin divide a CPU em fatias de tempo e favorece responsividade.",
      "Prioridades permitem favorecer tarefas interativas e reduzir latência percebida.",
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
    conceptNotes: [
      "Descreve um hypervisor hospedado, ou tipo 2, que usa um sistema operacional host.",
      "Tipo 1 é bare metal: o hypervisor controla o hardware diretamente.",
      "Criar processos e usar arquivos do host é típico de containers ou virtualização hospedada.",
      "Instruções privilegiadas mediadas pelo sistema operacional indicam um hypervisor tipo 2.",
      "Guests podem usar sistemas operacionais diferentes entre si e do host.",
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
    conceptNotes: [
      "Combina SaaS, responsabilidade do provedor, com a definição incorreta de elasticidade.",
      "Combina SaaS e IaaS: o usuário não administra a infraestrutura física, mas controla a VM.",
      "Combina elasticidade com uma afirmação restritiva sobre nuvem comunitária.",
      "Combina SaaS, a afirmação restritiva sobre comunidade e IaaS.",
      "Combina a definição incorreta de elasticidade, comunidade e IaaS.",
    ],
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
    conceptNotes: [
      "Sistemas distribuídos coordenam eventos sem depender de um relógio global perfeito.",
      "Falhas parciais permitem que alguns nós continuem enquanto outro falha.",
      "Middleware e protocolos permitem combinar componentes heterogêneos.",
      "Escalabilidade é crescer em carga adicionando recursos ou capacidade.",
      "Transparência oculta a distribuição; concorrência exige controle explícito.",
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
    <AcademicSlide title={`${question.source}: questão ${question.id}`} section="fechamento" className={styles.examSlide}>
      <div className={`${styles.body} ${styles.questionBody}`}>
        <section className={styles.questionPrompt}>
          <span>{question.title}</span>
          <h2>{question.prompt}</h2>
          {question.statements && <div className={styles.statementList}>{question.statements.map((statement) => <p key={statement}>{statement}</p>)}</div>}
          <div className={styles.questionInstruction}><UserRound /><span>Escolha uma alternativa e prepare uma justificativa para discutir com a turma.</span></div>
        </section>
        <div className={styles.alternatives}>{question.alternatives.map((alternative, index) => <div key={alternative}><b>{String.fromCharCode(65 + index)}</b><span>{alternative}</span><small className={styles.alternativeNote}>{question.conceptNotes[index]}</small></div>)}</div>
        <SourceNote>{question.note ?? `Fonte: ${question.source}, prova de Ciência da Computação. Enunciado condensado para projeção; resolução no próximo slide.`}</SourceNote>
      </div>
    </AcademicSlide>
  );
}

function ExamResolutionSlide({ question }: { question: ExamQuestion }) {
  return (
    <AcademicSlide title={`Resolução: ${question.title}`} section="fechamento" className={styles.examSlide}>
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
    <AcademicSlide title="Roda de discussão: qual requisito deve ser renegociado?" section="fechamento" className={styles.discussionSlide}>
      <div className={`${styles.body} ${styles.discussionBody}`}>
        <section className={styles.discussionScenario}><span>CENÁRIO</span><h2>Uma fintech brasileira precisa sobreviver à perda completa de uma região.</h2><p>O time precisa propor uma arquitetura que funcione no caminho normal e também tenha uma resposta defensável para uma partição. Não existe orçamento para satisfazer todos os requisitos ao mesmo tempo.</p><ul><li><strong>95%</strong><span>das operações são leituras; 5% alteram saldo.</span></li><li><strong>60 s</strong><span>de RTO e nenhuma transação perdida são a meta comercial.</span></li><li><strong>80 ms</strong><span>é o limite de latência adicional para escritas normais.</span></li><li><strong>2 regiões</strong><span>cabem no orçamento, mas não com capacidade plena duplicada.</span></li></ul></section>
        <div className={styles.discussionPositions}>
          <section><ShieldCheck /><b>A. Active-passive síncrono</b><p>Escritas só confirmam depois da cópia remota durável. Protege RPO, mas adiciona RTT ao caminho normal, consome capacidade nas duas regiões e pode bloquear durante uma partição.</p></section>
          <section><RefreshCcw /><b>B. Active-passive assíncrono</b><p>A região primária mantém a latência local e a réplica acompanha fora do caminho crítico. O failover é simples de explicar, mas commits recentes podem ser perdidos, e o RPO observado precisa ser medido e aceito pelo negócio.</p></section>
          <section><Split /><b>C. Active-active seletivo</b><p>Distribui leituras e permite algumas operações em ambas as regiões. Reduz dependência de uma única escrita central, mas exige declarar quais invariantes de saldo nunca podem divergir e como conflitos serão resolvidos.</p></section>
        </div>
        <div className={styles.discussionRules}><span><UserRound /> Formem três grupos; cada grupo escolhe uma arquitetura e declara as concessões.</span><span><Clock3 /> Dois minutos de preparação, um minuto de defesa e uma réplica.</span><span><Scale /> A resposta precisa cobrir RPO, RTO, latência, partições, capacidade e custo.</span></div>
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
