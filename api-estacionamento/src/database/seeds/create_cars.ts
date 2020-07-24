import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("cars").insert([
    {
      placa: "xybr-3243",
      modelo: "BMW",
      cor: "branca",
      hora_entrada: "12:00:00",
    },
  ]);
}
