<template>
  <div class="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style="background-image: url('#');">
    <div class="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Usuário</label>
          <input type="text" id="username" v-model="username" required placeholder="Digite seu usuário"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" id="password" v-model="password" required placeholder="Digite sua senha"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
          username: this.username,
          password: this.password,
        });
        
        // Se o login for bem-sucedido, armazena o token e redireciona
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home'); // Redireciona para a página Home

      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Usuário ou senha incorretos');
      }
    },
  },
});
</script>

<style scoped>
/* Você pode remover o estilo se desejar, o Tailwind lida com isso agora */
</style>
