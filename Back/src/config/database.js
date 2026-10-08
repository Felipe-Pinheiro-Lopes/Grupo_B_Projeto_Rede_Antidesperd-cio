const fs = require('fs');
const path = require('path');

const DB_FILE = process.env.DB_PATH || path.join(__dirname, '../../rede_antidesperdicio.db');

let memoryDb = {
  donations: []
};

// Carrega ou inicializa o arquivo rede_antidesperdicio.db
async function initDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      try {
        memoryDb = JSON.parse(content);
        if (!memoryDb.donations) {
          memoryDb.donations = [];
        }
      } catch (e) {
        // Se o arquivo for binário ou corrompido, reseta para estrutura SQLite/JSON válida
        memoryDb = { donations: [] };
        saveDatabase();
      }
    } else {
      memoryDb = { donations: [] };
      saveDatabase();
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    memoryDb = { donations: [] };
  }
  return memoryDb;
}

// Salva o banco no arquivo físico de disco rede_antidesperdicio.db
function saveDatabase() {
  try {
    const data = JSON.stringify(memoryDb, null, 2);
    fs.writeFileSync(DB_FILE, data, 'utf-8');
  } catch (error) {
    console.error('Erro ao salvar no arquivo rede_antidesperdicio.db:', error);
  }
}

// Executar consulta SQL simulada (SELECT)
function query(sql, params = []) {
  let list = [...memoryDb.donations];

  // Filtros
  if (sql.includes('WHERE 1=1')) {
    let paramIndex = 0;

    if (sql.includes('category = ?')) {
      const categoryVal = params[paramIndex++];
      list = list.filter((item) => item.category === categoryVal);
    }

    if (sql.includes('status = ?')) {
      const statusVal = params[paramIndex++];
      list = list.filter((item) => item.status === statusVal);
    }

    if (sql.includes('donor_name LIKE ?')) {
      const donorPattern = params[paramIndex++].replace(/%/g, '').toLowerCase();
      list = list.filter((item) => (item.donor_name || '').toLowerCase().includes(donorPattern));
    }

    if (sql.includes('reserved_by_ong LIKE ?')) {
      const ongPattern = params[paramIndex++].replace(/%/g, '').toLowerCase();
      list = list.filter((item) => (item.reserved_by_ong || '').toLowerCase().includes(ongPattern));
    }

    if (sql.includes('title LIKE ? OR location LIKE ?')) {
      const searchPattern = params[paramIndex].replace(/%/g, '').toLowerCase();
      paramIndex += 4; // consume the 4 repeated patterns
      list = list.filter((item) =>
        (item.title || '').toLowerCase().includes(searchPattern) ||
        (item.location || '').toLowerCase().includes(searchPattern) ||
        (item.donor_name || '').toLowerCase().includes(searchPattern) ||
        (item.description || '').toLowerCase().includes(searchPattern)
      );
    }
  } else if (sql.includes('WHERE id = ?')) {
    const idVal = params[0];
    list = list.filter((item) => item.id === idVal);
  }

  // Ordenação
  if (sql.includes('ORDER BY created_at DESC')) {
    list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }

  // Limit
  if (sql.includes('LIMIT ?')) {
    const limitVal = params[params.length - 1];
    if (typeof limitVal === 'number') {
      list = list.slice(0, limitVal);
    }
  }

  return list;
}

// Retorna resultado único
function get(sql, params = []) {
  if (sql.includes('COALESCE(SUM(quantity_kg), 0) AS totalKg')) {
    const total = memoryDb.donations.reduce((acc, curr) => acc + (Number(curr.quantity_kg) || 0), 0);
    return { totalKg: total };
  }

  if (sql.includes("COUNT(*) AS cnt FROM donations WHERE status = 'DISPONIVEL'")) {
    const cnt = memoryDb.donations.filter((d) => d.status === 'DISPONIVEL').length;
    return { cnt };
  }

  if (sql.includes("COUNT(*) AS cnt FROM donations WHERE status = 'RESERVADO'")) {
    const cnt = memoryDb.donations.filter((d) => d.status === 'RESERVADO').length;
    return { cnt };
  }

  if (sql.includes("COUNT(*) AS cnt FROM donations WHERE status = 'CONCLUIDO'")) {
    const cnt = memoryDb.donations.filter((d) => d.status === 'CONCLUIDO').length;
    return { cnt };
  }

  if (sql.includes('COUNT(*) AS cnt FROM donations')) {
    return { cnt: memoryDb.donations.length };
  }

  const rows = query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

// Executar alterações no banco de dados (INSERT / UPDATE / DELETE)
function run(sql, params = []) {
  if (sql.includes('DELETE FROM donations')) {
    memoryDb.donations = [];
    saveDatabase();
    return;
  }

  if (sql.startsWith('INSERT INTO donations')) {
    const [
      id, title, category, quantity_kg, donor_name, donor_type, location,
      phone_contact, expiry_time, status, description, image_url, created_at
    ] = params;

    const newRow = {
      id,
      title,
      category,
      quantity_kg: Number(quantity_kg),
      donor_name,
      donor_type: donor_type || 'Feirante',
      location,
      phone_contact: phone_contact || '',
      expiry_time,
      status: status || 'DISPONIVEL',
      reservation_code: null,
      reserved_by_ong: null,
      description: description || '',
      image_url: image_url || '🍎',
      created_at: created_at || new Date().toISOString()
    };

    memoryDb.donations.push(newRow);
    saveDatabase();
    return;
  }

  if (sql.includes('UPDATE donations')) {
    if (sql.includes("SET status = 'RESERVADO'")) {
      const [code, ongName, id] = params;
      const target = memoryDb.donations.find((d) => d.id === id);
      if (target) {
        target.status = 'RESERVADO';
        target.reservation_code = code;
        target.reserved_by_ong = ongName;
        saveDatabase();
      }
      return;
    }

    if (sql.includes("SET status = 'CONCLUIDO'")) {
      const [id] = params;
      const target = memoryDb.donations.find((d) => d.id === id);
      if (target) {
        target.status = 'CONCLUIDO';
        saveDatabase();
      }
      return;
    }
  }
}

module.exports = {
  initDatabase,
  query,
  get,
  run,
  saveDatabase,
  DB_FILE
};
