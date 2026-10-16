export default () => ({
  upload: {
    config: {
      // Versiones reducidas que Strapi genera de cada foto subida.
      // El frontend arma un srcSet con todas (más la original) y el navegador
      // elige la más nítida para cada pantalla, así nunca se agranda una
      // versión chica (que es lo que hace que una foto se vea borrosa).
      breakpoints: {
        xlarge: 1920,
        large: 1280,
        medium: 768,
        small: 500,
      },
    },
  },
});
