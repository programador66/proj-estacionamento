<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <h2><strong> Relatório Faturamento</strong></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Data Inicial"
          outlined
          dense
          autofocus
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Data Final"
          outlined
          dense
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-btn depressed large color="#0e314a" dark dense>Relatório</v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="12">
        <v-card>
          <v-card-title>
            Relatório
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      { text: "Hora Saida", value: "hora_saida" },
      { text: "Data Saida", value: "data_saida" },
      { text: "Total Pago", value: "total_a_pagar" },
    ],
    carros: [],
  }),
};
</script>
