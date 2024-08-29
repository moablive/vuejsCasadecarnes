import { defineComponent } from "vue";
import Navbar from "../navbar/Navbar.vue";

export default defineComponent({
  name: "Home",
  components: {
    Navbar,
  },
  created() {
    // Verifica se o token existe, se não, redireciona para login
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
});
