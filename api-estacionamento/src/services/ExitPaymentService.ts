import knex from "../database/connection";

interface IPayment {
  cars_id: Number;
  hora_saida: String;
  data_saida: String;
  total_a_pagar: Number;
}

class ExitPaymentService {
  async insert(payment: IPayment) {
    const begintransaction = await knex.transaction();
    const newPayment = await begintransaction("exit_payment").insert(payment);

    if (!newPayment) {
      begintransaction.rollback();
      return { success: false, error: newPayment };
    }
    begintransaction.commit();
    return { success: true };
  }

  async getPayment(data_inicial: String, data_final: String) {
    const res = await knex
      .from("exit_payment")
      .innerJoin("cars", "exit_payment.cars_id", "cars.id")
      .whereBetween("exit_payment.data_saida", [data_inicial, data_final]);
    return res;
  }

  async validateExitCarsByPlacaAndDate(data_saida: String, id: Number) {
    const exit = await knex("exit_payment")
      .select("*")
      .where("exit_payment.data_saida", "=", data_saida)
      .andWhere("exit_payment.id", "=", id);

    return exit;
  }
}

export default ExitPaymentService;
