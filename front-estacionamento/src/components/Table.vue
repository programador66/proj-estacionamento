<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getCars"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Table",

  data: () => ({
    search: "",
    headers: [
      {
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Modelo", value: "modelo" },
      { text: "Placa", value: "placa" },
      { text: "Cor", value: "cor" },
      { text: "Hora Entrada", value: "hora_entrada" },
      { text: "Data Entrada", value: "data_entrada" },
    ],
    carros: [],
  }),
  computed: {
    ...mapGetters(["getCars"]),
  },
};
</script>
