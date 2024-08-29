<template>
  <nav class="bg-gray-800 p-4 fixed w-full z-10 top-0 shadow">
    <div class="container mx-auto flex items-center justify-between">
      <router-link to="/home" class="text-white font-bold text-lg">
        LOGO
      </router-link>
      <div class="flex items-center space-x-4">
        <div class="relative group">
          <button
            class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
          >
            Clientes
          </button>
          <div
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 ease-in-out pointer-events-auto"
          >
            <router-link
              to="/clientes"
              class="block px-4 py-2 hover:bg-gray-100"
            >
              Listar Clientes
            </router-link>
            <router-link
              to="/cadastrar-cliente"
              class="block px-4 py-2 hover:bg-gray-100"
            >
              Cadastrar Cliente
            </router-link>
          </div>
        </div>
        <button
          class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.ts"></script>
<style src="./Navbar.css"></style>