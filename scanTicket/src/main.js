import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importation des icônes gratuites de FontAwesome
import { faCalendarPlus, faTicketAlt, faQrcode, faCalendar } from '@fortawesome/free-solid-svg-icons';

// Ajouter les icônes nécessaires à la bibliothèque
library.add(faCalendarPlus, faTicketAlt, faQrcode, faCalendar);

import App from './App.vue';
import router from './router';

// Crée l'application
const app = createApp(App);

// Utilise Pinia et le router
app.use(createPinia());
app.use(router);

// Enregistre le composant FontAwesome globalement
app.component('font-awesome-icon', FontAwesomeIcon);

// Monte l'application
app.mount('#app');

