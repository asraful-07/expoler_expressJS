import { Request, Response } from "express";
import { pool } from "../server";

//TODO create todo
export const CreateTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, completed, due_date } = req.body;
  try {
    const todos = await pool.query(
      `
        INSERT INTO todos (user_id, title, description, completed, due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [user_id, title, description, completed, due_date]
    );

    res.status(201).json({ success: true, data: todos.rows[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//TODO get all todo
export const GetTodos = async (req: Request, res: Response) => {
  try {
    const todos = await pool.query(`SELECT * FROM todos`);

    res.status(200).json({ success: true, data: todos.rows });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//TODO get single todo
export const GetTodo = async (req: Request, res: Response) => {
  try {
    const todo = await pool.query(
      `
      SELECT * FROM todos WHERE id=$1`,
      [req.params.id]
    );

    if (!todo.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo.rows[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//TODO update todo
export const UpdateTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, completed, due_date } = req.body;

  try {
    const todo = await pool.query(
      `
      UPDATE todos SET user_id=$1, title=$2, description=$3, completed=$4, due_date=$5 WHERE id=$6 RETURNING *`,
      [user_id, title, description, completed, due_date, req.params.id]
    );

    if (!todo.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo.rows[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//TODO delete todo
export const DeleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await pool.query(
      `
      DELETE FROM todos WHERE id=$1 RETURNING *`,
      [req.params.id]
    );

    if (!todo.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
