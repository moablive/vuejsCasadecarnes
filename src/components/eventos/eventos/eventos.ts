import { defineComponent, ref, onMounted } from "vue";
import EventoService from "../../../services/eventoService";
import { Evento } from "../../../interfaces/evento";
import Navbar from "../../navbar/Navbar.vue";
import { CheckIcon, ExclamationTriangleIcon, TrashIcon, FunnelIcon  } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "Eventos",
  components: {
    Navbar,
    CheckIcon,
    ExclamationTriangleIcon,
    TrashIcon,
    FunnelIcon
  },
  setup() {
    const eventos = ref<Evento[]>([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const eventoIdParaDeletar = ref<number | null>(null);
    const selectedMonth = ref<string>("1");
    const selectedYear = ref<string>(new Date().getFullYear().toString());

    const months = [
      { value: "1", label: "Janeiro" },
      { value: "2", label: "Fevereiro" },
      { value: "3", label: "Março" },
      { value: "4", label: "Abril" },
      { value: "5", label: "Maio" },
      { value: "6", label: "Junho" },
      { value: "7", label: "Julho" },
      { value: "8", label: "Agosto" },
      { value: "9", label: "Setembro" },
      { value: "10", label: "Outubro" },
      { value: "11", label: "Novembro" },
      { value: "12", label: "Dezembro" },
    ];

    const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

    const fetchEventos = async () => {
      try {
        isLoading.value = true;
        const response = await EventoService.getEventosByMonthAndYear(selectedMonth.value, selectedYear.value);
        eventos.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const confirmDelete = (id: number | undefined) => {
      if (id) {
        eventoIdParaDeletar.value = id;
        showModal.value = true;
      }
    };

    const deleteEvento = async () => {
      if (eventoIdParaDeletar.value !== null) {
        try {
          await EventoService.deleteEvento(eventoIdParaDeletar.value);
          fetchEventos();
          closeModal();
        } catch (error) {
          console.error("Erro ao deletar evento:", error);
        }
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const marcarComoPago = async (id: number | undefined) => {
      if (id) {
        try {
          await EventoService.marcarEventoComoPago(id);
          fetchEventos();
        } catch (error) {
          console.error("Erro ao marcar evento como pago:", error);
        }
      }
    };

    const marcarComoNaoPago = async (id: number | undefined) => {
      if (id) {
        try {
          await EventoService.marcarEventoComoNaoPago(id);
          fetchEventos();
        } catch (error) {
          console.error("Erro ao marcar evento como não pago:", error);
        }
      }
    };

    onMounted(fetchEventos);

    return {
      eventos,
      isLoading,
      showModal,
      confirmDelete,
      deleteEvento,
      closeModal,
      marcarComoPago,
      marcarComoNaoPago,
      selectedMonth,
      selectedYear,
      months,
      years,
      fetchEventos,
    };
  },
});