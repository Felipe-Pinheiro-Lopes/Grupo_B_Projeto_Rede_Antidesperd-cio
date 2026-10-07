---
title: "05 - Histórias de Usuário (User Stories)"
project: "Rede Antidesperdício"
tags:
  - user-stories
  - agile
  - requisitos
  - bdd
---

# 📖 05 - Histórias de Usuário (User Stories)

> Documento base para a **Etapa 5 da Avaliação do Hackathon**.  
> Navegação: [[04 - Requisitos do Sistema (RF e RNF)|Requisitos]] | Próximo: [[06 - Prototipação e Arquitetura de Telas|Prototipação]]

---

## 📋 Mapeamento de Histórias com Critérios de Aceitação

Abaixo estão descritas as histórias de usuário derivadas dos requisitos do sistema, com critérios objetivos de validação em formato BDD (*Given-When-Then*).

---

### US01 — Publicação Rápida de Excedente por Feirante (Baseado em RF03)
**História:**
> **Como** feirante com produtos perecíveis no encerramento da feira,  
> **quero** cadastrar uma doação rapidamente pelo meu smartphone informando tipo, peso e horário limite,  
> **para que** instituições locais tomem conhecimento e possam recolher antes que os alimentos se deteriorem.

**Critérios de Aceitação:**
- [x] O formulário deve possuir campos intuitivos para: Título, Categoria (com seleção rápida), Quantidade em KG e Horário Limite de Retirada.
- [x] O feirante deve conseguir publicar o anúncio com no máximo 4 toques.
- [x] Após o envio, o lote deve aparecer imediatamente no feed com status `Disponível`.

---

### US02 — Visualização e Filtro de Lotes Disponíveis por ONG (Baseado em RF05, RF06)
**História:**
> **Como** coordenadora de uma cozinha solidária comunitária,  
> **quero** visualizar um feed atualizado de alimentos disponíveis filtrando por categoria e proximidade,  
> **para que** eu encontre os insumos mais urgentes para o preparo das refeições do dia.

**Critérios de Aceitação:**
- [x] O feed deve exibir cards contendo título, foto, quantidade em kg, endereço aproximado e contagem regressiva de tempo restante para coleta.
- [x] Deve ser possível filtrar por categorias (Hortifrúti, Padaria, Refeição Pronta, Mercearia).
- [x] O sistema deve exibir visualmente itens com tempo quase expirando com badge de alerta em destaque.

---

### US03 — Reserva Instantânea de Lote em Um Clique (Baseado em RF07)
**História:**
> **Como** responsável pela logística de uma ONG,  
> **quero** reservar um lote de doação com apenas um clique e receber um código de resgate,  
> **para que** outro estabelecimento não pegue o mesmo alimento e eu possa enviar o motorista/voluntário com segurança.

**Critérios de Aceitação:**
- [x] Ao clicar em "Reservar Doação", o status do lote deve mudar imediatamente para `Reservado`.
- [x] Um código alfanumérico único de resgate (ex: `#REDE-8921`) deve ser gerado e exibido na tela da ONG e do doador.
- [x] O botão de reserva deve ser desabilitado para outras ONGs assim que reservado.

---

### US04 — Confirmação e Baixa de Entrega (Baseado em RF08)
**História:**
> **Como** doador (comerciante),  
> **quero** dar baixa na entrega informando ou confirmando o código do lote quando a ONG comparecer,  
> **para que** o histórico de doações seja concluído e os dados de impacto computados.

**Critérios de Aceitação:**
- [x] O doador visualiza o botão "Confirmar Entrega / Dar Baixa" no detalhe do lote reservado.
- [x] O lote transiciona de `Reservado` para `Concluído`.
- [x] A quantidade de kg do lote é somada instantaneamente no Dashboard Global de Impacto.

---

### US05 — Painel de Indicadores de Impacto ESG em Tempo Real (Baseado em RF09)
**História:**
> **Como** gestor ou visitante da plataforma,  
> **quero** acompanhar um painel visual com o total de quilos salvos, refeições produzidas e $CO_2$ evitado,  
> **para que** eu comprove o impacto ecológico e social gerado pelo ecossistema da Rede Antidesperdício.

**Critérios de Aceitação:**
- [x] O dashboard deve apresentar cards com contadores animados de: Kg de comida salvos, Estimativa de pratos servidos e Kg de $CO_2e$ poupados.
- [x] Os dados devem se atualizar dinamicamente a cada nova doação concluída.
- [x] Deve incluir um gráfico ou barra comparativa por categoria de alimento doado.

---

### US06 — Perfil e Selo de Compromisso Social do Doador (Baseado em RF01, RF10)
**História:**
> **Como** proprietário de um restaurante ou feirante parceiro,  
> **quero** ter uma página de perfil com o histórico de doações e um selo de "Comerciante Amigo da Fome Zero",  
> **para que** meus clientes reconheçam meu compromisso com a sustentabilidade e a comunidade.

**Critérios de Aceitação:**
- [x] A página exibe nome fantasia, endereço, badges de conquistas (ex: "Mais de 100kg doados") e selo oficial de conformidade com a Lei 14.016/2020.
- [x] Permite compartilhar o impacto do estabelecimento nas redes sociais.

---

### US07 — Cadastro Simplificado de Entidades Assistenciais (Baseado em RF02)
**História:**
> **Como** líder de um abrigo comunitário,  
> **quero** me cadastrar de forma simplificada com os dados da entidade e capacidade de atendimento,  
> **para que** eu possa ter autorização imediata para reservar lotes de alimentos na região.

**Critérios de Aceitação:**
- [x] Formulário limpo solicitando: Razão Social/Nome da ONG, CNPJ ou declaração comunitária, responsável e telefone WhatsApp.
- [x] Acesso imediato à área de reservas após o preenchimento.

---

### US08 — Alertas e Destaques Visuais de Urgência (Baseado em RF05, RNF08)
**História:**
> **Como** voluntário de coleta de uma ONG,  
> **quero** bater o olho no feed e identificar quais doações vencem nos próximos 60 minutos,  
> **para que** a equipe priorize os resgates mais críticos e impeça o apodrecimento do alimento.

**Critérios de Aceitação:**
- [x] Lotes com menos de 2 horas restantes para coleta devem exibir tags em cor de destaque (ex: âmbar/laranja "Urgente: Vence em breve").
- [x] O feed permite ordenação por "Mais Urgentes Primeiro".

---

### US09 — Acessibilidade e Alto Contraste para Uso sob Sol Forte (Baseado em RNF02, RNF08)
**História:**
> **Como** feirante operando na rua sob a luz solar intensa,  
> **quero** uma interface com tipografia legível, botões grandes e excelente contraste de cores,  
> **para que** eu consiga ler e operar o sistema mesmo sob claridade externa extrema.

**Critérios de Aceitação:**
- [x] Contraste de cores em conformidade estrita com a norma WCAG 2.1 AA.
- [x] Botões com área de toque mínima recomendada de 48x48px no mobile.

---

### US10 — Registro de Auditoria e Transparência de Dados (Baseado em RF10)
**História:**
> **Como** fiscal de políticas públicas ou auditor ESG,  
> **quero** consultar um relatório de auditoria pública das doações intermediadas,  
> **para que** seja possível auditar a lisura do destino dos alimentos e validar o cumprimento do ODS 2 e 12.3.

**Critérios de Aceitação:**
- [x] Página pública de transparência exibindo tabela de lotes resgatados, data, peso e categoria (preservando sigilo de beneficiários pessoas físicas).
- [x] Botão para exportar dados resumidos em formato legível.
