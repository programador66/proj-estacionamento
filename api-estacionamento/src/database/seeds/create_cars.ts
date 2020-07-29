import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("cars").insert([
    {
      placa: "xybr-3243",
      modelo: "BMW",
      cor: "branca",
      hora_entrada: "08:01:00",
      data_entrada: "28/07/2020",
      status: "S",
    },
    {
      placa: "xybr-32556",
      modelo: "Gol",
      cor: "Preto",
      hora_entrada: "08:01:00",
      data_entrada: "29/07/2020",
      status: "S",
    },
  ]);
}
