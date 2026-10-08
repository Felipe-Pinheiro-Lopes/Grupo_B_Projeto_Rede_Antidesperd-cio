---
title: "02 - Benchmarking de Soluções Existentes"
project: "Rede Antidesperdício"
tags:
  - benchmarking
  - mercado
  - concorrencia
  - esg
---

# 🔍 02 - Benchmarking de Soluções Existentes

> Documento base para a **Etapa 2 da Avaliação do Hackathon**.  
> Navegação: [[01 - Definição do Problema e ODS|Definição do Problema]] | Próximo: [[03 - Proposta de Valor e Impacto ESG|Proposta de Valor]]

---

## 📊 Análise das 5 Soluções do Setor

Para construir uma solução de vanguarda com alto impacto socioambiental e experiência de usuário fluida, analisamos 5 plataformas consolidadas no Brasil e no mundo:

---

### 1. Too Good To Go (Global)
* **Funcionalidades:** Marketplace B2C geolocalizado no qual padarias, hotéis e restaurantes vendem "Sacolas Surpresa" (*Magic Bags*) de excedentes com até 70% de desconto próximo ao horário de fechamento.
* **Público-alvo:** Consumidores finais conscientes (busca por economia e sustentabilidade) e estabelecimentos comerciais.
* **Pontos Positivos:**
  - Interface extremamente polida, intuitiva e gamificada;
  - Geolocalização precisa com filtros por horário de coleta;
  - Contador de impacto individual e coletivo ($CO_2e$ poupado).
* **Pontos Negativos:**
  - Modelo 100% comercial (venda direta para quem tem cartão de crédito), sem foco filantrópico ou direcionamento para populações em extrema vulnerabilidade;
  - Não atende feirantes informais nem instituições sem fins lucrativos (ONGs).
* **Características como Referência:**
  - A interface de catálogo com contadores de "restam poucas unidades" e badges de horários rígidos de retirada.

---

### 2. Comida Invisível (Brasil)
* **Funcionalidades:** Plataforma social certificada pela FAO/ONU que conecta empresas geradoras de alimentos a ONGs cadastradas que atendem pessoas em vulnerabilidade.
* **Público-alvo:** Indústrias alimentícias, redes de supermercados, atacadistas e ONGs assistenciais.
* **Pontos Positivos:**
  - Foco exclusivo em doação humanitária e combate à fome no Brasil;
  - Alinhamento rigoroso com a Lei Federal 14.016/2020 e segurança jurídica;
  - Rastreabilidade dos lotes doados.
* **Pontos Negativos:**
  - Processo burocrático e moroso de validação de ONGs e doadores;
  - Foco em grandes volumes corporativos; pouca ou nenhuma penetração em feiras livres de rua e feirantes autônomos;
  - Interface desktop mais densa, pouco adaptada para ações rápidas no celular do feirante.
* **Características como Referência:**
  - Termos de responsabilidade de integridade do alimento e protocolo de segurança da doação.

---

### 3. OLIO (Reino Unido / Internacional)
* **Funcionalidades:** Aplicativo comunitário P2P (*peer-to-peer*) onde vizinhos e comércios locais fotografam itens alimentícios e não alimentícios que sobram em casa para quem quiser retirar de graça.
* **Público-alvo:** Comunidade local, vizinhos e voluntários de sustentabilidade (*Food Waste Heroes*).
* **Pontos Positivos:**
  - Extrema agilidade: tira a foto, coloca a descrição e em 20 segundos o item está publicado;
  - Forte engajamento comunitário e senso de vizinhança;
  - Sistema de mensagens em tempo real integrado para combinar a retirada.
* **Pontos Negativos:**
  - Falta de foco em entidades organizadas (ONGs) — o alimento pode ir para qualquer vizinho curioso e não necessariamente para quem passa fome;
  - Não calcula a métrica nutricional e calórica para cozinhas comunitárias.
* **Características como Referência:**
  - A simplicidade radical do formulário de anúncio de doação ("Foto rápida + Título + Quantidade + Horário").

---

### 4. Goodr (Estados Unidos)
* **Funcionalidades:** Plataforma de logística e tecnologia sustentável para empresas que mede o descarte de resíduos, gerencia a retirada e redistribui para ONGs, gerando relatórios de deduções fiscais e impacto ESG.
* **Público-alvo:** Grandes corporações, aeroportos, estádios de futebol e eventos corporativos.
* **Pontos Positivos:**
  - Dashboard analítico espetacular de métricas ESG (Quilos de comida, galões de água economizados, emissões de $CO_2$ evitadas);
  - Geração automática de relatórios de sustentabilidade para investidores.
* **Pontos Negativos:**
  - Custo de implantação elevado e contratos complexos;
  - Inacessível para o microempreendedor e feirante informal brasileiro.
* **Características como Referência:**
  - Painel de Indicadores ESG visual no Front-end, com gráficos interativos de impacto ecológico e social.

---

### 5. Connecting Food (França / Europa)
* **Funcionalidades:** Plataforma baseada em Blockchain e auditoria de cadeia de suprimentos para rastreabilidade de alimentos e gestão de excedentes agroalimentares.
* **Público-alvo:** Cooperativas agrícolas, produtores rurais e varejistas.
* **Pontos Positivos:**
  - Transparência total da rota do alimento;
  - Confiabilidade nos dados de procedência e validade.
* **Pontos Negativos:**
  - Complexidade tecnológica excessiva para o contexto de um feirante em feira de rua;
  - Curva de aprendizado íngreme para o usuário ponta.
* **Características como Referência:**
  - Selo visual de conformidade e status transparente do lote (Disponível -> Reservado -> Coletado).

---

## 🏆 Matriz Comparativa & Características Adotadas na Nossa Solução

| Plataforma | Foco Social Real (Fome Zero) | Acesso Feirante Informal | Agilidade no Cadastro (<1 min) | Dashboard ESG Visual | Reserva Instantânea |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Too Good To Go** | ❌ (B2C Pago) | ❌ | 🟡 | 🟢 | 🟢 |
| **Comida Invisível** | 🟢 | ❌ | ❌ (Burocrático) | 🟡 | ❌ |
| **OLIO** | 🟡 (P2P Genérico) | 🟢 | 🟢 | ❌ | 🟢 |
| **Goodr** | 🟢 | ❌ | ❌ (Enterprise) | 🟢 | 🟡 |
| **Connecting Food** | 🟡 | ❌ | ❌ | 🟢 | ❌ |
| **⭐ Rede Antidesperdício** | **🟢 100% ONGs** | **🟢 Feirantes & Varejo** | **🟢 Ultra-ágil (Mobile First)** | **🟢 Dashboard Integrado** | **🟢 1-Clique** |

### 🎯 Síntese: O que incorporamos como referência:
1. **Da OLIO:** O fluxo ultra-rápido de publicação de doação sem atritos desnecessários, ideal para feirantes no calor do fechamento da barraca.
2. **Da Too Good To Go:** O card visual de lote com contagem regressiva de horário de retirada e badges de status.
3. **Do Comida Invisível:** O canal direcionado estritamente para ONGs e cozinhas solidárias cadastradas, garantindo que o alimento chegue à mesa de quem precisa.
4. **Da Goodr:** O painel dinâmico ESG no Front-end com métricas vivas de quilogramas resgatados, refeições equivalentes e $CO_2$ evitado.
5. **Da Connecting Food:** A linha do tempo de status simples e transparente do ciclo de vida da doação.
