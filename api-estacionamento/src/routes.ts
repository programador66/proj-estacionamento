import express from "express";
import knex from "./database/connection";

import CarsController from "./controllers/CarsController";

const routes = express.Router();
const carsController = new CarsController();

routes.get("/cars", async (request, response) => {
  const cars = await knex("cars").select("*");

  return response.json(cars);
});

routes.post("/cars", carsController.create);

export default routes;
