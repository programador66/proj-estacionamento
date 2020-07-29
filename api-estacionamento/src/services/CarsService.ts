import knex from "../database/connection";

interface ICars {
  placa: String;
  cor: String;
  modelo: String;
  hora_entrada: String;
  data_entrada: String;
}

class CarsService {
  async insert(cars: ICars) {
    const begintransaction = await knex.transaction();

    const newCar = await begintransaction("cars").insert(cars);

    begintransaction.commit();

    if (!newCar) {
      return { success: false, error: newCar };
    }

    return { success: true };
  }

  async getCars(data: String) {
    const cars = await knex("cars")
      .select("*")
      .where("cars.data_entrada", "=", data)
      .andWhere("cars.status", "=", "S");

    return cars;
  }

  async getCarsByIdAndPlaca(id: Number, placa: String) {
    const cars = await knex("cars")
      .select("*")
      .where("cars.id", "=", id)
      .andWhere("cars.placa", "=", placa);

    return cars;
  }

  async validateCarsByPlacaAndDate(placa: String, data_entrada: String) {
    const cars = await knex("cars")
      .select("*")
      .where("cars.data_entrada", "=", data_entrada)
      .andWhere("cars.placa", "=", placa);

    return cars;
  }

  async updateCarById(id: Number) {
    const cars = knex("cars").where("id", "=", id).update({
      status: "N",
      thisKeyIsSkipped: undefined,
    });

    return cars;
  }
}

export default CarsService;
