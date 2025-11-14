const axios = require("axios");

// === CONFIGURACIÓN ===
const API_URL = "http://localhost:3000/api/sensor";
const TOTAL_RECORDS = 200000;

// === ENUM ===
const EstadoSensor = {
  activo: "Activo",
  inactivo: "Inactivo",
};

// === FUNCIONES AUXILIARES ===
const random = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

function randomDateWithin(start, end) {
  const randomTime = random(start.getTime(), end.getTime());
  return new Date(randomTime);
}

// === FUNCIÓN PRINCIPAL ===
async function sendSensorData() {
  console.log(`Iniciando envío de ${TOTAL_RECORDS} registros...`);

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const recordsPerDay = Math.floor(TOTAL_RECORDS / 7);

  let count = 0;

  for (let i = 0; i < 7; i++) {
    const dayEnd = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(dayEnd.getTime() - 24 * 60 * 60 * 1000);

    const batch = [];

    for (let j = 0; j < recordsPerDay; j++) {
      const distacia_cm = random(5, 400); // ⚠️ sin “n” por compatibilidad
      const temperatura_c = random(15, 40);
      const temperatura_fg = parseFloat(((temperatura_c * 9) / 5 + 32).toFixed(2));
      const distacia_inch = parseFloat((distacia_cm / 2.54).toFixed(2));

      batch.push({
        fecha: randomDateWithin(dayStart, dayEnd).toISOString(), // formato ISO correcto
        distacia_cm,
        distacia_inch,
        temperatura_c,
        temperatura_fg,
        estado: Math.random() > 0.2 ? EstadoSensor.activo : EstadoSensor.inactivo,
      });
    }

    await sendBatch(batch);
    count += batch.length;
    console.log(`Día ${i + 1}: Enviados ${batch.length} registros (total: ${count})`);
  }

  console.log("Envío completo de 100,000 registros");
}

// === FUNCIÓN PARA ENVIAR LOTES ===
async function sendBatch(batch) {
  const chunkSize = 1000;
  for (let i = 0; i < batch.length; i += chunkSize) {
    const chunk = batch.slice(i, i + chunkSize);

    const requests = chunk.map((data) =>
      axios.post(API_URL, data).catch((err) => {
        console.error("Error en envío:", err.response?.status || err.message);
        if (err.response?.data) console.error("Detalles del error:", err.response.data);
      })
    );

    await Promise.all(requests);
  }
}

sendSensorData().catch((err) => console.error("Error general:", err));
