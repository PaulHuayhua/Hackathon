# 🎓 Sistema de Gestión de Estudiantes

Sistema web fullstack para la gestión integral de estudiantes universitarios, desarrollado con **Spring Boot** en el backend y **Angular** en el frontend. Permite registrar, consultar, filtrar, editar y generar reportes PDF de estudiantes.

---

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Java | 17 | Lenguaje principal |
| Spring Boot | 3.5.3 | Framework backend |
| Spring Data JPA | - | Persistencia y ORM |
| Hibernate | - | Mapeo objeto-relacional |
| SQL Server | - | Base de datos |
| JasperReports | 6.21.3 | Generación de reportes PDF |
| Lombok | - | Reducción de código boilerplate |
| Maven | - | Gestión de dependencias |

### Frontend
| Tecnología | Uso |
|---|---|
| Angular | Framework frontend |
| Angular Material | Componentes UI |
| TypeScript | Lenguaje principal |
| HTML / SCSS | Estructura y estilos |

---

## ✨ Funcionalidades

- ✅ **Registro de estudiantes** con código autogenerado (`A001`, `A002`, ...)
- ✅ **Listado con filtros múltiples** — programa académico, estado, departamento, provincia, distrito
- ✅ **Búsqueda en tiempo real** por nombre, DNI y otros campos
- ✅ **Edición** de datos del estudiante
- ✅ **Eliminación lógica** — el estudiante no se borra, se marca como inactivo
- ✅ **Restauración** de estudiantes inactivos
- ✅ **Exportación a PDF** con JasperReports
- ✅ **Filtro por ubigeo** — 25 departamentos del Perú con provincias y distritos

---

## 📁 Estructura del Proyecto

```
hackathon/
│
├── src/
│   └── main/
│       ├── java/vg/paul/huayhua/hackathon/
│       │   ├── controller/        # Controladores REST
│       │   ├── model/             # Entidades JPA
│       │   ├── repository/        # Interfaces JPA Repository
│       │   ├── service/           # Interfaces de servicio
│       │   │   └── Impl/          # Implementaciones de servicio
│       │   └── HackathonApplication.java
│       └── resources/
│           ├── reports/           # Plantillas .jasper para PDF
│           └── application.properties
│
└── frontend/                      # Proyecto Angular
    ├── src/
    │   └── app/
    │       ├── students/          # Módulo de estudiantes
    │       │   ├── list/          # Listado y filtros
    │       │   ├── form/          # Registro y edición
    │       │   └── student.model.ts
    │       └── app.routes.ts
    └── package.json
```

---

## ⚙️ Instalación y Configuración

### Requisitos previos

- Java 17+
- Maven 3.8+
- Node.js 18+
- Angular CLI 17+
- SQL Server (local o remoto)

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/PaulHuayhua/Hackathon.git
cd Hackathon
```

---

### 2. Configurar la base de datos

Edita `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=hackathon_db;encrypt=false
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 3. Ejecutar el backend

```bash
# En la raíz del proyecto
mvn spring-boot:run
```

El servidor arranca en: `http://localhost:8080`

---

### 4. Ejecutar el frontend

```bash
cd frontend
npm install
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## 🔌 Endpoints API REST

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/students` | Listar todos los estudiantes |
| `GET` | `/api/students/{id}` | Obtener estudiante por ID |
| `GET` | `/api/students/program/{program}` | Filtrar por programa académico |
| `GET` | `/api/students/cycle/{cycle}` | Filtrar por ciclo académico |
| `GET` | `/api/students/state/{state}` | Filtrar por estado (activo/inactivo) |
| `GET` | `/api/students/department/{dept}` | Filtrar por departamento |
| `GET` | `/api/students/province/{prov}` | Filtrar por provincia |
| `GET` | `/api/students/district/{dist}` | Filtrar por distrito |
| `POST` | `/api/students` | Registrar nuevo estudiante |
| `PUT` | `/api/students/{id}` | Actualizar estudiante |
| `DELETE` | `/api/students/{id}` | Eliminación lógica (estado = false) |
| `PUT` | `/api/students/{id}/restore` | Restaurar estudiante inactivo |
| `GET` | `/api/students/report/pdf` | Generar reporte PDF |

---

## 📊 Modelo de Datos — Estudiante

```json
{
  "id": 1,
  "code": "A001",
  "name": "Juan",
  "lastName": "Pérez García",
  "dni": "12345678",
  "gender": "M",
  "phone": "999888777",
  "email": "juan.perez@email.com",
  "address": "Av. Principal 123",
  "department": "Lima",
  "province": "Lima",
  "district": "Miraflores",
  "academicProgram": "Ingeniería de Software",
  "academicCycle": 5,
  "dateRegistration": "2025-01-15",
  "state": true
}
```

---

## 🗂️ Lógica de Negocio Destacada

### Generación automática de código
El sistema genera códigos correlativos con formato `A001` al registrar un nuevo estudiante, basándose en el último código registrado en la base de datos.

### Eliminación lógica
Los estudiantes no se eliminan físicamente de la base de datos. Al "eliminar", el campo `state` cambia a `false`, permitiendo restaurarlos posteriormente. Esto preserva la integridad del historial.

---

## 📄 Reporte PDF

El sistema genera un reporte PDF con el listado completo de estudiantes usando **JasperReports**. Se accede desde el botón **"Exportar PDF"** en la interfaz o directamente desde el endpoint `/api/students/report/pdf`.

---

## 👤 Autor

**Paul Huayhua**
- GitHub: [@PaulHuayhua](https://github.com/PaulHuayhua)

---

## 📝 Licencia

Este proyecto fue desarrollado como parte de una Hackathon académica.
