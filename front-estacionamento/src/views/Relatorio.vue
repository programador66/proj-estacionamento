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
          v-model="data_inicial"
          label="Data Inicial"
          outlined
          dense
          autofocus
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          v-model="data_final"
          label="Data Final"
          outlined
          dense
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-btn
          depressed
          large
          color="#0e314a"
          dark
          dense
          @click="generateRevenues"
          >Relatório</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="12">
        <v-card>
          <v-card-title>
            Relatório Faturamento Total : {{ total }}
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
            :items="relatorio"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";

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
    data_inicial: "",
    data_final: "",
    total: "",
    relatorio: [],
  }),

  methods: {
    generateRevenues() {
      const data_inicial = this.data_inicial;
      const data_final = this.data_final;

      api
        .getRevenues({ data_inicial, data_final })
        .then((result) => {
          this.relatorio = result.data.data;
          this.total = result.data.faturamento;
        })
        .catch((e) => {
          const mensagem = `${e.response.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "red", 3000);
        });
    },
    querySelections(v) {
      this.loading = true;

      setTimeout(() => {
        this.items = this.relatorio
          .map((cars) => cars.placa)
          .filter((e) => {
            return (
              (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
        this.loading = false;
      }, 500);
    },
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
};
</script>
