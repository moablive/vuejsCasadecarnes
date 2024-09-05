<template>
    <div>
        <Navbar />
        <div class="p-5 mt-16">
            <h1 class="text-2xl font-bold mb-4">Eventos</h1>

            <!-- Filtros para mês e ano -->
            <div class="flex space-x-4 mb-4">
                <div>
                    <label for="month" class="block text-sm font-medium text-gray-700">Mês</label>
                    <select v-model="selectedMonth" id="month"
                        class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="month in months" :key="month.value" :value="month.value">
                            {{ month.label }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="year" class="block text-sm font-medium text-gray-700">Ano</label>
                    <select v-model="selectedYear" id="year"
                        class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="year in years" :key="year" :value="year">
                            {{ year }}
                        </option>
                    </select>
                </div>
                <button @click="fetchEventos"
                    class="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
                    <FunnelIcon class="w-5 h-5 mr-2" />
                    Filtrar
                </button>
            </div>

            <!-- Loader enquanto os eventos são carregados -->
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>

            <!-- Tabela de eventos -->
            <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="py-2 px-3 text-left">Título</th>
                            <th class="py-2 px-3 text-left">Razão Social</th>
                            <th class="py-2 px-3 text-left">Data de Emissão</th>
                            <th class="py-2 px-3 text-left">Data de Vencimento</th>
                            <th class="py-2 px-3 text-left">Valor NF</th> <!-- Adicionei a coluna de Valor NF -->
                            <th class="py-2 px-3 text-left">Status</th>
                            <th class="py-2 px-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr v-for="(evento, index) in eventos" :key="evento.Id"
                            :class="['border-b', index % 2 === 0 ? 'bg-gray-100' : 'bg-white', evento.status_pagamento === 'pago' ? 'bg-green-100' : evento.status_pagamento === 'não pago' ? 'bg-red-100' : '']">
                            <td class="py-2 px-3">{{ evento.TituloEvento }}</td>
                            <td class="py-2 px-3">{{ evento.RazaoSocial }}</td>
                            <td class="py-2 px-3">{{ evento.DataEmissao ? new
                                Date(evento.DataEmissao).toLocaleDateString() : 'N/A' }}</td>
                            <td class="py-2 px-3">{{ evento.DataVencimento ? new
                                Date(evento.DataVencimento).toLocaleDateString() : 'N/A' }}</td>
                            <td class="py-2 px-3">{{ evento.ValorNF ? evento.ValorNF.toLocaleString('pt-BR', {
                                style:
                                    'currency', currency: 'BRL' }) : 'N/A' }}</td> <!-- Mostrando Valor NF formatado -->
                            <td class="py-2 px-3">{{ evento.status_pagamento }}</td>
                            <td class="py-2 px-3 flex space-x-2">
                                <button v-if="evento.status_pagamento !== 'pago'"
                                    class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    @click="marcarComoPago(evento.Id)">
                                    <CheckIcon class="w-5 h-5 inline-block mr-1" /> Pago
                                </button>
                                <button v-if="evento.status_pagamento === 'pago'"
                                    class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    @click="marcarComoNaoPago(evento.Id)">
                                    <ExclamationTriangleIcon class="w-5 h-5 inline-block mr-1" /> Não Pago
                                </button>
                                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    @click="confirmDelete(evento.Id)">
                                    <TrashIcon class="w-5 h-5 inline-block mr-1" /> Deletar
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
                    <p class="mb-4">Tem certeza de que deseja excluir este evento?</p>
                    <div class="flex justify-end">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            @click="closeModal">Cancelar</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            @click="deleteEvento">Deletar</button>
                    </div>
                </div>
                <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./eventos.ts"></script>
<style lang="css" src="./eventos.css"></style>
