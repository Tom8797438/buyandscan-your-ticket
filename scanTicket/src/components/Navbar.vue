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
          <i :class="item.icon"></i>
          <p>{{ item.label }}</p>
        </div>
      </div>
  
      <!-- Overlay pour fermer EventCard -->
      <div v-if="showEventCard" class="overlay" @click="closeEventCard">
        <div class="event-card-container" @click.stop>
          <EventCard />
        </div>
      </div>
    </div>
  </template>
  
  

  <script setup>
  import { ref } from 'vue';
  import EventCard from '@/components/EventCard.vue';
  
  // État pour ouvrir/fermer le menu
  const menuOpen = ref(false);
  
  // État pour afficher EventCard
  const showEventCard = ref(false);
  
  // Fonction pour basculer le menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value; // Inverse l'état (ouvert/fermé)
  };
  
  // Fonction pour fermer EventCard
  const closeEventCard = () => {
    showEventCard.value = false;
  };
  
  // Items du menu
  const menuItems = [
    {
      label: 'Créer Évènement',
      icon: 'fas fa-calendar-plus',
      action: () => alert('Créer un évènement'),
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
  transform: scale(1.1);
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
  width: 80px;
  height: 80px;
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

/* Positions fixes des boutons */
.pos-1 { top: 100px; left: 220px; }
.pos-2 { top: -20px; left: 150px; }
.pos-3 { top: 220px; left: 60px; }
.pos-4 { top: 80px; left: -10px; }

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
