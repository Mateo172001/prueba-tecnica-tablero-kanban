# 📝 Aplicación de Gestión de Tareas - Kanban

Esta es una aplicación web de gestión de tareas tipo Kanban, construida con **Next.js (App Router)**, **TailwindCSS**, **Context API**, **IndexedDB** para persistencia local, y **json-server** como backend simulado.

## ✨ Características

- Crear y editar tareas con campos: título, descripción, estado y usuario asignado.
- Vista tipo Kanban con columnas: **Pendiente**, **Progreso**, **Completado**.
- Cambios de estado automáticos al editar.
- Modal responsive para crear y editar tareas.
- Persistencia en `IndexedDB` y sincronización con `json-server`.

---

## ⚙️ Requisitos

- Node.js ≥ 18.x
- npm ≥ 9.x o yarn ≥ 1.x

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone https://github.com/Mateo172001/prueba-tecnica-tablero-kanban
cd prueba-tecnica-tablero-kanban
```

Instala las dependencias:

```bash
npm install
# o
yarn install
```

---

## 📦 Backend simulado con json-server

Usamos `json-server` para simular un backend RESTful con datos persistentes.

### 📁 Estructura esperada del archivo `db.json`:

Ubica este archivo en la raíz del proyecto:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Diseñar logo",
      "description": "Crear propuesta para nuevo logo",
      "status": "pending",
      "user": "María"
    },
    {
      "id": 2,
      "title": "Reunión con el equipo",
      "description": "Discutir próximos pasos del sprint",
      "status": "in-progress",
      "user": "Carlos"
    },
    {
      "id": 3,
      "title": "Documentar API",
      "description": "Agregar descripción a todos los endpoints",
      "status": "completed",
      "user": "Ana"
    }
  ],
  "users": [
    { "id": 1, "name": "María" },
    { "id": 2, "name": "Carlos" },
    { "id": 3, "name": "Ana" }
  ]
}
```

### ▶️ Ejecutar json-server

Instala json-server si no lo tienes:

```bash
npm install -g json-server
```

Inicia el servidor:

```bash
json-server --watch db.json --port 3001
```

Esto expondrá los endpoints en:

- `http://localhost:3001/tasks`
- `http://localhost:3001/users`

---

## 💻 Ejecutar la aplicación Next.js

En otra terminal, inicia la app:

```bash
npm run dev
# o
yarn dev
```

Esto levantará el frontend en:

- `http://localhost:3000`

Asegúrate de que `json-server` esté corriendo en `localhost:3001` para que la app funcione correctamente.

---

## 📁 Estructura del Proyecto

```bash
/app
  /features
    /tasks
      /components    # Componentes específicos de tareas
      /hooks         # Hooks personalizados
      /models        # Modelos de dominio
      /services      # Llamadas al backend (json-server)
  /core
    /utils           # Funciones auxiliares
    /storage         # IndexedDB y persistencia
```

---

## 📌 Notas

- Usa `Context API` para manejar el estado global.
- Usa `IndexedDB` para persistencia local.
- json-server actúa como una API REST mock.

---

## 🧹 Scripts útiles

```bash
npm run dev        # Ejecutar la app en modo desarrollo
npm run build      # Construir la app para producción
npm run lint       # Lint del código
```

---


Desarrollado por Mateo Avila 💻  


---
