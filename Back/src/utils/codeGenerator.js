/**
 * Gera um código de resgate exclusivo no formato #REDE-XXXX
 * Exemplo: #REDE-4819
 */
function generateReservationCode() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `#REDE-${randomNum}`;
}

/**
 * Converte registro do banco de dados (snake_case) em objeto DTO do frontend (camelCase)
 */
function mapDonationToDTO(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    quantityKg: Number(row.quantity_kg),
    donorName: row.donor_name,
    donorType: row.donor_type || 'Feirante',
    location: row.location,
    phoneContact: row.phone_contact || '',
    expiryTime: row.expiry_time,
    status: row.status,
    reservationCode: row.reservation_code || undefined,
    reservedByOng: row.reserved_by_ong || undefined,
    imageUrl: row.image_url || '🍎',
    description: row.description || '',
    createdAt: row.created_at
  };
}

module.exports = {
  generateReservationCode,
  mapDonationToDTO
};
