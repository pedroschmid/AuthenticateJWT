import { pool } from "../databases/postgres";

export class UserController {
  async selectAll(request, response) {
    let SQL = "SELECT * FROM users";

    await pool.query(SQL, (error, data) => {
      error ? error : response.json(data.rows);
    });
  }

  async deleteAll(request, response) {
    let SQL = "TRUNCATE users";

    pool.query(SQL, (error, data) => {
      error ? error : response.json(data.rows);
    });
  }

  async selectById(request, response) {
    let { id } = request.params;

    let SQL = "SELECT * FROM users where id = $1 RETURNING *";

    await pool.query(SQL, [id], (error, data) => {
      error ? error : response.json(data.rows);
    });
  }

  async insert(request, response) {
    let { username, password } = request.body;

    let SQL =
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";

    await pool.query(SQL, [username, password], (error, data) => {
      error ? error : response.json(data.rows);
    });
  }

  async updateById(request, response) {
    let { id } = request.params;
    let { username, password } = request.body;

    let SQL =
      "UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *";

    await pool.query(SQL, [username, password, id], (error, data) => {
      error ? error : response.json(data.rows);
    });
  }

  async deleteById(request, response) {
    let { id } = request.params;

    let SQL = "DELETE FROM users WHERE id = $1 RETURNING *";

    await pool.query(SQL, [id], (error, data) => {
      error ? error : response.json(data.rows);
    });
  }
}
