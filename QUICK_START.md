# 🚀 Guía de Inicio Rápido - Inmobiliaria Ochoa

## ✅ Instalación Completada

Se han instalado y configurado exitosamente:

### Frontend (React + Vite)
- ✅ framer-motion (v12.29.0)
- ✅ lucide-react (v0.562.0)
- ✅ react-icons (v5.5.0)
- ✅ react-modal (v3.16.3)
- ✅ axios (para conectar con Strapi)

### Backend (Strapi v5.33.4)
- ✅ Strapi instalado y configurado
- ✅ Idioma español habilitado
- ✅ Admin panel construido

---

## 🎯 Próximos Pasos

### 1️⃣ Iniciar el Backend (Strapi)

Abre una terminal y ejecuta:

```bash
cd backend
npm run develop
```

**Importante:** La primera vez te pedirá crear un usuario administrador.

- 📍 Panel de administración: http://localhost:1337/admin
- 📍 API: http://localhost:1337/api

### 2️⃣ Configurar Strapi en Español

1. Abre http://localhost:1337/admin
2. Crea tu cuenta de administrador
3. Ve a tu perfil (esquina superior derecha, click en tu avatar)
4. En "Interface language", selecciona **"Español (es)"**
5. Si no aparece el idioma, refresca la caché: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)

### 3️⃣ Crear tu Primer Content Type

Ejemplo: Content Type "Propiedad"

1. En el panel de Strapi, ve a **Content-Type Builder**
2. Click en **"Create new collection type"**
3. Nombre: `propiedad` (en singular)
4. Agrega campos:
   - `titulo` (Text - Short text)
   - `descripcion` (Rich text)
   - `precio` (Number - Decimal)
   - `imagen` (Media - Single media)
   - `ubicacion` (Text - Short text)
   - `habitaciones` (Number - Integer)
   - `banos` (Number - Integer)
5. Click en **"Save"** (Strapi se reiniciará automáticamente)

### 4️⃣ Configurar Permisos Públicos

Para que el frontend pueda acceder a los datos:

1. Ve a **Settings** (⚙️)
2. Click en **Users & Permissions Plugin** > **Roles**
3. Click en **Public**
4. En la sección de tu content type (ej: `propiedad`), marca:
   - ✅ `find` (listar todas)
   - ✅ `findOne` (ver una específica)
5. Click en **Save**

### 5️⃣ Agregar Datos de Prueba

1. Ve a **Content Manager**
2. Selecciona tu content type (ej: **Propiedad**)
3. Click en **"Create new entry"**
4. Llena los campos y sube una imagen
5. Click en **"Save"** y luego **"Publish"**

### 6️⃣ Iniciar el Frontend (React)

Abre **otra terminal** (deja la de Strapi corriendo) y ejecuta:

```bash
cd frontend
npm run dev
```

- 📍 Aplicación: http://localhost:5173

---

## 🧪 Probar la Integración

### Opción A: Usar el Componente de Ejemplo

1. Abre `frontend/src/App.jsx`
2. Importa el componente de ejemplo:

```javascript
import PropiedadesExample from './components/PropiedadesExample';

function App() {
  return (
    <div>
      <PropiedadesExample />
    </div>
  );
}

export default App;
```

3. Guarda y verifica en http://localhost:5173

### Opción B: Crear tu Propio Componente

```javascript
import { useState, useEffect } from 'react';
import api from './services/api';

function MiComponente() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/propiedades?populate=*');
        setDatos(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {datos.map(item => (
        <div key={item.id}>
          <h3>{item.attributes.titulo}</h3>
        </div>
      ))}
    </div>
  );
}
```

---

## 📚 Estructura de Respuesta de Strapi

Cuando haces una petición a Strapi, la respuesta tiene este formato:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "titulo": "Casa en venta",
        "descripcion": "Hermosa casa...",
        "precio": 250000,
        "createdAt": "2024-01-22T...",
        "updatedAt": "2024-01-22T...",
        "imagen": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/casa_123.jpg",
              "name": "casa.jpg",
              ...
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": { ... }
  }
}
```

**Para acceder a los datos:**
- Lista: `response.data.data`
- Atributos: `item.attributes.titulo`
- Imagen URL: `http://localhost:1337${item.attributes.imagen.data.attributes.url}`

---

## 🔧 Comandos Útiles

### Frontend
```bash
cd frontend
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Vista previa
```

### Backend
```bash
cd backend
npm run develop  # Desarrollo (con panel admin)
npm run start    # Producción
npm run build    # Reconstruir admin panel
```

---

## ❓ Solución de Problemas

### Error de CORS
Si ves errores de CORS en la consola del navegador:

1. Abre `backend/config/middlewares.ts`
2. Verifica que incluya:
```typescript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:5173'],
  },
}
```

### No aparece el idioma español
1. Verifica que `backend/src/admin/app.tsx` tenga `'es'` descomentado
2. Ejecuta `npm run build` en la carpeta `backend`
3. Reinicia Strapi
4. Refresca la caché del navegador (Ctrl + Shift + R)

### Error al conectar con la API
1. Verifica que Strapi esté corriendo en http://localhost:1337
2. Verifica que los permisos públicos estén configurados
3. Revisa la consola del navegador para ver el error específico

---

## 📖 Recursos

- [Documentación de Strapi](https://docs.strapi.io)
- [API de Strapi REST](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Populate](https://docs.strapi.io/dev-docs/api/rest/populate-select)
- [React + Vite](https://vitejs.dev/guide/)

---

## 🎉 ¡Todo Listo!

Tu proyecto está configurado y listo para desarrollar. 

**Recuerda:**
- Mantén ambos servidores corriendo (backend y frontend)
- Crea tus Content Types en Strapi
- Configura los permisos públicos
- Usa el servicio `api.js` para hacer peticiones

¡Feliz desarrollo! 🚀
