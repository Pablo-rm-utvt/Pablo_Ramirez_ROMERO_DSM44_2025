# API Pacientes

Sistema de gestión de pacientes, citas y tratamientos médicos usando NestJS y PostgreSQL.

## Instalación

```bash
npm install
```

## Base de Datos

Asegúrate de tener PostgreSQL corriendo localmente con las siguientes credenciales:
- Host: localhost
- Puerto: 5432
- Usuario: postgres
- Contraseña: root
- Base de datos: pacientes

La base de datos se sincronizará automáticamente al iniciar la aplicación.

## Ejecutar la aplicación

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Endpoints

### PACIENTES

**Crear paciente**
```
POST /api/pacientes
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "fecha_nacimiento": "1990-01-15",
  "sexo": "M",
  "telefono": "555-1234",
  "direccion": "Calle Principal 123",
  "tipo_sangre": "O+",
  "alergias": "Penicilina",
  "activo": true
}
```

**Listar todos los pacientes**
```
GET /api/pacientes?page=1&limit=10
```

**Listar pacientes activos**
```
GET /api/pacientes/activos?page=1&limit=10
```

**Ver pacientes por tipo de sangre**
```
GET /api/pacientes/tipo-sangre/O+?page=1&limit=10
```

**Ver pacientes con sus citas**
```
GET /api/pacientes/con-citas?page=1&limit=10
```

**Obtener un paciente por ID**
```
GET /api/pacientes/:id
```

**Actualizar paciente**
```
PATCH /api/pacientes/:id
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "telefono": "555-5678"
}
```

**Eliminar paciente**
```
DELETE /api/pacientes/:id
```

---

### CITAS

**Crear cita**
```
POST /api/pacientes/citas
Content-Type: application/json

{
  "id_paciente": 1,
  "fecha": "2025-12-15",
  "hora": "10:30",
  "motivo": "Revisión general",
  "medico_asignado": "Dr. García",
  "estatus": "Programada"
}
```

**Listar todas las citas**
```
GET /api/pacientes/citas?page=1&limit=10
```

**Ver todas las citas de un paciente**
```
GET /api/pacientes/citas-paciente/:id_paciente?page=1&limit=10
```

**Consultar citas de un día específico**
```
GET /api/pacientes/citas-fecha/2025-12-15?page=1&limit=10
```

**Contar citas canceladas**
```
GET /api/pacientes/citas-canceladas
```

**Obtener una cita por ID**
```
GET /api/pacientes/citas/:id
```

**Actualizar cita**
```
PATCH /api/pacientes/citas/:id
Content-Type: application/json

{
  "estatus": "Realizada",
  "hora": "11:00"
}
```

**Eliminar cita**
```
DELETE /api/pacientes/citas/:id
```

---

### TRATAMIENTOS

**Crear tratamiento**
```
POST /api/pacientes/tratamientos
Content-Type: application/json

{
  "id_paciente": 1,
  "diagnostico": "Hipertensión",
  "medicamento": "Enalapril",
  "dosis": "10mg",
  "fecha_inicio": "2025-01-01",
  "fecha_fin": "2025-03-01",
  "notas": "Tomar una vez al día"
}
```

**Listar todos los tratamientos**
```
GET /api/pacientes/tratamientos?page=1&limit=10
```

**Consultar tratamientos asociados a un diagnóstico**
```
GET /api/pacientes/tratamientos-diagnostico/Hipertensión?page=1&limit=10
```

**Obtener medicamentos y dosis de un paciente**
```
GET /api/pacientes/medicamentos/:id_paciente
```

**Obtener un tratamiento por ID**
```
GET /api/pacientes/tratamientos/:id
```

**Actualizar tratamiento**
```
PATCH /api/pacientes/tratamientos/:id
Content-Type: application/json

{
  "dosis": "20mg",
  "fecha_fin": "2025-04-01"
}
```

**Eliminar tratamiento**
```
DELETE /api/pacientes/tratamientos/:id
```

---

## Estructura del Proyecto

```
src/
├── pacientes/
│   ├── dto/
│   │   ├── create-paciente.dto.ts
│   │   ├── update-paciente.dto.ts
│   │   ├── create-cita.dto.ts
│   │   ├── update-cita.dto.ts
│   │   ├── create-tratamiento.dto.ts
│   │   └── update-tratamiento.dto.ts
│   ├── entities/
│   │   ├── paciente.entity.ts
│   │   ├── cita.entity.ts
│   │   └── tratamiento.entity.ts
│   ├── pacientes.controller.ts
│   ├── pacientes.service.ts
│   ├── pacientes.controller.spec.ts
│   ├── pacientes.service.spec.ts
│   └── pacientes.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Licencia

MIT
