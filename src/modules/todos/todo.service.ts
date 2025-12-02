import { pool } from "../../config/db";

// create todo
export const createTodoService = async (
  user_id: string,
  title: string,
  description: string,
  completed: boolean,
  due_date: string
) => {
  const todos = await pool.query(
    `
    INSERT INTO todos (user_id, title, description, completed, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [user_id, title, description, completed, due_date]
  );

  return todos;
};

// get all todos
export const getTodosService = async () => {
  const todos = await pool.query(`SELECT * FROM todos`);
  return todos;
};

// get single todo
export const getTodoService = async (id: string) => {
  const todo = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
  return todo;
};

// update todo
export const updateTodoService = async (
  id: string,
  user_id: string,
  title: string,
  description: string,
  completed: boolean,
  due_date: string
) => {
  const todo = await pool.query(
    `
    UPDATE todos
    SET user_id=$1, title=$2, description=$3, completed=$4, due_date=$5
    WHERE id=$6
    RETURNING *
    `,
    [user_id, title, description, completed, due_date, id]
  );

  return todo;
};

// delete todo
export const deleteTodoService = async (id: string) => {
  const todo = await pool.query(
    `
    DELETE FROM todos
    WHERE id=$1
    RETURNING *
    `,
    [id]
  );

  return todo;
};
