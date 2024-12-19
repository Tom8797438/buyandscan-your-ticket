<template>
    <h1>Créer un Évènement</h1>
    <div class="create-event-container">
      
      <!-- Formulaire de création d'évènement -->
      <form @submit.prevent="createEvent">
        <div class="form-group">
          <label for="name">Nom de l'évènement</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>
  
        <div class="form-group">
          <label for="name">Description</label>
          <input v-model="form.description" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="date">Date</label>
          <input v-model="form.event_date" type="date" id="date" required />
        </div>
  
        <div class="form-group">
          <label for="location">Lieu</label>
          <input v-model="form.location" type="text" id="location" required />
        </div>
  
        <div class="form-group">
          <label for="address">Adresse</label>
          <input v-model="form.address" type="text" id="address" required />
        </div>

        <div class="form-group">
          <label for="postal_code">Code Postal</label>
          <input v-model="form.postal_code" type="text" id="postal_code" required />
        </div>
  
        <div class="form-group">
          <label for="city">Ville</label>
          <input v-model="form.city" type="text" id="city" required />
        </div>
  
        <div class="form-group">
          <label for="total_seats">Nombre de places</label>
          <input v-model="form.total_seats" type="number" id="total_seats" required />
        </div>
  
        <div class="form-group">
          <label for="price_standard">Prix Standard</label>
          <input v-model="form.price_standard" type="number" id="price_standard" required />
        </div>
  
        <div class="form-group">
          <label for="price_vip">Prix VIP</label>
          <input v-model="form.price_vip" type="number" id="price_vip" />
        </div>
  
        <div class="form-group">
          <label for="price_children">Prix PMR</label>
          <input v-model="form.price_children" type="number" id="price_children" />
        </div>
  
        <div class="form-group">
          <label for="price_pmr">Prix Enfants</label>
          <input v-model="form.price_pmr" type="number" id="price_pmr" />
        </div>

        <div class="form-group">
          <label for="price_student">Prix Etudiant</label>
          <input v-model="form.price_student" type="number" id="price_student" />
        </div>

        <div class="form-group">
          <button type="submit">Valider</button>
        </div>
      </form>
  
      <!-- Message de statut -->
      <p v-if="success" class="success">Évènement créé avec succès !</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { useEventStore } from '@/stores/eventStore';
  
  export default {
    name: 'CreateEvent',
    data() {
      return {
        form: {
          name: '',
          description: '',
          event_date: '',
          location: '',
          address: '',
          postal_code:'',
          city: '',
          total_seats: null,
          price_standard: null,
          price_vip: null,
          price_pmr: null,
          price_children: null,
          price_student: null,
        },
        success: false,
        error: null,
      };
    },
    methods: {
      async createEvent() {
        const eventStore = useEventStore();
  
        try {
          await eventStore.createEvent(this.form);
          this.success = true; // Affiche un message de succès
          this.error = null;
          this.resetForm(); // Réinitialise le formulaire
        } catch (err) {
          this.success = false;
          this.error = 'Erreur lors de la création de l\'évènement.';
        }
      },
      resetForm() {
        this.form = {
          name: '',
          event_date: '',
          location: '',
          address: '',
          city: '',
          total_seats: null,
          price_standard: null,
          price_vip: null,
          price_pmr: null,
        };
      },
    },
  };
  </script>
  
  <style scoped>
.create-event-container {
  columns: 2;
  max-width: 800px;
  margin: 2rem auto; /* Centrer avec un espace autour */
  padding: 2rem; /* Ajout d'espace intérieur */
  background-color: #f9f9f9; /* Couleur de fond douce */
  border: 1px solid #e0e0e0;
  border-radius: 8px; /* Coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

/* Style pour le titre */
.create-event-container h1 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Style des groupes de champs */
.form-group {
  margin-bottom: 1.5rem; /* Espacement vertical entre les groupes */
}

.form-group button {
  position: relative;
  top:28px;
}

/* Style des libellés */
label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5rem;
}

/* Style des champs de saisie */
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* Inclure le padding et la bordure */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #007bff; /* Bleu au focus */
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5); /* Effet lumineux */
  outline: none;
}

/* Style du bouton */
button {
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3; /* Bleu plus foncé */
  transform: scale(1.02); /* Légère augmentation */
}

/* Messages de succès et d'erreur */
.success {
  color: #28a745;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}

.error {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
</style>
