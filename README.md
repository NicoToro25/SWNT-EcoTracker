# EcoTrack – MVP Huella de Carbono

Aplicación que permite describir actividades diarias en lenguaje natural y obtener una estimación de la huella de carbono en kg CO₂.

## Arquitectura del proyecto

```
EcoTrack/
├── backend/          # API NestJS (Node.js)
├── frontend/         # SPA React + Vite + Tailwind
└── README.md
```

### Backend (NestJS)

- **Arquitectura**: Capas simples (Controller → Service). Servicio con reglas de negocio para parsear texto y calcular CO₂.
- **Módulo principal**: `footprint` – endpoint POST que recibe la descripción y devuelve kg CO₂ estimados.
- **Reglas de estimación (MVP)**:
  - Comer carne: 5 kg CO₂
  - Viajar en bus: 0.1 kg CO₂ por km
  - Viajar en carro/coche: 0.2 kg CO₂ por km

### Frontend (React)

- **Stack**: React 18, TypeScript, Vite, Tailwind CSS.
- **Flujo**: Campo de texto → botón "Calcular huella" → llamada al backend → mostrar resultado en kg CO₂.

### Comunicación

- Frontend llama a `POST /footprint/calculate` con `{ "description": "..." }`.
- Backend responde `{ "kgCo2": number }`.

---

## Cómo ejecutar el proyecto localmente

### Requisitos

- Node.js 18+ y npm (o pnpm/yarn).

### 1. Backend

```bash
cd backend
npm install
npm run start:dev
```

La API quedará en **http://localhost:3000**.

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La app quedará en **http://localhost:5173** (o el puerto que indique Vite).

### 3. Probar

1. Abre http://localhost:5173 en el navegador.
2. Escribe una descripción, por ejemplo: *"Hoy comí carne y viajé 20km en bus"*.
3. Pulsa "Calcular huella de carbono".
4. Verás el resultado estimado en kg CO₂.

### Variables de entorno (opcional)

- **Backend**: en `backend/.env` puedes definir `PORT=3000` si quieres otro puerto.
- **Frontend**: en `frontend/.env` puedes definir `VITE_API_URL=http://localhost:3000` si tu API corre en otra URL.

---

## Estructura de carpetas detallada

### Backend

```
backend/
├── src/
│   ├── footprint/
│   │   ├── dto/
│   │   │   ├── calculate-footprint.dto.ts
│   │   │   └── footprint-response.dto.ts
│   │   ├── footprint.controller.ts
│   │   ├── footprint.module.ts
│   │   └── footprint.service.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   └── FootprintCalculator.tsx
│   ├── services/
│   │   └── footprintApi.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```
