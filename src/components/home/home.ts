import { defineComponent } from "vue";
import Navbar from "../navbar/Navbar.vue";
import BuscarProximosCincoDias from "./buscarProximosCincoDias/buscarProximosCincoDias.vue";
import Map from "./map/map.vue";

export default defineComponent({
  name: "Home",
  components: {
    Navbar,
    BuscarProximosCincoDias,
    Map,
  },
});