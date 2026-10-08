# 📐 Planejamento Arquitetural e Especificação Front-end — Next.js (React)

> **Projeto:** Rede Antidesperdício — Conexão Fome Zero  
> **Papel:** Engenheiro Front-end Sênior & Mestre em ESG  
> **Stack Base:** Next.js 14+ (App Router), React 18/19, Tailwind CSS, Lucide React, TypeScript  
> **Hospedagem & CI/CD:** Vercel  
> **Branch de Trabalho:** `feat/frontend`  
> **Tempo de Desenvolvimento:** Sprint de 3 Horas

---

## 🏛️ 1. Arquitetura do Projeto & Estrutura de Diretórios (Next.js App Router)

A aplicação adotará a arquitetura modular padrão industrial do **Next.js App Router**, desacoplando componentes visuais atômicos, regras de negócio e integrações com o back-end:

```text
frontend/
├── app/
│   ├── layout.tsx                 # Root Layout (Fontes Outfit/Inter, Header e Footer globais)
│   ├── page.tsx                   # [Tela 01] Landing Page & Manifesto ODS 2
│   ├── feed/
│   │   └── page.tsx               # [Tela 02] Feed Geral de Doações em Tempo Real
│   ├── dashboard/
│   │   └── page.tsx               # [Tela 03] Dashboard de Impacto Socioambiental ESG
│   ├── lote/
│   │   └── [id]/
│   │       └── page.tsx           # [Tela 04 & 05] Detalhes do Lote e Modal de Reserva
│   ├── login/
│   │   └── page.tsx               # [Tela 06] Cadastro / Login Doador vs. ONG
│   ├── doar/
│   │   └── page.tsx               # [Tela 07] Formulário Ultra-Ágil para Feirantes (Mobile-First)
│   ├── painel-doador/
│   │   └── page.tsx               # [Tela 08] Gestão de Doações e Validação de Código
│   ├── painel-ong/
│   │   └── page.tsx               # [Tela 09] Gestão Logística de Coletas e Rotas
│   ├── mapa/
│   │   └── page.tsx               # [Tela 10] Mapa Georreferenciado com Pins Interativos
│   └── globals.css                # Tokens de design biofílicos e animações Tailwind
├── components/
│   ├── ui/                        # Componentes Atômicos Primitivos
│   │   ├── Button.tsx             # Botão polimórfico (Primary, Secondary, Danger, Outline)
│   │   ├── Badge.tsx              # Etiquetas de status (Disponível, Reservado, Urgente)
│   │   ├── Input.tsx              # Campos de formulário com estados de foco e erro
│   │   ├── Modal.tsx              # Janela modal acessível (WAI-ARIA Dialog)
│   │   └── Card.tsx               # Contêiner base com glassmorphism e bordas suaves
│   ├── layout/
│   │   ├── Navbar.tsx             # Barra de navegação com link ativo e CTA rápido
│   │   └── Footer.tsx             # Rodapé institucional com manifesto ODS 2
│   ├── feed/
│   │   ├── DonationCard.tsx       # Card de lote com contador regressivo e tags
│   │   ├── FilterBar.tsx          # Pílulas de filtro de categoria (Hortifrúti, Padaria, etc.)
│   │   └── UrgencyBanner.tsx      # Banner dinâmico de proximidade do fechamento de feira
│   ├── dashboard/
│   │   ├── MetricKpiCard.tsx      # Big Numbers com contagem animada (Kg salvos, CO2e)
│   │   ├── CategoryProgress.tsx   # Barras de progresso proporcionais por tipo de alimento
│   │   └── TopDonorsList.tsx      # Tabela/Lista dos comércios mais solidários
│   └── map/
│       ├── InteractiveMap.tsx     # Grid cartográfico com pins de feiras livres
│       └── BottomPinSheet.tsx     # Card deslizante inferior ao clicar no ponto do mapa
├── hooks/
│   ├── useDonations.ts            # Hook SWR/React para listagem e filtros reativos
│   ├── useCountdown.ts            # Hook para cálculo do tempo restante para coleta
│   └── useImpactMetrics.ts        # Hook para cálculo do algoritmo científico de CO2 e pratos
├── types/
│   └── donation.ts                # Tipagens TypeScript estritas da doação e perfis
├── lib/
│   ├── api.ts                     # Cliente HTTP (fetch wrapper) para comunicação com Render
│   └── constants.ts               # Constantes de categorias e coeficientes ESG da FAO
├── package.json
└── tailwind.config.js             # Extensão de paleta biofílica e escalas tipográficas
```

---

## 🎨 2. Design System & Design Tokens Biofílicos (Tailwind CSS)

Como engenheiro front-end sênior alinhado a critérios ESG, a interface deve transmitir simultaneamente **urgência operacional** e **confiança ecológica**.

### Paleta de Cores Semântica
- **Verde Floresta ESG (Primária):**
  - `emerald-600` (`#059669`): Ações primárias, links ativos, botões de reserva.
  - `emerald-700` (`#047857`): Estados de hover, títulos de destaque.
  - `emerald-50` (`#ECFDF5`): Superfícies de apoio, backgrounds de tags.
- **Âmbar Colheita / Alimento (Secundária):**
  - `amber-500` (`#F59E0B`): Destaques de chamada secundária, botões de nova doação.
  - `amber-100` (`#FEF3C7`): Alertas de fechamento de feira, badges de status reservado.
- **Vermelho Urgência Sanitária:**
  - `red-500` / `red-600` (`#EF4444` / `#DC2626`): Lotes com tolerância inferior a 60 minutos.
- **Neutros de Alto Contraste (WCAG 2.1 AA):**
  - `slate-900` (`#0F172A`): Tipografia primária (contraste superior a 7:1 em fundo branco).
  - `slate-500` / `slate-600`: Tipografia secundária e textos de apoio.
  - `slate-50` (`#F8FAFC`): Background global suave para conforto visual sob sol forte.

### Tipografia
- **Títulos e Headings:** Google Font `Outfit` (pesos 600, 700, 800) — moderna, expressiva e humanizada.
- **Textos de Corpo e Formulários:** Google Font `Inter` (pesos 400, 500, 600) — legibilidade técnica excelente.
- **Códigos de Resgate:** `JetBrains Mono` / Monospace (`#REDE-XXXX`).

---

## 🗺️ 3. Especificação Granular das 10 Telas (Até o Nível de Componentes e Botões)

Abaixo está o inventário de cada tela com o mapeamento exato de seus elementos interativos, rotas e manipuladores de eventos (*event handlers*):

---

### 🖥️ Rota `/` — [Tela 01] Landing Page & Manifesto ODS 2
* **Objetivo:** Ponto de entrada, sensibilização pública e direcionamento rápido de personas.
* **Componentes:**
  - `Navbar`: Header fixo com logo e links institucionais.
  - `HeroSection`: Headline principal, subtítulo e indicador de conformidade com a Lei 14.016/2020.
  - `ImpactPreviewCard`: Card flutuante com prévia das métricas do último lote resgatado.
  - `PillarsGrid`: Grade de 3 cartões (Agilidade 45s, Hiperlocalidade, Algoritmo Auditável).
  - `Footer`: Rodapé com selos de desenvolvimento sustentável.
* **Mapeamento de Botões e Interações:**
  1. `[Botão]` **"🔍 Explorar Doações Disponíveis"**
     - *Estilo:* Primário verde (`bg-emerald-600`, texto branco, padding `px-8 py-4`, `rounded-2xl`, sombra suave).
     - *Ação:* Navega para a rota `/feed`.
  2. `[Botão]` **"🍎 Cadastrar Doação Rápida"**
     - *Estilo:* Secundário âmbar (`bg-amber-500`, texto branco, hover `bg-amber-600`).
     - *Ação:* Navega para a rota `/doar`.
  3. `[Botão]` **"Ver Métricas Globais ESG →"**
     - *Estilo:* Link em botão sutil (`bg-emerald-50 text-emerald-700 hover:bg-emerald-100`).
     - *Ação:* Navega para a rota `/dashboard`.
  4. `[Botão Navbar]` **"Entrar"**
     - *Estilo:* Ghost (`text-emerald-700 hover:bg-emerald-50`).
     - *Ação:* Navega para `/login`.

---

### 🥗 Rota `/feed` — [Tela 02] Feed Geral de Doações em Tempo Real
* **Objetivo:** Catálogo dinâmico de todos os lotes de alimentos ativos, com filtragem instantânea e contagem regressiva.
* **Componentes:**
  - `SearchBar`: Input de pesquisa reativa por nome de alimento ou bairro.
  - `FilterPillsGroup`: Conjunto de 5 botões de filtro de categoria.
  - `UrgencyAlertBanner`: Banner âmbar indicando feiras que estão encerrando na próxima hora.
  - `DonationGrid`: Grade de cards responsivos (1 coluna no mobile, 2 no tablet, 3 no desktop).
* **Mapeamento de Botões e Interações:**
  1. `[Botão Filtro]` **"Todos (8)"**, **"🍎 Hortifrúti (4)"**, **"🍞 Padaria (2)"**, **"🍲 Refeições (1)"**, **"📦 Mercearia (1)"**
     - *Estilo:* Pílulas arredondadas (`rounded-xl text-xs`). O filtro ativo recebe `bg-emerald-700 text-white`, os inativos recebem `bg-white text-slate-700 border`.
     - *Ação:* Dispara `setCategoryFilter(categoria)` filtrando o array de doações sem recarregar a tela.
  2. `[Botão]` **"Ver Urgentes"** (no Banner de Alerta)
     - *Estilo:* Botão pequeno de atenção (`bg-amber-500 hover:bg-amber-600 text-white`).
     - *Ação:* Filtra apenas lotes com menos de 60 minutos restantes.
  3. `[Botão Card]` **"Detalhes"**
     - *Estilo:* Botão secundário de apoio (`bg-slate-100 text-slate-700 hover:bg-slate-200`).
     - *Ação:* Navega para `/lote/[id]`.
  4. `[Botão Card]` **"Reservar Agora"**
     - *Estilo:* Botão de ação primária (`bg-emerald-600 hover:bg-emerald-700 text-white`).
     - *Ação:* Abre o modal de reserva instantânea para confirmação.
  5. `[Botão Header]` **"+ Nova Doação"**
     - *Estilo:* CTA verde no header (`bg-emerald-600 text-white text-sm`).
     - *Ação:* Navega para `/doar`.

---

### 📊 Rota `/dashboard` — [Tela 03] Dashboard de Impacto Socioambiental ESG
* **Objetivo:** Painel de indicadores quantitativos de sustentabilidade com validação científica.
* **Componentes:**
  - `KpiCardsSection`: 3 Big Numbers (Kg salvos, refeições produzidas, CO2e mitigado).
  - `CategoryDistributionBar`: Barras de progresso proporcionais por tipo de alimento.
  - `TopDonorsTable`: Ranking dos feirantes e comércios mais generosos.
* **Mapeamento de Botões e Interações:**
  1. `[Botão Voltar]` **"← Voltar ao Feed"**
     - *Estilo:* Link de navegação contextual (`text-emerald-700 text-sm hover:underline`).
     - *Ação:* Retorna para `/feed`.
  2. `[Botão Tab]` **"Mês Atual" / "Acumulado Anual"**
     - *Estilo:* Toggle tabs de período analítico.
     - *Ação:* Recalcula os big numbers dinamicamente.

---

### 📦 Rota `/lote/[id]` — [Tela 04] Detalhes do Lote de Alimentos
* **Objetivo:** Especificações sanitárias completas, prazos improrrogáveis e garantia jurídica.
* **Componentes:**
  - `BatchVisualHeader`: Foto ou ilustração representativa em alta fidelidade.
  - `BatchSpecsGrid`: Condições de conservação, endereço exato da barraca, tolerância.
  - `LegalComplianceBox`: Selo de conformidade com a Lei Federal 14.016/2020.
* **Mapeamento de Botões e Interações:**
  1. `[Botão Primário]` **"🤝 Reservar Este Lote para Minha ONG"**
     - *Estilo:* Botão gigante verde (`bg-emerald-600 text-white font-bold py-4 rounded-2xl`).
     - *Ação:* Abre o modal de confirmação de reserva (Tela 05) e gera o código de resgate.
  2. `[Botão Secundário]` **"📍 Ver no Mapa"**
     - *Estilo:* Botão neutro (`bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4`).
     - *Ação:* Redireciona para `/mapa?highlight=[id]`.

---

### 🎟️ Componente Modal / Rota `/lote/[id]?reserved=true` — [Tela 05] Confirmação de Reserva & Código
* **Objetivo:** Garantia de resgate exclusivo e instruções para a equipe da ONG.
* **Componentes:**
  - `CelebrationIcon`: Ícone de checkmark verde vibrante.
  - `ClaimCodeBox`: Caixa tracejada com o código monospaçado `#REDE-4819`.
  - `PickupInstructionBox`: Resumo do feirante, endereço e tolerância máxima.
* **Mapeamento de Botões e Interações:**
  1. `[Botão]` **"📋 Copiar Código"**
     - *Estilo:* Botão pequeno de utilidade (`bg-emerald-100 text-emerald-800 hover:bg-emerald-200`).
     - *Ação:* Dispara `navigator.clipboard.writeText('#REDE-4819')` e emite toast de confirmação.
  2. `[Botão]` **"💬 Abrir WhatsApp do Feirante"**
     - *Estilo:* Botão de ação direta (`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5`).
     - *Ação:* Abre `https://wa.me/5511...` com mensagem pré-formatada.
  3. `[Botão]` **"Ir para Meu Painel de Coletas"**
     - *Estilo:* Botão de navegação secundária (`bg-slate-100 hover:bg-slate-200 text-slate-700`).
     - *Ação:* Redireciona para `/painel-ong`.

---

### 📝 Rota `/login` — [Tela 06] Cadastro / Autenticação Doador vs. ONG
* **Objetivo:** Entrada rápida no sistema e segmentação de perfil de usuário.
* **Componentes:**
  - `ProfileSegmentControl`: Alternador visual de dois estados (Doador vs. ONG).
  - `AuthForm`: Formulário com nome, telefone, ponto de feira e aceite da lei sanitária.
* **Mapeamento de Botões e Interações:**
  1. `[Botão Toggle]` **"🍎 Quero Doar"**
     - *Estilo:* Ativo com fundo branco, borda suave e sombra.
     - *Ação:* Alterna campos para perfil de feirante/comerciante.
  2. `[Botão Toggle]` **"🤝 Sou ONG / Cozinha"**
     - *Estilo:* Inativo cinza claro (`text-slate-600`).
     - *Ação:* Alterna campos para perfil de entidade comunitária (solicitando capacidade de refeições).
  3. `[Botão Submit]` **"Entrar no Painel do Doador →"** (ou "Entrar como ONG →")
     - *Estilo:* Botão full-width verde (`bg-emerald-600 text-white font-bold py-3.5`).
     - *Ação:* Realiza o login mockado/API e redireciona para o painel correspondente.

---

### ➕ Rota `/doar` — [Tela 07] Formulário Rápido do Feirante (Mobile-First)
* **Objetivo:** Permitir ao feirante publicar a sobra em menos de 45 segundos.
* **Componentes:**
  - `QuickCategorySelector`: 4 cartões com ícones gigantes (Hortifrúti, Padaria, Refeição, Mercearia).
  - `QuickKgChips`: Campo numérico com botões de atalho rápido (+5kg, +10kg, +25kg, +50kg).
  - `PickupTimeSelector`: 3 botões de horários típicos de término de feira ("Hoje às 14:00", "Hoje às 15:00", "Hoje às 18:00").
* **Mapeamento de Botões e Interações:**
  1. `[Botões Categoria]` **"🍎 Hortifrúti"**, **"🍞 Padaria"**, **"🍲 Refeição"**, **"📦 Outros"**
     - *Estilo:* Botões em caixa quadrada (`p-3 rounded-2xl`). O selecionado ganha borda dupla verde esmeralda.
     - *Ação:* Atualiza o estado `category`.
  2. `[Botões Atalho KG]` **"+5 kg"**, **"+10 kg"**, **"+25 kg"**, **"+50 kg"**
     - *Estilo:* Pílulas arredondadas (`text-xs font-bold px-3 py-1.5`).
     - *Ação:* Soma automaticamente ao valor do input de quantidade em kg.
  3. `[Botões Horário]` **"Hoje às 14:00"**, **"Hoje às 15:00"**, **"Hoje às 18:00"**
     - *Estilo:* Pílulas de seleção de horário de tolerância.
     - *Ação:* Define o campo `expiry_time`.
  4. `[Botão Submit]` **"🚀 Publicar Doação Imediatamente"**
     - *Estilo:* Botão gigante verde esmeralda com sombra (`bg-emerald-600 py-4`).
     - *Ação:* Envia os dados para a API (ou estado global) e redireciona para `/painel-doador`.

---

### 🧑‍💼 Rota `/painel-doador` — [Tela 08] Painel Administrativo do Doador
* **Objetivo:** Gestão de lotes ativos, validação de entrega e selo de compromisso.
* **Componentes:**
  - `DonorMetricsSummary`: Total de kg doados pelo feirante e pratos equivalentes gerados.
  - `CodeValidationBox`: Caixa em destaque para o feirante digitar o código fornecido pela ONG.
  - `StatusTabs`: Abas (Aguardando Retirada, Disponíveis no Mural, Histórico Concluído).
* **Mapeamento de Botões e Interações:**
  1. `[Botão]` **"Confirmar Baixa"** (ao lado do input `#REDE-XXXX`)
     - *Estilo:* Botão de validação (`bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-5`).
     - *Ação:* Valida o código do lote, muda o status para `CONCLUIDO` e atualiza as métricas.
  2. `[Botão]` **"Imprimir Selo"**
     - *Estilo:* Botão pequeno de honraria (`text-emerald-700 bg-emerald-50 border border-emerald-200`).
     - *Ação:* Dispara a impressão do certificado "Comerciante Amigo da Fome Zero".
  3. `[Botão Header]` **"+ Anunciar Nova Sobra"**
     - *Estilo:* CTA rápido de publicação.
     - *Ação:* Navega para `/doar`.

---

### 🏢 Rota `/painel-ong` — [Tela 09] Painel de Coletas e Logística da ONG
* **Objetivo:** Gerenciar as coletas reservadas, cronômetros de urgência e rotas para voluntários.
* **Componentes:**
  - `ActivePickupsList`: Cartões com cronômetro de tolerância regressivo em tempo real.
  - `HistoricalImpactCards`: Total de alimentos resgatados pela instituição.
* **Mapeamento de Botões e Interações:**
  1. `[Botão]` **"🗺️ Rota no Google Maps"**
     - *Estilo:* Botão neutro com ícone (`bg-slate-100 hover:bg-slate-200 text-slate-700`).
     - *Ação:* Abre o Google Maps com o endereço pré-carregado.
  2. `[Botão]` **"📲 Enviar ao Motorista"**
     - *Estilo:* Botão primário verde (`bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs`).
     - *Ação:* Copia texto formatado para o WhatsApp com código e endereço para envio ao voluntário de moto/carro.
  3. `[Botão Header]` **"🔍 Buscar Novas Doações"**
     - *Estilo:* Botão no cabeçalho.
     - *Ação:* Navega para `/feed`.

---

### 📍 Rota `/mapa` — [Tela 10] Mapa Georreferenciado de Feiras e Resgates
* **Objetivo:** Visualização geoespacial com pins interativos de doações ativas.
* **Componentes:**
  - `CartographicGrid`: Malha vetorial simulando o mapa de ruas e feiras da cidade.
  - `MapPins`: Pinos verdes animados (`pulse`) para lotes disponíveis e vermelhos para lotes urgentes.
  - `BottomPinSheet`: Card deslizante inferior que surge ao clicar em um pino.
* **Mapeamento de Botões e Interações:**
  1. `[Pins Interativos]` **Pino Feira Vila Mariana**, **Pino Bela Vista**, **Pino Paraíso**
     - *Estilo:* Círculos com ícones semânticos (🍎, 🍞, 🍲) e badge de proximidade.
     - *Ação:* Dispara `onSelectPin(ponto)` atualizando as informações no card inferior.
  2. `[Botão no Bottom Sheet]` **"Ver Detalhes →"**
     - *Estilo:* Botão verde esmeralda no card inferior.
     - *Ação:* Navega para `/lote/[id]` do ponto selecionado.
  3. `[Seletor de Raio]` **"Raio: 3 km"**, **"Raio: 5 km"**, **"Raio: 10 km"**
     - *Estilo:* Select nativo customizado.
     - *Ação:* Filtra os pinos exibidos de acordo com a distância.

---

## ⚡ 4. Gerenciamento de Estado & Camada de Dados

Para garantir robustez nas 3 horas de desenvolvimento e funcionamento perfeito tanto offline/mock quanto conectado à API do Render:

1. **Estado Centralizado de Doações (`useDonationsContext`):**
   - Mantém uma lista inicial realista com 8 lotes de doação pré-carregados (hortifrúti, padaria, marmitas).
   - Métodos expostos:
     * `addDonation(novaDoacao)`: Adiciona novo lote e salva no `localStorage`.
     * `reserveDonation(id, ongName)`: Gera o código `#REDE-XXXX` e altera o status para `RESERVADO`.
     * `completeDonation(id, code)`: Dá baixa no lote, computa quilos salvos e fecha o ciclo.
     * `filterDonations(categoria, status, busca)`: Retorna o subconjunto reativo filtrado.
2. **Cálculo Dinâmico das Métricas ESG:**
   - A cada lote cadastrado ou reservado, o totalizador global recalcula:
     $$\text{Kg Salvos} = \sum \text{quantity\_kg}$$
     $$\text{Pratos Nutritivos} = \text{Kg Salvos} \times 2$$
     $$\text{CO}_2\text{e Mitigado} = \text{Kg Salvos} \times 2{,}5$$

---

## ♿ 5. Checklist de Acessibilidade (WCAG 2.1 AA) e Qualidade

- [x] Contraste de cores testado: Texto `slate-900` (#0F172A) sobre fundo branco atinge razão **15.8:1** (excede o mínimo exigido de 4.5:1).
- [x] Área mínima de toque de botões em telas móveis: no mínimo **44x44px** para operação confortável por feirantes na feira.
- [x] Semântica HTML5: Uso rigoroso de `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<button>` e inputs rotulados com `<label>`.
- [x] Atributos ARIA: Modais com `role="dialog"`, alertas urgentes com `aria-live="polite"`.

---

## 🚀 6. Cronograma de Execução Front-end (Sprint 3 Horas)

1. **Passo 1 (Setup & Base):** Inicialização do projeto Next.js com Tailwind CSS e fontes Google.
2. **Passo 2 (Design System & Primitivos):** Implementação dos componentes base (`Navbar`, `Footer`, `Button`, `Badge`, `Card`).
3. **Passo 3 (Telas Centrais):** Construção da Landing Page (`/`), Feed (`/feed`) e Detalhes do Lote (`/lote/[id]`).
4. **Passo 4 (Fluxos Interativos):** Implementação do Formulário do Feirante (`/doar`), Modal de Código (`/lote/[id]?reserved=true`) e Painéis (`/painel-doador`, `/painel-ong`).
5. **Passo 5 (Dashboard & Mapa):** Construção do Painel ESG (`/dashboard`) com contadores vivos e Mapa (`/mapa`).
6. **Passo 6 (Build & Deploy):** Validação do build no Next.js (`npm run build`) e preparação para publicação na Vercel.
