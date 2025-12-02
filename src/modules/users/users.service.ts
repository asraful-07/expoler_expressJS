import { pool } from "../../config/db";

// Create user
export const createUserService = async (
  name: string,
  email: string,
  address: string
) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, address)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, email, address]
  );

  return result.rows[0];
};

// Get all users
export const getUsersService = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};

// Get single user
export const getUserService = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

// Update user
export const updateUserService = async (
  id: number,
  name: string,
  email: string,
  address: string
) => {
  const result = await pool.query(
    `UPDATE users
     SET name=$1, email=$2, address=$3, updated_at=NOW()
     WHERE id=$4 RETURNING *`,
    [name, email, address, id]
  );

  return result.rows[0];
};

// Delete user
export const deleteUserService = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);

  return result.rows[0];
};
