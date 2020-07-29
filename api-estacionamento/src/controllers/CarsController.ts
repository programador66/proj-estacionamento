import { Request, Response } from "express";
import CarsService from "../services/CarsService";
import DateHelper from "../helpers/dateHelper";

import moment from "moment";

class CarsController {
  async create(request: Request, response: Response) {
    try {
      const carService = new CarsService();
      const dateHelper = new DateHelper();
      const { placa, cor, modelo } = request.body;

      if (placa == "" || cor == "" || modelo == "") {
        throw new Error("Campos De entrada Nulos!");
      }

      const hora_entrada = moment().locale("pt-br").format("HH:MM:SS");
      const data_entrada = moment().locale("pt-br").format("L");

      const validateEnterCarByDate = await carService.validateCarsByPlacaAndDate(
        placa,
        data_entrada
      );

      if (Object.keys(validateEnterCarByDate).length !== 0) {
        return response.status(406).json({
          msg: "Veículo ja foi estacionado data: " + data_entrada,
          error: "ja existe no bd",
        });
      }

      const validaHoraEntrada = await dateHelper.validaHoraDeEntrada(
        hora_entrada
      );

      if (!validaHoraEntrada) {
        throw new Error("Hora de entrada não permitida!");
      }

      const cars = {
        placa,
        cor,
        modelo,
        hora_entrada,
        data_entrada,
        status: "S",
      };

      const resDb = await carService.insert(cars);

      if (!resDb.success) {
        throw new Error("Erro BD");
      }

      return response.status(201).json({
        msg: "Carro Estacionado",
        hora: hora_entrada,
      });
    } catch (err) {
      return response.status(406).json({
        msg: "Erro na inserção do veículo",
        error: err.message,
      });
    }
  }

  async index(request: Request, response: Response) {
    const data = moment().locale("pt-br").format("L");
    const res = await new CarsService().getCars(data);

    return response.json(res);
  }
}

export default CarsController;
