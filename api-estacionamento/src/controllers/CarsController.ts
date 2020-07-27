import knex from "../database/connection";
import { Request, Response } from "express";
import CarsService from "../services/CarsService";
import moment from "moment";

class CarsController {
  async create(request: Request, response: Response) {
    try {
      const carService = new CarsService();

      const { placa, cor, modelo } = request.body;

      const hora_entrada = moment().locale("pt-br").format("HH:MM:SS");

      const cars = {
        placa,
        cor,
        modelo,
        hora_entrada,
      };

      const resDb = await carService.insert(cars);

      if (!resDb.success) {
        throw new Error("Erro BD");
      }

      return response.json({
        msg: "Carro Estacionado",
        http_code: 201,
        hora: hora_entrada,
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
    const res = await new CarsService().getCars();

    return response.json(res);
  }
}

export default CarsController;
