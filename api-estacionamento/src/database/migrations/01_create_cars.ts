import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.string("placa").notNullable();
    table.string("cor");
    table.string("modelo").notNullable();
    table.time("hora_entrada").notNullable();
    table.date("data_entrada");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("cars");
}
