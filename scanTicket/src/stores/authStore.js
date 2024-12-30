import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null, // Informations sur l'utilisateur
    token: null, // Token JWT
    error: null, // Message d'erreur
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('https://popular-friendship-c117528b75.strapiapp.com/api/auth/local', {
          identifier: email,
          password,
        });

        this.token = response.data.jwt;
        this.user = response.data.user;

        // Stocker le token dans un cookie
        Cookies.set('authToken', this.token, { secure: true, sameSite: 'strict' });

        // Configurer Axios avec le token
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.error = null;
      } catch (err) {
        this.error = 'Échec de la connexion. Vérifiez vos identifiants.';
        console.error(err);
      }
    },

    logout(router) {
      this.user = null;
      this.token = null;
    
      // Supprimer le cookie
      Cookies.remove('authToken');
    
      // Retirer l'Authorization d'Axios
      delete axios.defaults.headers.common['Authorization'];
    
      // Effectuer la redirection
      if (router) {
        router.push('/login').catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error(err);
          }
        });
      } else {
        console.error('Router instance is not provided to logout');
      }
    },
    
    
    

    autoLogin() {
      // Lire le token depuis le cookie
      const token = Cookies.get('authToken');

      if (token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        // Optionnel : récupérer les infos utilisateur depuis Strapi
        console.log('Token trouvé dans les cookies');
      } else {
        console.warn('Aucun token trouvé dans les cookies.');
      }
    },
  },
});
