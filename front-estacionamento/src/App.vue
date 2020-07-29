<template>
  <v-app>
    <v-app-bar app color="#0e314a" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <strong>PMZ</strong>
      </div>

      <v-spacer></v-spacer>

      <v-btn target="_blank" text>
        <span class="mr-2">User: Caio César</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <snackBar />
  </v-app>
</template>

<script>
import snackBar from "./components/SnackBar";
export default {
  components: { snackBar },
  name: "App",
  data: () => ({
    //
  }),
};
</script>
