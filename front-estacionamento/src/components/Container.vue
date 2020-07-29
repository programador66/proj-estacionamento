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
          <v-btn color="#0e314a" dark class="btn" @click="dialogCar = true"
            >Entrada de Carro
            <v-icon>mdi-car-arrow-right</v-icon>
          </v-btn>
        </v-card>
        <v-card class="pa-2" outlined tile>
          <v-btn color="#0e314a" dark class="btn" @click="dialogCarSaida = true"
            >Retirada de Carro
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

    <v-dialog v-model="dialogCar" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Entrada de Veículos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Placa do Carro*"
                  v-model="placa"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Cor*" v-model="cor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Modelo*"
                  v-model="modelo"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Nomes obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCar = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="handleInsertCar"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCarSaida" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Saída de Veículos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12" v-if="!carroRetirado">
                <v-autocomplete
                  v-model="placaSaida"
                  :loading="loading"
                  :items="items"
                  :search-input.sync="search"
                  cache-items
                  class="mx-4"
                  flat
                  hide-no-data
                  hide-details
                  label="Digite a placa do veículo"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="12" v-else>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <h3>
                      <strong>{{ payment }}</strong>
                    </h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <h2>
                      <strong>Total a pagar : {{ valor }}</strong>
                    </h2>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="handleSetStatusCarroRetirado"
            >Close</v-btn
          >
          <v-btn
            v-if="!carroRetirado"
            color="blue darken-1"
            text
            @click="handlePayment"
            >Finalizar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Table from "../components/Table";
import api from "../services/api";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Container",
  components: { Table },
  data: () => ({
    dialogCar: false,
    dialogCarSaida: false,
    placa: "",
    placaSaida: "",
    cor: "",
    modelo: "",
    loading: false,
    items: [],
    search: null,
    select: null,
    carroRetirado: false,
    payment: "pagamento",
    valor: "0",
  }),
  mounted() {
    this.setCarsStore();
  },
  computed: {
    ...mapGetters(["getCars"]),
  },
  methods: {
    ...mapMutations(["setCars"]),
    setCarsStore() {
      api
        .getCars()
        .then((result) => {
          this.setCars(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleInsertCar() {
      const placa = this.placa;
      const cor = this.cor;
      const modelo = this.modelo;

      api
        .setCars({ placa, cor, modelo })
        .then((result) => {
          const mensagem = `${result.data.msg} horário: ${result.data.hora}`;
          this.Helpers.exibirMensagem(mensagem, "green", 3000);

          this.dialogCar = false;
          this.placa = "";
          this.cor = "";
          this.modelo = "";
          this.setCarsStore();
        })
        .catch((e) => {
          const mensagem = `${e.response.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "red", 3000);
        });
    },
    handlePayment() {
      const { id, placa } = this.getCars.filter(
        (car) => car.placa === this.placaSaida
      )[0];

      api
        .setPayment({ cars_id: id, placa })
        .then((result) => {
          this.carroRetirado = true;
          this.payment = `${result.data.msg} ás ${result.data.hora}`;
          this.valor = result.data.total_a_pagar;
        })
        .catch((e) => {
          const mensagem = `${e.response.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "red", 3000);
        });
    },
    handleSetStatusCarroRetirado() {
      this.carroRetirado = false;
      this.dialogCarSaida = false;
      this.placaSaida = "";
      this.setCarsStore();
    },
    querySelections(v) {
      this.loading = true;

      setTimeout(() => {
        this.items = this.getCars
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
<style scoped>
.btn {
  width: 100%;
}
</style>
