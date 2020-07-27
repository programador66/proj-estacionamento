import moment, { isMoment } from "moment";

class DateHelper {
  async diferencaHoras(horaInicial: String, horaFinal: String) {
    // Tratamento se a hora inicial é menor que a final

    const hIni = horaInicial.split(":");
    const hFim = horaFinal.split(":");

    let IhorasFor = parseInt(hIni[0], 10);
    let IminFor = parseInt(hIni[1], 10);

    let FhorasFor = parseInt(hFim[0], 10);
    let FminFor = parseInt(hFim[1], 10);

    let horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
    let minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

    if (minutosTotal >= 60) {
      minutosTotal -= 60;
      horasTotal += 1;
    }

    let valortotal;

    if (IhorasFor >= 8 && IminFor >= 0 && FhorasFor <= 12 && FminFor == 0) {
      valortotal = horasTotal * 2;
    } else if (IhorasFor >= 12 && IminFor > 0 && FhorasFor <= 18) {
      valortotal = horasTotal * 3;
    } else {
      valortotal = 0;
    }

    return valortotal;
  }
}

export default DateHelper;
