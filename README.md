# Inmobiliaria Ochoa - Monorepo

Este proyecto contiene el frontend (React + Vite) y el backend (Strapi CMS) de Inmobiliaria Ochoa.

## 📁 Estructura del Proyecto

```
inmobilaria-ochoa/
├── frontend/          # Aplicación React
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/           # API Strapi
│   ├── src/
│   ├── config/
│   └── package.json
└── README.md
```

## 🚀 Inicio Rápido

### Instalar Dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Ejecutar en Desarrollo

**Terminal 1 - Backend (Strapi):**
```bash
cd backend
npm run develop
```
- Panel de administración: http://localhost:1337/admin
- API: http://localhost:1337/api

**Terminal 2 - Frontend (React):**
```bash
cd frontend
npm run dev
```
- Aplicación: http://localhost:5173

## 📦 Librerías Instaladas en Frontend

- **framer-motion** (v12.29.0) - Animaciones fluidas
- **lucide-react** (v0.562.0) - Iconos modernos
- **react-icons** (v5.5.0) - Colección de iconos
- **react-modal** (v3.16.3) - Componentes modales
- **react-router-dom** (v7.12.0) - Enrutamiento
- **react-slick** (v0.31.0) - Carruseles
- **styled-components** (v6.3.8) - Estilos en JS

## 🌐 Strapi en Español

El backend de Strapi está configurado en español:

1. **Archivo de configuración**: `backend/src/admin/app.tsx`
2. **Idioma habilitado**: Español (es)
3. **Cambiar idioma**: 
   - Inicia sesión en http://localhost:1337/admin
   - Ve a tu perfil (esquina superior derecha)
   - Selecciona "Español (es)" en "Interface language"
   - Si no aparece, refresca la caché del navegador (Ctrl + Shift + R)

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de producción
npm run lint     # Linter ESLint
```

### Backend
```bash
npm run develop  # Modo desarrollo con auto-reload
npm run start    # Modo producción
npm run build    # Construir admin panel
npm run strapi   # CLI de Strapi
```

## 🔗 Conectar Frontend con Backend

### 1. Crear archivo de configuración API

Crea `frontend/src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### 2. Crear archivo `.env`

Crea `frontend/.env`:

```env
VITE_STRAPI_URL=http://localhost:1337/api
```

### 3. Instalar Axios (si es necesario)

```bash
cd frontend
npm install axios
```

### 4. Ejemplo de uso

```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

function Propiedades() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/propiedades?populate=*');
        setPropiedades(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {propiedades.map((prop) => (
        <div key={prop.id}>
          <h3>{prop.attributes.titulo}</h3>
        </div>
      ))}
    </div>
  );
}
```

## 📝 Primer Uso de Strapi

1. Inicia el backend: `cd backend && npm run develop`
2. Abre http://localhost:1337/admin
3. Crea tu cuenta de administrador
4. Cambia el idioma a Español en tu perfil
5. Crea tus Content Types (ej: Propiedades, Agentes, etc.)
6. Configura los permisos en Settings > Users & Permissions > Roles > Public

## 🎨 Tecnologías

- **Frontend**: React 18, Vite, Styled Components
- **Backend**: Strapi v5.33.4 (CMS Headless)
- **Base de datos**: SQLite (desarrollo) / PostgreSQL (producción recomendada)

## 📚 Recursos

- [Documentación de Strapi](https://docs.strapi.io)
- [Documentación de Vite](https://vitejs.dev)
- [Documentación de React](https://react.dev)

---

¡Listo para desarrollar! 🚀
