import pg from "pg";

export let pool = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "imgone",
  port: 5432
});
