# 🥦 Rede Antidesperdício — Backend REST API Node.js / Express / SQLite

API REST em **Node.js** com **Express** e banco de dados **SQLite** (`rede_antidesperdicio.db`) desenvolvida para alimentar a plataforma web da **Rede Antidesperdício — Conexão Fome Zero (ODS 2)**.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js (v18+)
- **Framework Web:** Express.js
- **Banco de Dados:** SQLite (`sql.js` / WebAssembly com suporte a salvamento binário em arquivo local `.db`)
- **CORS:** Configurado para acesso cross-origin da aplicação Next.js / React (porta 3000)
- **Variáveis de Ambiente:** `dotenv`

---

## 📋 Cards Desenvolvidos & Atendidos

| Card | Título | Endpoint / Recurso | Status |
|---|---|---|---|
| **34** | Inicializar servidor Node.js com Express | `package.json` e `src/server.js` na porta 3001 | ✅ Concluído |
| **35** | Configurar banco de dados SQLite local | `rede_antidesperdicio.db` criado automaticamente | ✅ Concluído |
| **36** | Modelar tabela de Doações (`donations`) | Schema com `id`, `title`, `category`, `quantity_kg`, `expiry_time`, `status`, `code`, etc. | ✅ Concluído |
| **37** | Implementar endpoint `GET /api/donations` | Listagem com filtros por `category`, `status`, `search`, `donorName` | ✅ Concluído |
| **38** | Implementar endpoint `POST /api/donations` | Cadastro de nova doação de excedentes de alimentos | ✅ Concluído |
| **39** | Implementar endpoint `PATCH /api/donations/:id/reserve` | Reserva por ONG e geração do código `#REDE-XXXX` | ✅ Concluído |
| **40** | Implementar endpoint `GET /api/metrics/esg` | Cálculo de total em kg salvos, pratos equivalentes e $\text{CO}_2\text{e}$ evitado | ✅ Concluído |
| **Bônus** | Endpoint `GET /api/donations/:id` | Consulta detalhada por lote específico | ✅ Concluído |
| **Bônus** | Endpoint `PATCH /api/donations/:id/complete` | Baixa na doação via validação do código de resgate | ✅ Concluído |

---

## 🚀 Como Executar o Projeto Backend

### 1. Instalar as dependências
```bash
cd Back
npm install
```

### 2. Popular o banco com dados iniciais (Seeding)
```bash
npm run seed
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
# ou
npm start
```
O servidor estará rodando em: `http://localhost:3001`

---

## 🔌 Documentação dos Endpoints REST

### 1. `GET /api/donations`
Retorna a lista de doações ativas.
* **Query Parameters opcionais:**
  - `category`: `'hortifruti'`, `'padaria'`, `'refeicao'`, `'mercearia'`
  - `status`: `'DISPONIVEL'`, `'RESERVADO'`, `'CONCLUIDO'`
  - `search`: Busca por termo no título, doador ou localização
  - `limit`: Quantidade máxima de registros retornados

**Exemplo de resposta (200 OK):**
```json
[
  {
    "id": "lote-1",
    "title": "Caixa de Tomates Maduros e Folhagens Frescas",
    "category": "hortifruti",
    "quantityKg": 25,
    "donorName": "Barraca do Seu Zé",
    "donorType": "Feirante",
    "location": "Rua França Pinto, 450 (Feira Vila Mariana)",
    "phoneContact": "(11) 98765-4321",
    "expiryTime": "Hoje até 14:15",
    "status": "DISPONIVEL",
    "imageUrl": "🍅🥬",
    "description": "Tomates em estágio avançado de maturação...",
    "createdAt": "2026-10-08T00:00:00.000Z"
  }
]
```

---

### 2. `POST /api/donations`
Cadastra um novo lote de doação.
* **Request Body:**
```json
{
  "title": "20 kg de Hortifrúti Misto",
  "category": "hortifruti",
  "quantityKg": 20,
  "donorName": "Barraca do Seu Zé",
  "donorType": "Feirante",
  "location": "Feira Vila Mariana (Rua França Pinto)",
  "phoneContact": "(11) 98765-4321",
  "expiryTime": "Hoje até 14:15",
  "description": "3 caixas de verduras mistas e bananas maduras",
  "imageUrl": "🍅🥬"
}
```

---

### 3. `PATCH /api/donations/:id/reserve`
Reserva um lote de doação para uma ONG e gera o código alfanumérico `#REDE-XXXX`.
* **Request Body:**
```json
{
  "reservedByOng": "ONG Banco de Alimentos SP"
}
```
* **Exemplo de Resposta (200 OK):**
```json
{
  "message": "Reserva realizada com sucesso!",
  "reservationCode": "#REDE-4819",
  "donation": {
    "id": "lote-1",
    "status": "RESERVADO",
    "reservationCode": "#REDE-4819",
    "reservedByOng": "ONG Banco de Alimentos SP"
  }
}
```

---

### 4. `PATCH /api/donations/:id/complete`
Confirma a baixa/entrega da doação mediante o código fornecido.
* **Request Body:**
```json
{
  "code": "#REDE-4819"
}
```

---

### 5. `GET /api/metrics/esg`
Retorna as métricas socioambientais consolidadas com base nos coeficientes da FAO.
* **Exemplo de Resposta (200 OK):**
```json
{
  "totalKgSaved": 133,
  "mealsServed": 266,
  "co2AvoidedKg": 332.5,
  "activeDonationsCount": 5,
  "reservedDonationsCount": 0,
  "completedDonationsCount": 0,
  "coefficients": {
    "MEALS_PER_KG": 2,
    "CO2_AVOIDED_PER_KG": 2.5
  }
}
```
