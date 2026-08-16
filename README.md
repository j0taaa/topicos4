# Cloud computing: da virtualização à operação multi-região

Apresentação web avançada e vendor-neutral sobre a infraestrutura e os sistemas distribuídos que sustentam uma cloud moderna. O roteiro acompanha uma aplicação desde uma VM isolada até uma arquitetura multi-AZ e multi-região, explicando quais problemas cada camada resolve e quais continuam sem solução.

**Apresentação publicada:** https://cloud-slides-lab.gabrieljotalizardo.chatgpt.site

## Atendimento às instruções do seminário

| Requisito | Como aparece na apresentação |
| --- | --- |
| Resumo da disciplina | Fundamentos de cloud, virtualização, containers, Kubernetes, redes, replicação, consistência, consenso, CAP, RPO e RTO. |
| Tópico adicional | Dois slides sobre microVMs, começando pela definição e terminando com critérios concretos de uso. |
| Notícia ou tecnologia atual | Aposentadoria do Ingress-NGINX em março de 2026 e migração para Kubernetes Gateway API. |
| Quatro questões de prova | Três questões do ENADE 2021 e uma questão da FGV 2024, cada uma seguida por resolução comentada. |
| Evolução por artigos | Mesos (2011), Firecracker (2020) e FaaSNet (2021), com um slide dedicado a cada artigo e uma síntese final. |
| Interatividade | Roda de discussão com um cenário de fintech multi-região, três posições arquiteturais e requisitos conflitantes. |
| Duração mínima | 72 slides e roteiro estimado entre 100 e 110 minutos. |

## Principais revisões didáticas

- Abertura sem subtítulo promocional, com os quatro integrantes do grupo.
- Conceitos apresentados antes de termos como etcd, kubelet, CNI, EndpointSlice, WAL, ACK, RTT, quorum, fencing e lease.
- MicroVMs explicadas por comparação direta com containers e VMs tradicionais.
- Introdução do Kubernetes reorganizada em problema, conceitos básicos, fluxo do manifesto, control plane e componentes do Node.
- Rede reorganizada para explicar CNI, fabric, Service, EndpointSlice, Gateway, VPC, subnets e rotas.
- Um slide dedicado a cada artigo, incluindo problema, proposta, resultado, limitação e relação com o seminário.
- Questão de dispositivos de rede substituída por uma questão de virtualização da FGV.
- Slides expositivos aparecem completos; revelação progressiva permanece apenas nos diagramas em que a ordem dos eventos importa.

## Estrutura do conteúdo

1. Infraestrutura física, abstrações de cloud e failure domains
2. Virtualização de CPU, memória e I/O
3. Containers: namespaces, cgroups, imagens e runtimes
4. Tópico adicional: microVMs e isolamento de workloads
5. Kubernetes: conceitos, reconciliação, control plane, scheduler, placement e self-healing
6. Evolução científica: Mesos, Firecracker e FaaSNet
7. Networking de Pods, Services, EndpointSlices, Gateway, VPC e multi-AZ
8. Tecnologia atual: aposentadoria do Ingress-NGINX e Gateway API
9. Replicação: WAL, ACK, lag, failover, fencing, backup e quorum
10. Multi-região: RTT, consistência, Raft, CAP, RPO e RTO
11. Síntese arquitetural, quatro questões e roda de discussão

## Controles

- `→`, `Espaço` ou `Page Down`: avançar
- `←` ou `Page Up`: voltar
- `Home` e `End`: ir ao início ou ao fim
- **Visão geral**: navegar diretamente para qualquer slide
- **Mostrar diagrama completo**: revelar todas as etapas do diagrama atual
- **Tela cheia**: apresentar usando todo o espaço disponível

## Desenvolvimento local

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
```

Para validar a versão de produção:

```bash
npm run lint
npm run build
npm test
```

## Referências principais

### Documentação e tecnologia

- Documentação oficial do Linux sobre namespaces e cgroup v2
- Especificações da Open Container Initiative
- Documentação oficial do Kubernetes
- Kubernetes Blog: aposentadoria do Ingress-NGINX e migração para Gateway API
- Artigo original do Raft
- Gilbert e Lynch sobre CAP

### Evolução por artigos

- Hindman et al. **Mesos: A Platform for Fine-Grained Resource Sharing in the Data Center.** NSDI, 2011.
- Agache et al. **Firecracker: Lightweight Virtualization for Serverless Applications.** NSDI, 2020.
- Wang et al. **FaaSNet: Scalable and Fast Provisioning of Custom Serverless Container Runtimes.** USENIX ATC, 2021.

### Questões

- ENADE 2021, Bacharelado em Ciência da Computação, questões 09, 25 e 35 e respectivos gabaritos oficiais.
- FGV 2024, Ministério da Fazenda/STN, Auditor Federal de Finanças e Controle, área de Tecnologia da Informação, questão 60.
- A questão 25 possui redação discutível no item sobre nuvem comunitária; o slide explicita a ressalva e segue o gabarito oficial.
