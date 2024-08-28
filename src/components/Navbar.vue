<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home">LOGO</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/clientes">Clientes</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="handleLogout">
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '@/utils/auth';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  methods: {
    handleLogout() {
      logout(this.router);
    }
  }
});
</script>

<style scoped>
/* Adiciona estilos adicionais, se necessário */
</style>
