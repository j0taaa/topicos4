# Cloud por baixo das abstrações

Apresentação web avançada e vendor-neutral sobre a infraestrutura e os sistemas distribuídos que sustentam uma cloud moderna. O roteiro acompanha uma aplicação desde uma VM isolada até uma arquitetura multi-AZ e multi-região, explicando quais problemas cada camada resolve — e quais continuam sem solução.

**Apresentação publicada:** https://cloud-slides-lab.gabrieljotalizardo.chatgpt.site

## Atendimento às instruções do seminário

| Requisito | Como aparece na apresentação |
| --- | --- |
| Resumo da disciplina | Fundamentos de cloud, virtualização, containers, Kubernetes, redes, replicação, consistência, consenso, CAP, RPO e RTO. |
| Tópico adicional | Dois slides sobre microVMs, comparando a fronteira de isolamento com containers e VMs tradicionais. |
| Notícia ou tecnologia atual | Aposentadoria do Ingress-NGINX em março de 2026 e migração para Kubernetes Gateway API. |
| Quatro questões de prova | Questões 09, 21, 25 e 35 do ENADE 2021, cada uma com tempo para resposta e resolução no slide seguinte. |
| Evolução por artigos | Mesos (2011), Firecracker (2020) e FaaSNet (2021), cobrindo os três períodos solicitados. |
| Interatividade | Roda de discussão final com cenário, três posições arquiteturais, regras, tempo de preparação e réplica. |
| Duração mínima | 70 slides e roteiro estimado em aproximadamente 100 minutos. |

## Estrutura do conteúdo

1. Infraestrutura física, abstrações de cloud e failure domains
2. Virtualização de CPU, memória e I/O
3. Containers: namespaces, cgroups, imagens e runtimes
4. Tópico adicional: microVMs e isolamento de workloads
5. Kubernetes: reconciliação, control plane, scheduler, placement e self-healing
6. Evolução científica: Mesos, Firecracker e FaaSNet
7. Networking de Pods, Services, caminho da requisição, VPC e multi-AZ
8. Tecnologia atual: aposentadoria do Ingress-NGINX e Gateway API
9. Replicação: WAL, ACK, lag, failover, backup e quorum
10. Multi-região: latência, consistência, Raft, CAP, RPO e RTO
11. Síntese arquitetural, quatro questões ENADE e roda de discussão

O deck usa proporção 16:9, mapas de orientação entre os temas e revelação progressiva apenas em diagramas nos quais a ordem dos eventos é relevante. Slides expositivos aparecem completos de uma vez.

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
- Wang et al. **FaaSNet: Scalable and Fast Provisioning of Custom Serverless Container Runtimes at Alibaba Cloud Function Compute.** USENIX ATC, 2021.

### Questões

- ENADE 2021 — Bacharelado em Ciência da Computação, questões 09, 21, 25 e 35 e respectivo gabarito oficial.
- A questão 25 possui redação discutível no item sobre nuvem comunitária; o slide explicita a ressalva e segue o gabarito oficial.
