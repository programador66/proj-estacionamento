import { Request, Response } from "express";
import moment from "moment";

import CarsService from "../services/CarsService";
import DateHelper from "../helpers/dateHelper";
import ExitPaymentService from "../services/ExitPaymentService";

class ExitPaymentController {
  async create(request: Request, response: Response) {
    try {
      const { cars_id, placa } = request.body;

      const carsService = new CarsService();
      const dateHelper = new DateHelper();
      const paymentService = new ExitPaymentService();

      const carsResponseService = await carsService.getCarsByIdAndPlaca(
        Number(cars_id),
        String(placa)
      );

      const { hora_entrada } = carsResponseService[0];

      const hora_saida = moment().locale("pt-br").format("HH:MM:SS");
      const data_saida = moment().locale("pt-br").format("L");
      const dia = moment().locale("pt-br").format("dddd");

      const validateExit = await paymentService.validateExitCarsByPlacaAndDate(
        data_saida,
        cars_id
      );

      if (Object.keys(validateExit).length !== 0) {
        return response.status(406).json({
          msg: "Veículo ja foi retirado! data: " + dia,
          error: "ja existe no bd",
        });
      }

      const valor_a_pagar = await dateHelper.validaDiaERetornaValor(
        dia,
        hora_entrada,
        hora_saida
      );

      const payment = {
        cars_id,
        hora_saida,
        data_saida: moment().locale("pt-br").format("L"),
        total_a_pagar: valor_a_pagar,
      };

      const res = await paymentService.insert(payment);

      if (!res.success) {
        throw new Error("Erro BD");
      }

      const alterStatus = await carsService.updateCarById(cars_id);

      return response.status(201).json({
        msg: "Carro Retirado!",
        hora: hora_saida,
        total_a_pagar: `R$ ${valor_a_pagar},00`,
      });
    } catch (err) {
      return response.status(406).json({
        msg: "Erro na Retirada do veículo",
        error: err.message,
      });
    }
  }

  async index(request: Request, response: Response) {
    const paymentService = new ExitPaymentService();

    const res = await paymentService.getPayment();

    return response.status(200).json(res);
  }
}

export default ExitPaymentController;
