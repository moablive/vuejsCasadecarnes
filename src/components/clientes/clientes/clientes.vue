<template>
    <div>
        <Navbar />
        <div class="p-5 mt-16">
            <h1 class="text-2xl font-bold mb-4">Clientes</h1>

            <!-- Campo de busca -->
            <div class="mb-4">
                <input 
                    v-model="searchTerm" 
                    @input="filterClients" 
                    type="text" 
                    placeholder="Buscar por nome..."
                    class="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <!-- Spinner de carregamento -->
            <div v-if="isLoading" class="flex justify-center items-center">
                <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
            </div>

            <!-- Tabela responsiva -->
            <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="py-2 px-3 text-left">Nome</th>
                            <th class="py-2 px-3 text-left">Email</th>
                            <th class="py-2 px-3 text-left">CNPJ</th>
                            <th class="py-2 px-3 text-left">Contato</th>
                            <th class="py-2 px-3 text-left">País</th>
                            <th class="py-2 px-3 text-left">UF</th>
                            <th class="py-2 px-3 text-left">Cidade</th>
                            <th class="py-2 px-3 text-left">Bairro</th>
                            <th class="py-2 px-3 text-left">Rua/Av</th>
                            <th class="py-2 px-3 text-left">Número</th>
                            <th class="py-2 px-3 text-left">Comp</th>
                            <th class="py-2 px-3 text-left">CEP</th>
                            <th class="py-2 px-3 text-left">TELECON</th>
                            <th class="py-2 px-3 text-left">Vendedor</th>
                            <th class="py-2 px-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr v-for="(cliente, index) in filteredClientes" :key="cliente.ID"
                            :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'" class="border-b">
                            <td class="py-2 px-3">{{ cliente.NOME }}</td>
                            <td class="py-2 px-3">{{ cliente.EMAIL }}</td>
                            <td class="py-2 px-3">{{ cliente.CNPJ }}</td>
                            <td class="py-2 px-3">{{ cliente.CONTATO }}</td>
                            <td class="py-2 px-3">{{ cliente.PAIS }}</td>
                            <td class="py-2 px-3">{{ cliente.ESTADO }}</td>
                            <td class="py-2 px-3">{{ cliente.CIDADE }}</td>
                            <td class="py-2 px-3">{{ cliente.BAIRRO }}</td>
                            <td class="py-2 px-3">{{ cliente.RUA_AV }}</td>
                            <td class="py-2 px-3">{{ cliente.NUMERO }}</td>
                            <td class="py-2 px-3">{{ cliente.COMPLEMENTO }}</td>
                            <td class="py-2 px-3">{{ cliente.CEP }}</td>
                            <td class="py-2 px-3">{{ cliente.CODIGO_TELECON }}</td>
                            <td class="py-2 px-3">{{ cliente.NOME_VENDEDOR }}</td>
                            <td class="py-2 px-3 flex space-x-2">
                                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    @click="handleEditClient(cliente.ID)">
                                    Editar
                                </button>
                                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    @click="handleOpenModal(cliente.ID)">
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal de Confirmação -->
            <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 relative z-50">
                    <h2 class="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                    <p class="mb-4">Tem certeza de que deseja excluir este cliente?</p>
                    <div class="flex justify-end">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            @click="closeModal">Cancelar</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            @click="confirmDelete">Deletar</button>
                    </div>
                </div>
                <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./clientes.ts"></script>
<style src="./clientes.css"></style>