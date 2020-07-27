import knex from "../database/connection";

class ExitPaymentService {
  async getCarsByIdAndPlaca(cars_id: number, placa: String) {
    const res = await knex
      .from("exit_payment")
      .innerJoin("cars", "exit_payment.cars_id", "cars.id")
      .where("cars.id", "=", cars_id)
      .andWhere("cars.placa", "=", placa);

    return res;
  }
}

export default ExitPaymentService;
