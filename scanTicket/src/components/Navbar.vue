<template>
    <div class="main-container">
      <!-- Bouton central -->
      <div class="central-circle" @click="toggleMenu">
        <i class="icon-main" :class="{ rotate: menuOpen }">☰</i>
      </div>
  
      <!-- Menu circulaire -->
      <div class="circle-menu" :class="{ show: menuOpen }" @click="toggleMenu">
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-item"
          :class="`pos-${index + 1}`"
          @click.stop="item.action"
        >
          <div class="icon-text-container">
            <font-awesome-icon :icon="item.icon" class="menu-icon" />
            <p class="menu-label">{{ item.label }}</p>
          </div>
        </div>
      </div>

  
      <!-- Overlay pour fermer EventCard -->
      <div v-if="showEventCard" class="overlay" @click="closeEventCard">
        <div class="event-card-container" @click.stop>
          <EventCard />
        </div>
      </div>

      <!-- Overlay pour fermer CreateEvent -->
      <div v-if="showCreateEvent" class="overlay" @click="closeCreateEvent">
        <div class="event-card-container" @click.stop>
          <CreateEvent />
        </div>
      </div>
    </div>
  </template>
    

  <script setup>
  import { ref } from 'vue';
  import EventCard from '@/components/EventCard.vue';
  import CreateEvent from '@/components/CreateEvent.vue';
  
  // État pour ouvrir/fermer le menu
  const menuOpen = ref(false);
  
  // État pour afficher EventCard
  const showEventCard = ref(false);

  // État pour afficher CreateEvent
  const showCreateEvent = ref(false);
  
  // Fonction pour basculer le menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value; // Inverse l'état (ouvert/fermé)
  };
  
  // Fonction pour fermer EventCard
  const closeEventCard = () => {
    showEventCard.value = false;
  };
  
  // Fonction pour fermer EventCard
  const closeCreateEvent = () => {
    showCreateEvent.value = false;
  };

  // Items du menu
  const menuItems = [
    {
      label: 'Créer Évènement',
      icon: 'fas fa-calendar-plus',
      action: () => {
        showCreateEvent.value = true;
      }
    },
    {
      label: 'Acheter Billet',
      icon: 'fas fa-ticket-alt',
      action: () => alert('Acheter un billet'),
    },
    {
      label: 'Scanner Billet',
      icon: 'fas fa-qrcode',
      action: () => alert('Scanner un billet'),
    },
    {
      label: 'Voir Évènements',
      icon: 'fas fa-calendar',
      action: () => {
        showEventCard.value = true; // Affiche EventCard
      },
    },
  ];

  
  </script>
  

<style scoped>

/* Conteneur pour l'icône et le texte */
.icon-text-container {
  display: flex;
  flex-direction: column; /* Affiche l'icône au-dessus du texte */
  align-items: center; /* Centre horizontalement */
  justify-content: center;
}

/* Icônes dans le menu */
.menu-icon {
  font-size: 24px; /* Taille de l'icône */
  margin-bottom: 0.5rem; /* Espace entre l'icône et le texte */
  color: white; /* Couleur de l'icône */
  position: relative;
  top:16px;
}

/* Labels dans le menu */
.menu-label {
  font-size: 14px;
  color: white;
  text-align: center; /* Centrage du texte */
  opacity: 0; /* Texte caché par défaut */
  transition: opacity 0.3s ease; /* Animation d'apparition */
  position: relative;
  top:12px;
}

/* Affiche le label uniquement au survol */
.menu-item:hover .menu-label {
  opacity: 1;
}

/* Conteneur principal */
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  position: fixed;
  top: 0;
  left: 0;
}

/* Overlay pour fermer EventCard en cliquant à l'extérieur */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fond semi-transparent sombre */
  z-index: 2;
}

/* Bouton central */
.central-circle {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #6e45e2;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.central-circle:hover {
  transform: scale(1.3);
}

.icon-main {
  transition: transform 0.3s ease;
}

.icon-main.rotate {
  transform: rotate(90deg); /* Rotation lorsqu'on ouvre le menu */
}

/* Menu circulaire */
.circle-menu {
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

/* Menu affiché */
.circle-menu.show {
  opacity: 1;
  pointer-events: auto;
}

/* Boutons du menu (fixes) */
.menu-item {
  position: absolute;
  width: 110px;
  height: 110px;
  background: #6e45e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.3s ease;
  
}

.circle-menu.show .menu-item {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto; /* Active les clics quand visible */
}

.menu-item:hover {
  background: #6e45e2;
  color: #fff;
}

/* Labels (cachés par défaut) */
.menu-item .label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* Labels visibles au hover */
.menu-item:hover .label {
  opacity: 1;
  visibility: visible;
}

/* Positions fixes des boutons */
.pos-1 { top: 110px; left: 240px; }
.pos-2 { top: -50px; left: 150px; }
.pos-3 { top: 240px; left: 60px; }
.pos-4 { top: 90px; left: -50px; }

/* Icônes et textes */
.menu-item i {
  font-size: 24px;
}

.menu-item p {
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
}

/* Conteneur de l'EventCard */
.event-card-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 3; 
}

</style>
