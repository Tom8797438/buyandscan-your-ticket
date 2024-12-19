// stores/eventStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    events: [], // Liste des événements
    eventDetails: {}, // Détails des événements spécifiques (par ID)
    loading: false, // État de chargement global
    error: null, // Message d'erreur global
  }),
  actions: {
    async fetchEvents() {
        try {
          this.loading = true;
          console.log('Fetching events...');
          const response = await axios.get(
            'https://popular-friendship-c117528b75.strapiapp.com/api/events');
          console.log('API Response:', response.data);
          this.events = response.data.data;
        } catch (err) {
          this.error = 'Failed to fetch events. Please try again later.';
          console.error('Error fetching events:', err);
        } finally {
          this.loading = false;
        }
      },
      async createEvent(eventData) {
        try {
          this.loading = true;
          const response = await axios.post(
            'https://popular-friendship-c117528b75.strapiapp.com/api/events',
            { data: eventData }
          );
          // Ajoute l'événement créé à la liste existante
          this.events.push(response.data.data);
        } catch (err) {
          this.error = 'Erreur lors de la création de l\'évènement.';
          throw err; // Propager l'erreur
        } finally {
          this.loading = false;
        }
  },
},
});
