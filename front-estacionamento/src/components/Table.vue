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
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import api from "../services/api";

export default {
  name: "Table",

  data: () => ({
    search: "",
    headers: [
      {
        text: "Carros",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Placa", value: "placa" },
      { text: "Cor", value: "cor" },
      { text: "Modelo", value: "modelo" },
      { text: "Hora Entrada", value: "hora_entrada" },
      { text: "Data Entrada", value: "data_entrada" },
    ],
    desserts: [
      {
        name: "HB20",
        placa: 159,
        cor: 6.0,
        modelo: 24,
        hora_entrada: 4.0,
        data_entrada: "1%",
      },
      {
        name: "City",
        placa: 159,
        cor: 6.0,
        modelo: 24,
        hora_entrada: 4.0,
        data_entrada: "1%",
      },
    ],
  }),
  methods: {
    getCars() {
      api
        .getCars()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getCars();
  },
};
</script>
