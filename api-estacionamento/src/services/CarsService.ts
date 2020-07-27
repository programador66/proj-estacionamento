import knex from "../database/connection";

interface ICars {
  placa: String;
  cor: String;
  modelo: String;
  hora_entrada: String;
}

class CarsService {
  async insert(cars: ICars) {
    const begintransaction = await knex.transaction();

    const newCar = await begintransaction("cars").insert(cars);

    begintransaction.commit();

    if (!newCar) {
      return { success: false, error: newCar };
    }

    return { success: true, msg: "Carro Estacionado!" };
  }

  async getCars() {
    const cars = await knex("cars").select("*");

    return cars;
  }

  async getCarsByIdAndPlaca(id: Number, placa: String) {
    const cars = await knex("cars")
      .select("*")
      .where("cars.id", "=", id)
      .andWhere("cars.placa", "=", placa);

    return cars;
  }
}

export default CarsService;
