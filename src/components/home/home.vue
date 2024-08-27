<template>
    <Navbar />
  
    <div class="content p-5 bg-primary text-white rounded">
      <h1>CONTEUDO DA PAGINA HOME</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Navbar from '../Navbar.vue';
  
  export default defineComponent({
    name: 'Home',
    components: {
      Navbar,
    },
    created() {
      // Verifica se o token existe, se não, redireciona para login
      if (!localStorage.getItem('token')) {
        this.$router.push('/');
      }
    },
  });
  </script>
  
  <style scoped>
  </style>