<template>
    <div>
      <h1 class="first-title">Events</h1>
  
      <!-- Chargement en cours -->
      <div v-if="loading" class="loading">Loading...</div>
  
      <!-- Message d'erreur -->
      <div v-if="error" class="error">{{ error }}</div>
  
      <!-- Liste des événements sous forme de cartes -->
      <div v-if="events.length" class="events-container">
        <div v-for="event in events" :key="event.id" class="event-card">
          <h3 class="event-title">{{ event.name }}</h3>
          <p><strong>ID:</strong> {{ event.id }}</p>
          <p><strong>Date:</strong> {{ event.event_date || 'Not specified' }}</p>
          <p><strong>Location:</strong> {{ event.location || 'Not specified' }}</p>
          <p><strong>Address:</strong> {{ event.address || 'Not specified' }}</p>
          <p><strong>City:</strong> {{ event.city || 'Not specified' }}</p>
          <p><strong>Total Seats:</strong> {{ event.total_seats || 'Not specified' }}</p>
          <p><strong>Price (Standard):</strong> {{ event.price_standard || 'Not specified' }}</p>
          <p><strong>Price (VIP):</strong> {{ event.price_vip || 'Not specified' }}</p>
        </div>
      </div>
  
      <!-- Aucun événement -->
      <div v-if="!loading && events.length === 0" class="no-events">
        No events found.
      </div>
    </div>
  </template>
  
  <script>
import { useEventStore } from '@/stores/eventStore';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'EventCard',
  computed: {
    // Liaison avec le store via mapState
    ...mapState(useEventStore, ['events', 'loading', 'error']),
  },
  methods: {
    // Liaison avec les actions du store
    ...mapActions(useEventStore, ['fetchEvents']),
  },
  mounted() {
    // Charge les événements lors du montage
    if (!this.events.length) {
      this.fetchEvents();
    }
  },
};
</script>
  
  <style scoped>
/* title composant*/
.first-title{
    color:#11379e;
}
  /* Conteneur global des événements */
  .events-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }
  
  /* Style des cartes d'événements */
  .event-card {
    background-color: #000000;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    color: #17b43e;
  }
  
  .event-card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .event-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #c70808;
    text-transform:uppercase ;
  }
  
  /* Erreur */
  .error {
    color: red;
    text-align: center;
  }
  
  /* Aucun événement */
  .no-events {
    text-align: center;
    margin-top: 1rem;
  }
  
  /* Chargement */
  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
  }
  </style>
  