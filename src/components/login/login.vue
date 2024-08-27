<template>
  <div class="login-background d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px;">
      <h1 class="text-center mb-4">Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="username" class="form-label">Usuário</label>
          <input type="text" id="username" class="form-control" v-model="username" required
            placeholder="Digite seu usuário" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Senha</label>
          <input type="password" id="password" class="form-control" v-model="password" required
            placeholder="Digite sua senha" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
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
        const response = await axios.post(`${import.meta.env.VITE_API_URL}api/usuarios/login`, {
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
.login-background {
  background-image: url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc201azRuM3B5MzR3ZzJreXZoOTV1ZG02NXFrMGxqbDlmZWRua3A0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L8K62iTDkzGX6/giphy.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9); /* Fundo semi-transparente */
}
</style>
