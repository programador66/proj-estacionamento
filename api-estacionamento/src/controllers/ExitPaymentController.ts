import knex from "../database/connection";
import { Request, Response } from "express";
import moment from "moment";

import ExitService from "../services/ExitPaymentService";
import CarsService from "../services/CarsService";
import DateHelper from "../helpers/dateHelper";

class ExitPaymentController {
  async create(request: Request, response: Response) {
    try {
      const { cars_id, placa } = request.body;

      const carsService = new CarsService();
      const dateHelper = new DateHelper();

      const carsResponseService = await carsService.getCarsByIdAndPlaca(
        Number(cars_id),
        String(placa)
      );

      const { hora_entrada } = carsResponseService[0];

      console.log(hora_entrada);

      const hora_saida = moment().locale("pt-br").format("HH:MM:SS");
      console.log(hora_saida);

      const horas_usadas = await dateHelper.diferencaHoras(
        hora_entrada,
        hora_saida
      );

      console.log(horas_usadas);

      const begintransaction = await knex.transaction();
      const total_a_pagar = 200.0;

      const payment = {
        cars_id,
        hora_saida,
        data_saida: moment().format("L"),
        total_a_pagar,
      };

      await begintransaction("exit_payment").insert(payment);

      //begintransaction.commit();
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

  async index(request: Request, response: Response) {
    const payment = await knex("exit_payment").select("*");

    return response.json(payment);
  }

  async exitPayment(request: Request, response: Response) {
    const { cars_id, placa } = request.query;

    const res = await new ExitService().getCarsByIdAndPlaca(
      Number(cars_id),
      String(placa)
    );

    return response.json({ data: res });
  }
}

export default ExitPaymentController;
