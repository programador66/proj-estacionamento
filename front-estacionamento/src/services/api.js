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
}

export default new api();
