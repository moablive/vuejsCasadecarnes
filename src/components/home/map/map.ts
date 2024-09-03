import { defineComponent, ref, onMounted, computed } from 'vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ClientService from '../../../services/ClientService';
import { Cliente } from '../../../interfaces/cliente';

// Importa as URLs dos ícones
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configura os ícones padrão do Leaflet para garantir que eles sejam exibidos corretamente
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default defineComponent({
  name: 'Map',
  setup() {
    const clients = ref<Cliente[]>([]);
    const defaultLat = ref(-29.90275696187172);
    const defaultLon = ref(-51.191230930169034);

    const clientsWithCoordinates = computed(() => {
      return clients.value.filter(client => client.LATITUDE !== null && client.LONGITUDE !== null);
    });

    const fetchClients = async () => {
      try {
        const response = await ClientService.getAllClients();
        clients.value = response.data;

        // Após carregar os clientes, adiciona os marcadores
        const map = L.map('map').setView([defaultLat.value, defaultLon.value], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        clientsWithCoordinates.value.forEach(client => {
          if (client.LATITUDE && client.LONGITUDE) {
            L.marker([client.LATITUDE, client.LONGITUDE])
              .addTo(map)
              .bindPopup(`
                <strong>${client.NOME}</strong><br>
                ${client.RUA_AV}, ${client.NUMERO}<br>
                <strong>TELECON:</strong> ${client.CODIGO_TELECON}
              `);
          }
        });
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    onMounted(fetchClients);

    return {
      clientsWithCoordinates,
      defaultLat,
      defaultLon,
    };
  }
});
