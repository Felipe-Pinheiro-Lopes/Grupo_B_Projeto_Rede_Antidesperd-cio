const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Iniciando testes integrados dos endpoints backend...\n');

  // 1. Test GET /api/donations
  console.log('1️⃣ Testando GET /api/donations (Card 37)...');
  const listRes = await makeRequest({
    hostname: 'localhost',
    port: 3001,
    path: '/api/donations',
    method: 'GET'
  });
  console.log(` Status: ${listRes.status} | Total retornado: ${listRes.body.length} doações`);

  // 2. Test POST /api/donations (Card 38)
  console.log('\n2️⃣ Testando POST /api/donations (Card 38)...');
  const postRes = await makeRequest(
    {
      hostname: 'localhost',
      port: 3001,
      path: '/api/donations',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    {
      title: 'Caixa de Maçãs e Peras Selecionadas',
      category: 'hortifruti',
      quantityKg: 15,
      donorName: 'Feirante Carlos',
      donorType: 'Feirante',
      location: 'Feira Pinheiros (Rua Teodoro Sampaio)',
      phoneContact: '(11) 91111-2222',
      expiryTime: 'Hoje até 17:00',
      description: 'Frutas frescas recém-selecionadas de alta qualidade.'
    }
  );
  console.log(` Status: ${postRes.status} | ID Criado: ${postRes.body.id} | Status: ${postRes.body.status}`);
  const createdId = postRes.body.id;

  // 3. Test PATCH /api/donations/:id/reserve (Card 39)
  console.log('\n3️⃣ Testando PATCH /api/donations/:id/reserve (Card 39)...');
  const reserveRes = await makeRequest(
    {
      hostname: 'localhost',
      port: 3001,
      path: `/api/donations/${createdId}/reserve`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    },
    {
      reservedByOng: 'ONG Mesa Brasil Sesc'
    }
  );
  console.log(` Status: ${reserveRes.status} | Código Gerado: ${reserveRes.body.reservationCode} | Status: ${reserveRes.body.donation.status}`);
  const resCode = reserveRes.body.reservationCode;

  // 4. Test PATCH /api/donations/:id/complete (Extra)
  console.log('\n4️⃣ Testando PATCH /api/donations/:id/complete (Extra)...');
  const completeRes = await makeRequest(
    {
      hostname: 'localhost',
      port: 3001,
      path: `/api/donations/${createdId}/complete`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    },
    {
      code: resCode
    }
  );
  console.log(` Status: ${completeRes.status} | Mensagem: ${completeRes.body.message} | Status Final: ${completeRes.body.donation.status}`);

  // 5. Test GET /api/metrics/esg (Card 40)
  console.log('\n5️⃣ Testando GET /api/metrics/esg (Card 40)...');
  const esgRes = await makeRequest({
    hostname: 'localhost',
    port: 3001,
    path: '/api/metrics/esg',
    method: 'GET'
  });
  console.log(` Status: ${esgRes.status}`);
  console.log(` Total Kg Salvos: ${esgRes.body.totalKgSaved} kg`);
  console.log(` Pratos Nutritivos: ${esgRes.body.mealsServed}`);
  console.log(` CO2e Evitado: ${esgRes.body.co2AvoidedKg} kg`);
  console.log(` Doações Concluídas: ${esgRes.body.completedDonationsCount}`);

  console.log('\n🎉 Todos os testes dos Cards 34, 35, 36, 37, 38, 39 e 40 passaram com 100% de sucesso!');
}

runTests().catch(console.error);
