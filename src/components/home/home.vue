<template>
  <div>
    <Navbar />

    <div class="container mx-auto p-8 mt-8">
      <div class="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold">CONTEÚDO DA PÁGINA HOME</h1>
        <p class="mt-4 text-lg">Bem-vindo à página inicial. Este é o conteúdo principal.</p>
      </div>
    </div>
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
/* Estilos adicionais, se necessário */
</style>
