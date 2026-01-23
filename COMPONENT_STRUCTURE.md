# 📁 Estructura de Componentes - Inmobiliaria Ochoa

## 🎯 Organización por Secciones/Páginas

La carpeta `components` está organizada por secciones y páginas para facilitar el mantenimiento:

```
src/
├── components/
│   ├── header/              ← Componentes del header (global)
│   │   ├── Header.jsx
│   │   ├── Header.styles.js
│   │   ├── Logo.jsx
│   │   └── Navigation.jsx
│   │
│   ├── home/                ← Componentes específicos de la página Home
│   │   ├── hero/
│   │   │   └── Hero.jsx
│   │   ├── sales/
│   │   │   ├── sales.jsx
│   │   │   └── rent.jsx
│   │   └── PropertyCard/
│   │       └── PropertyCard.jsx
│   │
│   └── PropiedadesExample.jsx  ← Componente de ejemplo
│
└── pages/
    └── Home/
        └── Home.jsx
```

---

## 📝 Guía de Imports

### ✅ Imports Correctos

#### En `pages/Home/Home.jsx`:

```javascript
import React from 'react';
// Componentes globales (header, footer, etc.)
import Header from '../../components/header/Header';

// Componentes específicos de la página Home
import Hero from '../../components/home/hero/Hero';
import Sales from '../../components/home/sales/sales';
import Rent from '../../components/home/sales/rent';
import PropertyCard from '../../components/home/PropertyCard/PropertyCard';
```

---

## 🗂️ Convención de Nombres

### Carpetas de Componentes:
- **Globales**: `components/header/`, `components/footer/`
- **Por Página**: `components/[pagina]/[seccion]/`
  - Ejemplo: `components/home/hero/`
  - Ejemplo: `components/propiedades/filters/`

### Archivos:
- **Componentes**: PascalCase → `Header.jsx`, `Hero.jsx`
- **Estilos**: PascalCase + `.styles.js` → `Header.styles.js`
- **Utilidades**: camelCase → `helpers.js`, `constants.js`

---

## 🔄 Ejemplos de Estructura por Página

### Página Home:
```
components/home/
├── hero/
│   ├── Hero.jsx
│   └── Hero.styles.js
├── sales/
│   ├── sales.jsx
│   └── rent.jsx
├── PropertyCard/
│   ├── PropertyCard.jsx
│   └── PropertyCard.styles.js
└── testimonials/
    ├── Testimonials.jsx
    └── TestimonialCard.jsx
```

### Página Propiedades (futuro):
```
components/propiedades/
├── filters/
│   ├── Filters.jsx
│   └── FilterBar.jsx
├── list/
│   ├── PropertyList.jsx
│   └── PropertyItem.jsx
└── map/
    └── MapView.jsx
```

### Página Contacto (futuro):
```
components/contacto/
├── form/
│   ├── ContactForm.jsx
│   └── FormField.jsx
└── info/
    ├── ContactInfo.jsx
    └── SocialLinks.jsx
```

---

## 🎨 Componentes Globales

Componentes que se usan en múltiples páginas:

```
components/
├── header/
│   ├── Header.jsx
│   ├── Logo.jsx
│   └── Navigation.jsx
├── footer/
│   └── Footer.jsx
├── common/              ← Componentes reutilizables
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Modal.jsx
└── layout/
    └── Layout.jsx
```

### Imports de Componentes Globales:

```javascript
// Desde cualquier página
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Button from '../../components/common/Button';
```

---

## 📦 Crear Nuevos Componentes

### 1. Componente Global (usado en varias páginas):
```bash
# Crear carpeta
mkdir src/components/footer

# Crear archivos
touch src/components/footer/Footer.jsx
touch src/components/footer/Footer.styles.js
```

### 2. Componente Específico de Página:
```bash
# Para la página Home
mkdir src/components/home/testimonials
touch src/components/home/testimonials/Testimonials.jsx

# Para la página Propiedades
mkdir -p src/components/propiedades/filters
touch src/components/propiedades/filters/Filters.jsx
```

---

## 🚀 Buenas Prácticas

### ✅ DO (Hacer):
- Agrupar componentes por página/sección
- Usar nombres descriptivos
- Mantener archivos de estilos junto a componentes
- Crear subcarpetas para componentes complejos

### ❌ DON'T (No hacer):
- Poner todos los componentes en la raíz de `components/`
- Mezclar componentes de diferentes páginas
- Usar nombres genéricos como `Component1.jsx`
- Crear carpetas muy profundas (máximo 3 niveles)

---

## 📋 Checklist para Nuevos Componentes

- [ ] ¿Es un componente global o específico de página?
- [ ] ¿Está en la carpeta correcta?
- [ ] ¿El nombre del archivo es PascalCase?
- [ ] ¿Tiene su archivo de estilos si es necesario?
- [ ] ¿Los imports están correctos?
- [ ] ¿Está exportado correctamente?

---

## 🔍 Troubleshooting de Imports

### Error: "Module not found"

**Problema**: Import incorrecto
```javascript
// ❌ Incorrecto
import Hero from '../hero/Hero';
```

**Solución**: Verificar la ruta relativa
```javascript
// ✅ Correcto (desde pages/Home/Home.jsx)
import Hero from '../../components/home/hero/Hero';
```

### Error: "Default export not found"

**Problema**: Componente no exportado correctamente
```javascript
// ❌ Incorrecto
export const Hero = () => { ... }
```

**Solución**: Usar export default
```javascript
// ✅ Correcto
const Hero = () => { ... }
export default Hero;
```

---

## 📚 Recursos

- [React File Structure Best Practices](https://reactjs.org/docs/faq-structure.html)
- [Component Organization Patterns](https://kentcdodds.com/blog/colocation)

---

¡Mantén esta estructura para un código limpio y mantenible! 🎉
