const fs = require("fs");

const TOTAL_EMPLEADOS = 8000;
const YEAR = 2025;

const AREAS = ["OFICINA", "PRODUCCION", "INVENTARIO"];
const TURNOS = ["MATUTINO", "VESPERTINO", "NOCTURNO", "MIXTO"];
const STATUS_ASISTENCIA = ["EN_TURNO", "FINALIZADO"];

const NOMBRES = [
  "Juan","Carlos","Luis","Miguel","Jose","Jorge","Felipe","Hector",
  "Marco","Ricardo","Fernando","Pablo","Rafael","Alberto","Andres",
  "Roberto","Eduardo","Cristian","Mario","Diego","Omar","Sergio",
  "Francisco","Adrian","Hernan","Erick","Kevin","Oscar","Manuel",
  "Víctor","Alan","Emilio","Ramiro","Leonardo","Esteban","Bruno",
  "Mauricio","Gustavo","Elías","Tomás",
];

const APELLIDOS = [
  "Hernandez","Martinez","Gomez","Perez","Lopez","Garcia",
  "Rodriguez","Sanchez","Ramirez","Cruz","Torres","Rivera",
  "Gonzalez","Flores","Vargas","Castillo","Ortega","Ruiz",
  "Aguilar","Chavez","Dominguez","Silva","Navarro","Salazar",
  "Mendoza","Ponce","Morales","Soto","Camacho","Cortés",
  "Arias","Palacios","Estrada","Valdez","Montoya","Ramos"
];

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const generarNombreCompleto = () => ({
    nombre: random(NOMBRES),
    apellido_p: random(APELLIDOS),
    apellido_m: random(APELLIDOS)
});

const generarFechas2025 = () => {
  const fechas = [];
  const inicio = new Date(`${YEAR}-01-01T00:00:00Z`);
  for (let d = 0; d < 365; d++) {
    const cur = new Date(inicio);
    cur.setUTCDate(cur.getUTCDate() + d);
    fechas.push(cur.toISOString().slice(0, 10));
  }
  return fechas;
};

const FECHAS_2025 = generarFechas2025();

const makeISO = (fecha, hour, minute) => {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(y, m - 1, d, hour, minute, 0).toISOString();
};

// Archivos SQL
const empleadosSQL = fs.createWriteStream("empleados.sql");
const asistSQL = fs.createWriteStream("asistencias.sql");
const prodSQL = fs.createWriteStream("producciones.sql");

// ENCABEZADOS SQL
empleadosSQL.write(
  `INSERT INTO "Empleado" (nombre, apellido_p, apellido_m, area, turno, "salarioDiario", activo) VALUES\n`
);

asistSQL.write(
  `INSERT INTO "RegistroAsistencia" (fecha, "horaEntrada", "horaSalida", puntual, "horasTrabajadas", turno, estatus, "id_empleado") VALUES\n`
);

prodSQL.write(
  `INSERT INTO "RegistroProduccion" (fecha, turno, "unidadesProducidas", "id_empleado") VALUES\n`
);

const empleadosIDs = [];

(async () => {
    // ==========================================================
    // 1. GENERAR EMPLEADOS
    // ==========================================================
    for (let i = 1; i <= TOTAL_EMPLEADOS; i++) {
        const n = generarNombreCompleto();

        const area = random(AREAS);
        const turno = random(TURNOS);
        const salario = (200 + Math.random() * 350).toFixed(2);

        empleadosIDs.push(i);

        empleadosSQL.write(
          `('${n.nombre}','${n.apellido_p}','${n.apellido_m}','${area}','${turno}',${salario},true)` +
          (i < TOTAL_EMPLEADOS ? ",\n" : ";\n")
        );
    }

    let firstA = true;
    let firstP = true;

    for (const fecha of FECHAS_2025) {
        for (const empleado of empleadosIDs) {

            const entradaISO = makeISO(fecha, 8, 0);
            const salidaISO = makeISO(fecha, 17, 0);
            const horas = 9;

            if (!firstA) asistSQL.write(",\n");
            firstA = false;

            asistSQL.write(
              `('${fecha}','${entradaISO}','${salidaISO}',true,${horas},'${random(TURNOS)}','${random(STATUS_ASISTENCIA)}',${empleado})`
            );

            if (!firstP) prodSQL.write(",\n");
            firstP = false;

            const unidades = Math.floor(Math.random() * 3000);

            prodSQL.write(
              `('${fecha}','${random(TURNOS)}',${unidades},${empleado})`
            );
        }
    }

    asistSQL.write(";\n");
    prodSQL.write(";\n");

    console.log("Archivos SQL generados correctamente.");
})();
