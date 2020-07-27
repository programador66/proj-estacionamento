import express from "express";

import CarsController from "./controllers/CarsController";
import ExitPayment from "./controllers/ExitPaymentController";

const routes = express.Router();
const carsController = new CarsController();
const payment = new ExitPayment();

routes.get("/cars", carsController.index);
routes.post("/cars", carsController.create);

routes.post("/payment", payment.create);
routes.get("/exit-payment", payment.exitPayment);

export default routes;
