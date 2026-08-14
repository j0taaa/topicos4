# Cloud por baixo das abstrações

Apresentação web avançada e vendor-neutral sobre a infraestrutura e os sistemas distribuídos que sustentam uma cloud moderna.

**Apresentação publicada:** https://cloud-slides-lab.gabrieljotalizardo.chatgpt.site

## Conteúdo

O roteiro acompanha uma aplicação desde uma única VM até uma arquitetura multi-AZ e multi-região:

1. Fundamentos físicos e failure domains
2. Virtualização
3. Containers
4. Kubernetes e orquestração
5. Networking e arquitetura multi-AZ
6. Replicação de dados
7. Consistência, consenso, CAP e multi-região
8. Síntese e discussão

O deck possui 60 slides em proporção 16:9, cerca de 80 minutos de conteúdo principal, mapas de orientação entre os temas, diagramas progressivos apenas quando a sequência é didaticamente relevante e perguntas finais.

## Controles

- `→`, `Espaço` ou `Page Down`: avançar
- `←` ou `Page Up`: voltar
- `Home` e `End`: ir ao início ou ao fim
- **Visão geral**: navegar diretamente para qualquer slide
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

## Referências técnicas principais

- Documentação oficial do Linux sobre namespaces e cgroup v2
- Especificações da Open Container Initiative
- Documentação oficial do Kubernetes
- Artigo original do Raft
- Gilbert e Lynch sobre CAP
