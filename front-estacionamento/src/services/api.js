import axios from "axios";

class api {
  constructor() {
    const api = axios.create({
      baseURL: `http://localhost:3333`,
    });
    this.api = api;
  }

  async getCars() {
    const response = await this.api.get("/cars");
    return response;
  }

  async setCars(params) {
    const response = await this.api.post("/cars", params);
    return response;
  }

  async setPayment(params) {
    const response = await this.api.post("/payment", params);
    return response;
  }

  async getRevenues(params) {
    const response = await this.api.post("/revenues", params);
    return response;
  }
}

export default new api();
