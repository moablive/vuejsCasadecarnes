import { defineComponent, ref, onMounted } from "vue";
import EventoService from "../../../services/eventoService";
import { Evento } from "../../../interfaces/evento";
import {
    CheckIcon,
    ExclamationTriangleIcon
  } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "AllPaidUnpaid",
  components: {
    CheckIcon,
    ExclamationTriangleIcon
  },
  setup() {
    const paidEvents = ref<Evento[]>([]);
    const unpaidEvents = ref<Evento[]>([]);
    const isLoading = ref(true);
    const showPaidEvents = ref(false); // Inicializa minimizado
    const showUnpaidEvents = ref(false); // Inicializa minimizado

    const fetchPaidEvents = async () => {
      try {
        isLoading.value = true;
        const response = await EventoService.getAllPaidEvents();
        paidEvents.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos pagos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const fetchUnpaidEvents = async () => {
      try {
        isLoading.value = true;
        const response = await EventoService.getAllUnpaidEvents();
        unpaidEvents.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos não pagos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const togglePaidVisibility = () => {
      showPaidEvents.value = !showPaidEvents.value;
    };

    const toggleUnpaidVisibility = () => {
      showUnpaidEvents.value = !showUnpaidEvents.value;
    };

    onMounted(() => {
      fetchPaidEvents();
      fetchUnpaidEvents();
    });

    return {
      paidEvents,
      unpaidEvents,
      isLoading,
      showPaidEvents,
      showUnpaidEvents,
      togglePaidVisibility,
      toggleUnpaidVisibility,
    };
  },
});
