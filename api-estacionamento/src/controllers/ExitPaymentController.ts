import knex from "../database/connection";
import { Request, Response } from "express";
import moment from "moment";

class ExitPaymentController {
  async create(request: Request, response: Response) {
    try {
      const { cars_id, placa } = request.body;
      const hora_saida = moment().format("h:mm:ss");
      const begintransaction = await knex.transaction();
      const total_a_pagar = 200.0;

      const payment = {
        cars_id,
        hora_saida,
        data: moment().format("L"),
        total_a_pagar,
      };

      await begintransaction("cars").insert(payment);

      begintransaction.commit();
      return response.json({
        msg: "Carro Retirado!",
        http_code: 201,
        hora: hora_saida,
      });
    } catch (err) {
      return response.json({
        msg: "Erro na inserção do veículo",
        http_code: 406,
        error: err.message,
      });
    }
  }
}

export default ExitPaymentController;
