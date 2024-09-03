<template>
  <nav class="bg-gray-800 p-4 fixed w-full z-10 top-0 shadow">
    <div class="container mx-auto flex items-center justify-between">
      <router-link to="/home" class="text-white font-bold text-lg">
        LOGO
      </router-link>
      <div class="flex items-center space-x-4">
        <!-- Menu Clientes -->
        <div class="relative group">
          <button class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
            Clientes
          </button>
          <div
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 ease-in-out pointer-events-auto">
            <router-link to="/clientes" class="block px-4 py-2 hover:bg-gray-100">
              <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
              Listar Clientes
            </router-link>
            <router-link to="/cadastrar-cliente" class="block px-4 py-2 hover:bg-gray-100">
              <UserIcon class="w-5 h-5 inline-block mr-2" />
              Cadastrar Cliente
            </router-link>
          </div>
        </div>

        <!-- Menu Vendedores -->
        <div class="relative group">
          <button class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <BriefcaseIcon class="w-5 h-5 inline-block mr-2" />
            Vendedores
          </button>
          <div
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 ease-in-out pointer-events-auto">
            <router-link to="/vendedores" class="block px-4 py-2 hover:bg-gray-100">
              <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
              Listar Vendedores
            </router-link>
            <router-link to="/cadastrar-vendedor" class="block px-4 py-2 hover:bg-gray-100">
              <UserIcon class="w-5 h-5 inline-block mr-2" />
              Cadastrar Vendedor
            </router-link>
          </div>
        </div>

        <!-- Menu Eventos -->
        <div class="relative group">
          <button class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <CalendarIcon class="w-5 h-5 inline-block mr-2" />
            Eventos
          </button>
          <div
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 ease-in-out pointer-events-auto">
            <router-link to="/eventos" class="block px-4 py-2 hover:bg-gray-100">
              <CalendarIcon class="w-5 h-5 inline-block mr-2" />
              Listar Eventos
            </router-link>
          </div>
        </div>

        <!-- Btn Logout -->
        <button class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none"
          @click="logout">
          <ArrowRightOnRectangleIcon class="w-5 h-5 inline-block" />
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" src="./Navbar.ts"></script>
<style src="./Navbar.css"></style>