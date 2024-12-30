<template>
<div class="overlay" @click="goBackToEvents">
  <div class="event-card" @click.stop>
    <!-- Colonne gauche -->
    <div class="event-details">
      <h2 class="event-title">{{ selectedEvent.name || 'Non spécifié' }}</h2>
      <p><strong>Date :</strong> {{ selectedEvent.event_date || 'Non spécifié' }}</p>
      <p><strong>Lieu :</strong> {{ selectedEvent.location || 'Non spécifié' }}</p>
      <p><strong>Adresse :</strong> {{ selectedEvent.address || 'Non spécifié' }}</p>
      <p><strong>Ville :</strong> {{ selectedEvent.city || 'Non spécifié' }}</p>
      <p><strong>Places disponibles :</strong> {{ selectedEvent.total_seats || 'Non spécifié' }}</p>
      <p><strong>Prix Standard :</strong> {{ selectedEvent.price_standard || 'Non spécifié' }} €</p>
      <p><strong>Prix VIP :</strong> {{ selectedEvent.price_vip || 'Non spécifié' }} €</p>
      <p><strong>Prix PMR :</strong> {{ selectedEvent.price_pmr || 'Non spécifié' }} €</p>
      <p><strong>Prix Enfant -12 ans :</strong> {{ selectedEvent.price_children || 'Non spécifié' }} €</p>
      <p><strong>Prix Étudiant :</strong> {{ selectedEvent.price_student || 'Non spécifié' }} €</p>
    </div>

    <!-- Colonne droite -->
    <div class="booking-section">
      <h3>Vos coordonnées</h3>
      <div class="input-group">
        <label>Nom</label>
        <input id="name-customer" type="text" placeholder="Votre nom" />
      </div>
      <div class="input-group">
        <label>Prénom</label>
        <input id="surname-customer" type="text" placeholder="Votre prénom" />
      </div>
      <div class="input-group">
        <label>E-mail</label>
        <input id="email-customer" type="email" placeholder="Votre e-mail" />
      </div>
      <div class="input-group">
        <label>Téléphone</label>
        <input id="phone-customer" type="tel" pattern="[0-9]{10}" placeholder="Votre N° de téléphone" />
      </div>

      <h3>Réserver vos places</h3>
      <div class="input-group">
        <label for="standard-tickets">Standard : {{ selectedEvent.price_standard}} € </label>
        <input id="standard-tickets" type="number" min="0" v-model="standardTickets" @input="calculateTotal" />
      </div>
      <div class="input-group">
        <label for="vip-tickets">VIP : {{ selectedEvent.price_vip}} €</label>
        <input id="vip-tickets" type="number" min="0" v-model="vipTickets" @input="calculateTotal" />
      </div>
      <div class="input-group">
        <label for="pmr-tickets">PMR : {{ selectedEvent.price_pmr}} €</label>
        <input id="pmr-tickets" type="number" min="0" v-model="pmrTickets" @input="calculateTotal" />
      </div>
      <div class="input-group">
        <label for="children-tickets">Enfants : {{ selectedEvent.price_children}} €</label>
        <input id="children-tickets" type="number" min="0" v-model="childrenTickets" @input="calculateTotal" />
      </div>
      <div class="input-group">
        <label for="student-tickets">Étudiant : {{ selectedEvent.price_student}} €</label>
        <input id="student-tickets" type="number" min="0" v-model="studentTickets" @input="calculateTotal" />
      </div>
      <p class="total">Total : {{ this.total }} €</p>
      <button>Réserver vos places</button>
    </div>
  </div>
</div>

  
</template>
  
<script>
import { useEventStore } from '@/stores/eventStore';

export default {
  
  name: 'EventDetails',
  data() {
    return {
      standardTickets: 0,
      vipTickets: 0,
      pmrTickets: 0,
      childrenTickets: 0,
      studentTickets: 0,
    };
  },
  computed: {
    selectedEvent() {
      const eventStore = useEventStore();
      return eventStore.selectedEvent; // Récupérer l'événement depuis le store
    },
    total() {
      if (!this.selectedEvent) {
        return 0; // Si aucun événement sélectionné
      }

      const standardPrice = parseFloat(this.selectedEvent.price_standard) || 0;
      const vipPrice = parseFloat(this.selectedEvent.price_vip) || 0;
      const pmrPrice = parseFloat(this.selectedEvent.price_pmr) || 0;

      const childrenPrice = parseFloat(this.selectedEvent.price_children) || 0;
      const studentPrice = parseFloat(this.selectedEvent.price_student) || 0;

      return (
        (parseInt(this.standardTickets, 10) || 0) * standardPrice +
        (parseInt(this.vipTickets, 10) || 0) * vipPrice +
        (parseInt(this.pmrTickets, 10) || 0) * pmrPrice +
        (parseInt(this.childrenTickets, 10) || 0) * childrenPrice +
        (parseInt(this.studentTickets, 10) || 0 )* studentPrice)
      
    },
  },

methods: {
    goBackToEvents() {
      this.$router.push({ name: 'menu' }); // Redirige vers la route de la liste des événements
    },
  },
};

</script>


<style scoped>

@import '@/assets/styles/EventDetails.css'

</style>