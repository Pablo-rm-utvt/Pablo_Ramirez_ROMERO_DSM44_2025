const axios = require("axios");

const API_BASE = "http://localhost:3000/api";
const TOTAL_EMPLEADOS = 1000;
const YEAR = 2025;
const EMPLEADOS = [];

const AREAS = ["OFICINA", "PRODUCCION", "INVENTARIO"];
const TURNOS = ["MATUTINO", "VESPERTINO", "NOCTURNO", "MIXTO"];
const STATUS_ASISTENCIA = ["EN_TURNO", "FINALIZADO"];

const NOMBRES = [
  "Juan", "Carlos", "Luis", "Miguel", "Jose", "Jorge", "Felipe", "Hector",
  "Marco", "Ricardo", "Fernando", "Pablo", "Rafael", "Alberto", "Andres",
  "Roberto", "Eduardo", "Cristian", "Mario", "Diego", "Omar", "Sergio",
  "Francisco", "Adrian", "Hernan", "Erick", "Kevin", "Oscar", "Manuel",
  "Víctor", "Alan", "Emilio", "Ramiro", "Leonardo", "Esteban", "Bruno",
  "Mauricio", "Gustavo", "Elías", "Tomás",
];

const APELLIDOS = [
  "Hernandez", "Martinez", "Gomez", "Perez", "Lopez", "Garcia",
  "Rodriguez", "Sanchez", "Ramirez", "Cruz", "Torres", "Rivera",
  "Gonzalez", "Flores", "Vargas", "Castillo", "Ortega", "Ruiz",
  "Aguilar", "Chavez", "Dominguez", "Silva", "Navarro", "Salazar",
  "Mendoza", "Ponce", "Morales", "Soto", "Camacho", "Cortés",
  "Arias", "Palacios", "Estrada", "Valdez", "Montoya", "Ramos"
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generarNombreCompleto = () => {
  return {
    nombre: random(NOMBRES),
    apellido_p: random(APELLIDOS),
    apellido_m: random(APELLIDOS)
  }
}

const generarFechas2025 = () => {
  const fechas = [];
  const start = new Date(`${YEAR}-01-01T00:00:00Z`);
  for (let d = 0; d < 365; d++) {
    const cur = new Date(start);
    cur.setUTCDate(cur.getUTCDate() + d);
    fechas.push(cur.toISOString().slice(0, 10));
  }
  return fechas;
}

const FECHAS_2025 = generarFechas2025();

const makeISO = (fecha, hour, minute) => {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(y, m - 1, d, hour, minute, 0).toISOString();
}
const safePost = async (url, body, maxIntentos = 10, delayMs = 1000) => {
  let intento = 0;

  while (intento < maxIntentos) {
    try {
      return await axios.post(url, body);
    } catch (e) {
      intento++;
      if (intento === maxIntentos) {
        console.error(`Fallo Final después de ${maxIntentos} intentos -> ${url}:`, e.message);
        return null;
      }
      console.warn(`Error de red (Intento ${intento}/${maxIntentos}) -> ${url}. Reintentando en ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
};

const registerA_P = async (fecha, empleado) => {
  const entradaISO = makeISO(fecha, 8, 0);
  const salidaISO = makeISO(fecha, 17, 0);
  const fechaEntrada = new Date(entradaISO);
  const fechaSalida = new Date(salidaISO);
  const diferenciaEnMilisegundos = fechaSalida - fechaEntrada;
  const diferenciaEnHoras = diferenciaEnMilisegundos / 3600000;
  const register_asistencia = await safePost(`${API_BASE}/empleados/create-asistencia`, {
    fecha,
    horaEntrada: entradaISO,
    horaSalida: salidaISO,
    entrada: entradaISO,
    salida: salidaISO,
    status: random(STATUS_ASISTENCIA),
    empleado: empleado,
    horasTrabajadas: diferenciaEnHoras,
  });
  const register_produccion = await safePost(`${API_BASE}/empleados/create-produccion`, {
    fecha,
    turno: random(TURNOS),
    unidadesProducidas: Math.floor(Math.random() * 3000),
    empleado: empleado
  });
  return { register_asistencia, register_produccion };
}

const main = async () => {

  for (let i = 1; i <= TOTAL_EMPLEADOS; i++) {
    const dataNombre = generarNombreCompleto();

    const empleadoPayload = {
      nombre: dataNombre.nombre,
      apellido_p: dataNombre.apellido_p,
      apellido_m: dataNombre.apellido_m,
      area: random(AREAS),
      turno: random(TURNOS),
      salarioDiario: 200 + Math.random() * 350,
      activo: true
    };

    const register = await safePost(`${API_BASE}/empleados`, empleadoPayload);

    const data = register.data;

    console.log(`Registro empleado ${data.id_empleado}: ${data.nombre} ${data.apellido_p} ${data.apellido_m}`);

    EMPLEADOS.push(data.id_empleado);
  }

  if (EMPLEADOS.length == 0) return null;

  for (const fecha of FECHAS_2025) {
    for (const empleado of EMPLEADOS) {
      let registros = await registerA_P(fecha, empleado);
      if (registros?.register_asistencia && registros?.register_produccion) {
        let asistencia = registros.register_asistencia.data;
        let produccion = registros.register_produccion.data;
        console.log(`Registro asistencia ${asistencia.id_reg_a}: ${empleado} ${asistencia.fecha} ${asistencia.horaEntrada}`);
        console.log(`Registro produccion ${produccion.id_reg_p}: ${empleado} ${produccion.fecha} ${produccion.unidadesProducidas}`);
      }
    }
  }
}

main();