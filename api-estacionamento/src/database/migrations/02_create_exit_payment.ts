import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("exit_payment", (table) => {
    table.increments("id").primary();
    table.integer("cars_id").notNullable().references("id").inTable("cars");
    table.time("hora_saida").notNullable();
    table.date("data_saida");
    table.float("total_a_pagar");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("exit_payment");
}
