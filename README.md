# Inmobiliaria Ochoa

Proyecto de gestión inmobiliaria utilizando **React** y el patrón **Container/Presenter**.

## Estructura de Carpetas (Container Pattern)

El proyecto sigue una estructura organizada para separar la lógica de negocio de la interfaz de usuario:

- `src/components`: Componentes de presentación (UI). Son "tontos", solo reciben props y muestran datos.
- `src/containers`: Componentes "inteligentes". Manejan la lógica, el estado y las llamadas a servicios.
- `src/pages`: Componentes principales que representan las rutas (vistas completas).
- `src/services`: Lógica de llamadas a APIs externas.
- `src/hooks`: Custom hooks reutilizables.
- `src/context`: Manejo de estado global (si fuera necesario).
- `src/utils`: Funciones auxiliares y constantes.
- `src/assets`: Recursos estáticos como imágenes y fuentes.
- `src/styles`: Estilos globales.

## Cómo empezar

1. Instalar dependencias: `npm install`
2. Ejecutar en desarrollo: `npm run dev`
