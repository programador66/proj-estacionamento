import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as Helpers from "./Helpers";
import VueTheMask from "vue-the-mask";

Vue.prototype.Helpers = Helpers;

Vue.use(VueTheMask);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
