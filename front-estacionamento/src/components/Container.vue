<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="8"><h2>Carros Estacionados</h2></v-col>
      <v-col cols="6" md="4"><h2>Menu</h2></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="8">
        <Table />
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="pa-2" outlined tile>
          <v-btn color="#0e314a" dark class="btn"
            >Retirar Carro
            <v-icon>mdi-car-arrow-left</v-icon>
          </v-btn>
        </v-card>
        <v-card class="pa-2" outlined tile>
          <v-btn color="#0e314a" dark class="btn"
            >Relatorio
            <v-icon>mdi-file-chart</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Table from "../components/Table";

export default {
  name: "Container",
  components: { Table },
  data: () => ({}),
};
</script>
<style scoped>
.btn {
  width: 100%;
}
</style>
