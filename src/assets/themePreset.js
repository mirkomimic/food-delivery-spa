import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

export const MyPreset = definePreset(Aura, {
  primitive: {
    ocean: { 50: '#fbfcfc', 100: '#F7F9F8', 200: '#EFF3F2', 300: '#DADEDD', 400: '#B1B7B6', 500: '#828787', 600: '#5F7274', 700: '#415B61', 800: '#29444E', 900: '#183240', 950: '#0c1920' }
  },
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}'
    },

    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{ocean.50}',
          100: '{ocean.100}',
          200: '{ocean.200}',
          300: '{ocean.300}',
          400: '{ocean.400}',
          500: '{ocean.500}',
          600: '{ocean.600}',
          700: '{ocean.700}',
          800: '{ocean.800}',
          900: '{ocean.900}',
          950: '{ocean.950}'
        },
      },

      dark: {
        surface: {
          0: '#ffffff',
          50: '{ocean.50}',
          100: '{ocean.100}',
          200: '{ocean.200}',
          300: '{ocean.300}',
          400: '{ocean.400}',
          500: '{ocean.500}',
          600: '{ocean.600}',
          700: '{ocean.700}',
          800: '{ocean.800}',
          900: '{ocean.900}',
          950: '{ocean.950}'
        },
      }
    },

  },
});