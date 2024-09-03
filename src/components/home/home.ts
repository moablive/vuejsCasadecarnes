import { defineComponent } from "vue";
import Navbar from "../navbar/Navbar.vue";
import buscarProximosCincoDias from "./buscarProximosCincoDias/buscarProximosCincoDias.vue";

export default defineComponent({
  name: "Home",
  components: {
    Navbar,
    buscarProximosCincoDias
  },
  setup() {
  },

});