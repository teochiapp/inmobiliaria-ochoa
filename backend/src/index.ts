// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }) {
    // Ajustes de la biblioteca de medios (se aplican en cada arranque):
    // - sizeOptimization: false → la foto original se guarda tal cual, sin recomprimirla
    //   (con true, Strapi la vuelve a comprimir al 80% y pierde nitidez).
    // - responsiveDimensions: true → genera las versiones xlarge/large/medium/small.
    // - autoOrientation: true → respeta la rotación de las fotos sacadas con el celular.
    try {
      const uploadSettings = strapi.store({ type: 'plugin', name: 'upload', key: 'settings' });
      const current = (await uploadSettings.get()) || {};
      await uploadSettings.set({
        value: {
          ...current,
          sizeOptimization: false,
          responsiveDimensions: true,
          autoOrientation: true,
        },
      });
      console.log('🖼️  Upload settings: originales sin recomprimir, versiones responsive y auto-orientación activas');
    } catch (error) {
      console.error('⚠️ No se pudieron aplicar los ajustes de upload:', error);
    }

    // Set public permissions for content types
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      console.log('⚠️ Public role not found');
      return;
    }

    const contentTypes = [
      'api::hero-image.hero-image',
      'api::venta.venta',
      'api::alquiler.alquiler',
      'api::zona.zona',
      'api::novedad.novedad'
    ];

    const permissions = ['find', 'findOne'];

    for (const contentType of contentTypes) {
      for (const action of permissions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              role: publicRole.id,
              action: `${contentType}.${action}`,
            },
          });

        if (existingPermission && !existingPermission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: existingPermission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled ${action} for ${contentType}`);
        } else if (!existingPermission) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({
              data: {
                role: publicRole.id,
                action: `${contentType}.${action}`,
                enabled: true,
              },
            });
          console.log(`✅ Created and enabled ${action} for ${contentType}`);
        }
      }
    }

    console.log('🎉 Public permissions configured successfully');
  },
};
