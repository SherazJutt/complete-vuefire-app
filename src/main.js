import { createApp } from 'vue';
import './style.css';
import VueApp from './App.vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import { definePreset } from '@primevue/themes';
import router from './router';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import KeyFilter from 'primevue/keyfilter';
// firebase
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase';

const CustomizedLara = definePreset(Lara, {
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
      950: '{emerald.950}',
    },
  },
});

const app = createApp(VueApp);

app.directive('tooltip', Tooltip);
app.directive('keyfilter', KeyFilter);

app.use(ToastService);
app.use(ConfirmationService);

app.use(PrimeVue, {
  theme: {
    preset: CustomizedLara,
    options: {
      darkModeSelector: false,
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
});

app.use(router);
app.use(VueFire, { firebaseApp, modules: [VueFireAuth()] });
app.mount('#app');
