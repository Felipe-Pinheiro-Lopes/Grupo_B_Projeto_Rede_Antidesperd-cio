# 🌿 Rede Antidesperdício — Conexão Fome Zero

> **Projeto Desenvolvido no Hackathon — Frameworks Front-end**  
> **Grupo B:** Felipe Lopes, Anthony e Nicolas  
> **Tema:** ODS 2 — Fome Zero e Agricultura Sustentável (interseção com ODS 12.3)  
> **Deploy Front-end:** [Em breve no Vercel](#) | **Deploy Back-end:** [Em breve no Render](#)

---

## 📌 Documentação Completa (Obsidian Knowledge Vault)

Toda a documentação estruturada do projeto, com grafo de notas, links bidirecionais e detalhes aprofundados, está disponível na pasta [`docs/`](./docs/):

* 🧭 [00 - MOC (Mapa de Conteúdo)](./docs/00%20-%20MOC%20(Mapa%20de%20Conteúdo).md)
* 🌍 [01 - Definição do Problema e ODS](./docs/01%20-%20Definição%20do%20Problema%20e%20ODS.md)
* 🔍 [02 - Benchmarking de 5 Soluções](./docs/02%20-%20Benchmarking%20de%20Soluções.md)
* 💎 [03 - Proposta de Valor e Impacto ESG](./docs/03%20-%20Proposta%20de%20Valor%20e%20Impacto%20ESG.md)
* 📋 [04 - Requisitos do Sistema (10 RF + 10 RNF)](./docs/04%20-%20Requisitos%20do%20Sistema%20(RF%20e%20RNF).md)
* 📖 [05 - Histórias de Usuário (User Stories)](./docs/05%20-%20Histórias%20de%20Usuário%20(User%20Stories).md)
* 🎨 [06 - Prototipação e Arquitetura de Telas (10 Telas)](./docs/06%20-%20Prototipação%20e%20Arquitetura%20de%20Telas.md)
* 📊 [07 - Gestão do Projeto (Backlog com 50+ Cards)](./docs/07%20-%20Gestão%20do%20Projeto%20(50%20Cards%20Kanban).md)
* 🏗️ [08 - Arquitetura Técnica (Front Vercel & Back Render)](./docs/08%20-%20Arquitetura%20Técnica%20(Front%20Vercel%20&%20Back%20Render).md)
* ⏱️ [09 - Plano de Commits e Cronograma de 3 Horas](./docs/09%20-%20Plano%20de%20Commits%20e%20Cronograma%203%20Horas.md)
* 🤖 [10 - Registro de Uso de Inteligência Artificial](./docs/10%20-%20Registro%20de%20Uso%20de%20Inteligência%20Artificial.md)

---

## 🎯 ODS

* **ODS Principal:** **ODS 2 — Fome Zero e Agricultura Sustentável**
  - **Meta 2.1:** Garantir o acesso de todas as pessoas a alimentos seguros, nutritivos e suficientes durante todo o ano.
  - **Meta 2.2:** Eliminar todas as formas de desnutrição, priorizando alimentos frescos e hortifrútis.
* **ODS Correlato:** **ODS 12 — Consumo e Produção Responsáveis (Meta 12.3: Reduzir pela metade o desperdício de alimentos per capita).**

---

## ⚠️ Problema

No Brasil, mais de **27 milhões de toneladas de alimentos são descartadas anualmente**, enquanto milhões enfrentam insegurança alimentar severa. Ao final das feiras livres de rua e encerramentos de turnos em sacolões e pequenos comércios, toneladas de hortifrútis e pães próprios para consumo são jogadas nas caçambas ou calçadas pela ausência de um canal rápido, confiável e hiperlocal para comunicar e entregar essas sobras a cozinhas solidárias e ONGs comunitárias vizinhas.

---

## 👥 Público-alvo

1. **Doadores:** Feirantes autônomos, sacolões de bairro, padarias e pequenos restaurantes.
2. **Receptores:** ONGs de assistência alimentar, cozinhas solidárias comunitárias, abrigos e casas de acolhimento.
3. **Beneficiários Finais:** População em situação de vulnerabilidade e extrema pobreza assistida por essas entidades.

---

## 💎 Proposta de Valor

Conectar em tempo real e em menos de 45 segundos o comércio que tem excedente com as ONGs locais que precisam de alimento, transformando descarte orgânico em pratos nutritivos, reduzindo custos de coleta para comerciantes, economizando recursos de entidades sociais e mitigando as emissões de gás metano ($CH_4$) em aterros sanitários com conformidade na Lei Federal 14.016/2020.

---

## 🔍 Benchmarking

A equipe realizou benchmarking de 5 soluções do mercado:
1. **Too Good To Go:** Forte em catálogo e urgência, porém focado em venda direta (B2C comercial) e inacessível a ONGs.
2. **Comida Invisível:** Focado em doação no Brasil com respaldo jurídico, porém burocrático e distante da agilidade das feiras de rua.
3. **OLIO:** Excelente facilidade e velocidade de publicação P2P, porém disperso sem foco prioritário em ONGs assistenciais.
4. **Goodr:** Referência em dashboards de impacto ESG e métricas ambientais corporativas.
5. **Connecting Food:** Destaque em transparência de ciclo de vida e status do lote.

*Diferencial da Rede Antidesperdício:* União da velocidade da OLIO + foco social do Comida Invisível + painel ESG da Goodr em formato mobile-first para feirantes.

---

## 📋 Requisitos

### Requisitos Funcionais (Resumo)
* **RF01:** Cadastro e perfil de estabelecimentos doadores.
* **RF02:** Cadastro de ONGs e cozinhas comunitárias.
* **RF03:** Publicação relâmpago de lote de alimento excedente com foto e quantidade.
* **RF04:** Feed em tempo real de doações disponíveis.
* **RF05:** Filtro por tipo de alimento, urgência e proximidade.
* **RF06:** Reserva instantânea com geração de código de resgate exclusivo.
* **RF07:** Confirmação e baixa de entrega física com validação de código.
* **RF08:** Dashboard de métricas ESG (kg salvos, refeições e CO2e evitado).
* **RF09:** Histórico e emissão simbólica de selo de doador consciente.
* **RF10:** Mapa interativo georreferenciado de pontos de resgate.

### Requisitos Não Funcionais (Resumo)
* **RNF01:** Interface Mobile-First totalmente responsiva (360px a 4K).
* **RNF02:** Conformidade estrita com acessibilidade WCAG 2.1 AA (alto contraste sob sol forte).
* **RNF03:** Carregamento ultra-rápido (FCP < 1.8s).
* **RNF04:** Front-end moderno em React com modularização de componentes.
* **RNF05:** Back-end leve em Node/Express com persistência local em SQLite.
* **RNF06:** Deploy contínuo no Vercel (Front) e Render (Back).
* **RNF07:** Publicação de doação em menos de 4 toques (<45 segundos).
* **RNF08:** Identidade visual biofílica ESG acolhedora e confiável.
* **RNF09:** Estados de loading inteligentes (skeletons) e resiliência a oscilações.
* **RNF10:** Privacidade e segurança nos dados de contato.

---

## 📖 User Stories

10 histórias com critérios BDD formalizadas no documento [`docs/05 - Histórias de Usuário (User Stories).md`](./docs/05%20-%20Histórias%20de%20Usuário%20(User%20Stories).md).

---

## ⚡ Funcionalidades

- [x] Publicação relâmpago de doações com categorias (*Hortifrúti, Padaria, Comida Pronta, Mercearia*).
- [x] Feed interativo com contadores de tempo restante de retirada.
- [x] Reserva em 1 clique com geração de código seguro de resgate (`#REDE-XXXX`).
- [x] Painel de Impacto ESG em Tempo Real (Cálculo de Kg salvos, Pratos servidos e $CO_2e$ mitigado).
- [x] Mapa e localização das feiras participantes.
- [x] Selo de conformidade com a Lei Federal de Doação de Alimentos (Lei 14.016/2020).

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** React 18, Vite, Vanilla CSS com Tokens Modernos, Lucide React Icons.
* **Back-end:** Node.js, Express.js, CORS.
* **Banco de Dados:** SQLite (leve, embarcado, armazenado no próprio repositório).
* **Versionamento & Governança:** Git, GitHub Projects, Obsidian (PKM).
* **Infraestrutura e Deploy:** Vercel (Front-end) & Render (Back-end API).

---

## 💻 Framework Utilizado

* **React com Vite:** Escolhido por proporcionar renderização ultrarrápida, alta performance no ciclo de desenvolvimento, excelente pontuação no Core Web Vitals e ecossistema maduro para SPA reativa.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* Node.js (v18 ou superior)
* Git

### Passos de Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/Felipe-Pinheiro-Lopes/Grupo_B_Projeto_Rede_Antidesperd-cio.git

# 2. Acesse a pasta do projeto
cd Grupo_B_Projeto_Rede_Antidesperd-cio

# 3. Mude para a branch docs ou main
git checkout docs

# 4. Executando o Back-end (quando configurado na pasta backend/)
cd backend
npm install
npm run dev

# 5. Executando o Front-end (quando configurado na pasta frontend/)
cd ../frontend
npm install
npm run dev
```

---

## 🎨 Protótipo

* **Mapa de Telas:** Especificação detalhada de 10 telas funcionais disponível em [`docs/06 - Prototipação e Arquitetura de Telas.md`](./docs/06%20-%20Prototipação%20e%20Arquitetura%20de%20Telas.md).
* **URL do Protótipo / Wireframes:** [Visualizar Documento de Telas](./docs/06%20-%20Prototipação%20e%20Arquitetura%20de%20Telas.md)

---

## 🌐 Aplicação

* **URL da Aplicação (Vercel):** *[Em implantação nas próximas horas]*
* **URL da API (Render):** *[Em implantação nas próximas horas]*
* **URL do Repositório:** https://github.com/Felipe-Pinheiro-Lopes/Grupo_B_Projeto_Rede_Antidesperd-cio

---

## ⚙️ Processo de Desenvolvimento

* **Gestão de Tarefas:** Quadro com mais de 50 cards categorizados conforme detalhado em [`docs/07 - Gestão do Projeto (50 Cards Kanban).md`](./docs/07%20-%20Gestão%20do%20Projeto%20(50%20Cards%20Kanban).md).
* **Estratégia de Commits:** Mínimo de 30 commits significativos estruturados conforme [`docs/09 - Plano de Commits e Cronograma 3 Horas.md`](./docs/09%20-%20Plano%20de%20Commits%20e%20Cronograma%203%20Horas.md).

---

## 🤖 Inteligência Artificial

Em conformidade com a Seção 12 do regulamento do Hackathon:

* **Ferramentas:** Antigravity AI (Google DeepMind) & GitHub Copilot.
* **Utilização:**
  - Auxílio na formulação dos coeficientes de impacto socioambiental (FAO / WRAP);
  - Estruturação do esqueleto da documentação técnica e diagramas Mermaid;
  - Decomposição das atividades nos 50+ cards de Kanban;
  - Refinamento de acessibilidade e semântica HTML/CSS.
* **Relatório Completo:** Disponível em [`docs/10 - Registro de Uso de Inteligência Artificial.md`](./docs/10%20-%20Registro%20de%20Uso%20de%20Inteligência%20Artificial.md).

---

## 👥 Integrantes (Grupo B)

* **Felipe Pinheiro Lopes** — Coordenação, Arquitetura Front-end e Integração
* **Anthony** — Design System, UI Components e Telas do Doador
* **Nicolas** — Engenharia Back-end, SQLite e Deploy