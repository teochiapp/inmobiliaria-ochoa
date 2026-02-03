import type { Schema, Struct } from '@strapi/strapi';

export interface AdicionalesAdicionales extends Struct.ComponentSchema {
  collectionName: 'components_adicionales_adicionales';
  info: {
    displayName: 'Adicionales';
  };
  attributes: {
    Texto: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'adicionales.adicionales': AdicionalesAdicionales;
    }
  }
}
