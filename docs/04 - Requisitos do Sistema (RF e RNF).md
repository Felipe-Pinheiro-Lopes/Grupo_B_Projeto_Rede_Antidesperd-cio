---
title: "04 - Requisitos do Sistema (RF e RNF)"
project: "Rede Antidesperdício"
tags:
  - requisitos
  - engenharia-de-software
  - rf
  - rnf
---

# 📋 04 - Requisitos do Sistema

> Documento base para a **Etapa 4 da Avaliação do Hackathon**.  
> Navegação: [[03 - Proposta de Valor e Impacto ESG|Proposta de Valor]] | Próximo: [[05 - Histórias de Usuário (User Stories)|User Stories]]

---

## ⚙️ 1. Requisitos Funcionais (Mínimo de 10)

| ID | Nome do Requisito | Descrição Detalhada |
| :--- | :--- | :--- |
| **RF01** | Cadastro e Perfil de Estabelecimentos Doadores | O sistema deve permitir que feirantes, sacolões e restaurantes criem e gerenciem seus perfis com nome, tipo de estabelecimento, endereço/ponto de feira e contato de WhatsApp. |
| **RF02** | Cadastro e Homologação de ONGs / Cozinhas Comunitárias | O sistema deve permitir o cadastro de entidades assistenciais com nome da instituição, responsável, capacidade de atendimento diário e tipo de transporte disponível. |
| **RF03** | Cadastro Rápido de Lote de Alimentos | O sistema deve permitir ao doador cadastrar um lote de excedente informando: título do alimento, categoria (hortifrúti, padaria, refeição pronta, grãos), quantidade estimada (em kg ou caixas), data/horário limite para retirada e observações de conservação. |
| **RF04** | Upload / Galeria de Fotos do Lote | O sistema deve permitir anexar ou selecionar uma imagem representativa do estado do alimento para comprovação visual da qualidade. |
| **RF05** | Feed / Catálogo de Doações Disponíveis em Tempo Real | O sistema deve listar as doações ativas em formato de cards interativos, com badges de categoria, urgência de retirada e distância estimada. |
| **RF06** | Sistema de Busca e Filtros Avançados | O sistema deve permitir filtrar as doações por categoria do alimento, status (Disponível, Reservado, Concluído), distância/bairro e horário de coleta. |
| **RF07** | Reserva Instantânea com Código de Resgate | O sistema deve permitir que uma ONG reserve um lote disponível em 1 clique, alterando o status do item e gerando um código seguro de confirmação (ex: `#REDE-4021`). |
| **RF08** | Confirmação e Baixa de Entrega | O sistema deve permitir que o doador ou a ONG confirme a conclusão da retirada mediante validação do código, finalizando o ciclo do lote. |
| **RF09** | Dashboard de Métricas de Impacto ESG | O sistema deve calcular e exibir automaticamente métricas acumuladas: total de kg de alimentos salvos, estimativa de refeições geradas e volume de $CO_2e$ evitado. |
| **RF10** | Histórico e Rastreabilidade de Doações | O sistema deve manter um histórico auditável de todas as doações concluídas por usuário, permitindo emissão de um comprovante simbólico de contribuição ecológica. |

---

## 🛡️ 2. Requisitos Não Funcionais (Mínimo de 10)

| ID | Categoria | Descrição Detalhada |
| :--- | :--- | :--- |
| **RNF01** | Responsividade (Mobile-First) | A interface do usuário deve se adaptar de forma fluida a qualquer tamanho de tela (smartphones a partir de 360px de largura até desktops 4K), com prioridade para dispositivos móveis usados nas feiras. |
| **RNF02** | Acessibilidade (WCAG 2.1 AA) | A aplicação deve seguir diretrizes de acessibilidade, mantendo contraste mínimo de 4.5:1 em textos, navegação por teclado e rótulos semânticos (`aria-label`) para leitores de tela. |
| **RNF03** | Desempenho e Velocidade de Carregamento | O tempo de carregamento inicial (First Contentful Paint) não deve ultrapassar 1.8 segundos em redes 4G simuladas, e a pontuação no Google Lighthouse deve ser superior a 90 em Performance e Boas Práticas. |
| **RNF04** | Arquitetura e Framework Front-end | O front-end deve ser desenvolvido em React com Vite ou Next.js, utilizando componentes modulares, estados previsíveis e design tokens limpos. |
| **RNF05** | Persistência e Simplicidade do Back-end | O back-end deve ser leve, desenvolvido em Node.js/Express, persistindo os dados em banco de dados SQLite local, com endpoints RESTful bem documentados. |
| **RNF06** | Disponibilidade e Deploy Contínuo | O front-end deve estar hospedado e acessível publicamente via Vercel com HTTPS habilitado por padrão, enquanto o back-end deve estar rodando na nuvem do Render. |
| **RNF07** | Usabilidade e Carga Cognitiva Reduzida | O fluxo de publicação de uma doação por um feirante deve exigir no máximo 4 toques na tela e ser concluído em menos de 60 segundos. |
| **RNF08** | Estética Visual e Identidade Biofílica ESG | O design deve transmitir confiabilidade, sustentabilidade e vitalidade, utilizando uma paleta de cores verde-esmeralda e terra suave, microinterações modernas e tipografia contemporânea (Inter / Outfit). |
| **RNF09** | Robustez e Tratamento de Falhas | O sistema deve exibir estados de carregamento elegantes (*skeletons*), tratamento amigável de erros de rede e persistência local temporária (localStorage/cache) em caso de oscilações de sinal. |
| **RNF10** | Segurança e Privacidade de Dados | O sistema não deve expor dados sensíveis desnecessários, restringindo a exibição de telefones de contato apenas após a confirmação da reserva do lote. |

---

## 🔗 Próximos Passos
- Especificação em Histórias: [[05 - Histórias de Usuário (User Stories)]]
- Arquitetura de Telas: [[06 - Prototipação e Arquitetura de Telas]]
