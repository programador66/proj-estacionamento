import store from "../store";
export const exibirMensagem = (mensagem, color, timeout) => {
  const snackbar = { mensagem, color, timeout, ativo: true };
  store.commit("habilitarSnackBar", snackbar);
};
