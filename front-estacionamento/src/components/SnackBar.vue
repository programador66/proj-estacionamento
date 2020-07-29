<template>
  <v-snackbar v-model="ativo" :color="color" :timeout="timeout || -1">
    {{ mensagem }}

    <template v-slot:action="{ attrs }">
      <v-btn dark @click="desabilitaSnackbar" v-bind="attrs" text>
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    ativo: {
      // getter
      get: function() {
        return this.$store.state.snackBar.ativo;
      },
      // setter
      set: function() {
        this.$store.commit("setarSBAtivo", false);
      },
    },
    color() {
      return this.$store.state.snackBar.color;
    },
    timeout() {
      return this.$store.state.snackBar.timeout;
    },
    mensagem() {
      return this.$store.state.snackBar.mensagem;
    },
  },
  methods: {
    desabilitaSnackbar() {
      this.$store.commit("setarSBAtivo", false);
    },
  },
};
</script>
