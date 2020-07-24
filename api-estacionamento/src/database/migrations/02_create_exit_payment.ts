import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("exit_payment", (table) => {
    table.increments("id").primary();
    table.string("cars_id").notNullable().references("id").inTable("cars");
    table.time("hora-saida").notNullable();
    table.date("data");
    table.float("total_a_pagar");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("exit_payment");
}
