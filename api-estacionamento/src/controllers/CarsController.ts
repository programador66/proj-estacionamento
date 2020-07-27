import knex from "../database/connection";
import { Request, Response } from "express";
import moment from "moment";

class CarsController {
  async create(request: Request, response: Response) {
    const { placa, cor, modelo } = request.body;

    moment.locale();

    const hora_entrada = moment().format("h:mm:ss");

    try {
      const begintransaction = await knex.transaction();

      const cars = {
        placa,
        cor,
        modelo,
        hora_entrada,
      };

      const newCar = await begintransaction("cars").insert(cars);

      begintransaction.commit();
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
    const cars = await knex("cars").select("*");

    return response.json(cars);
  }
}

export default CarsController;
