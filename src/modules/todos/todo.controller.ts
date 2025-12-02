import { Request, Response } from "express";
import {
  createTodoService,
  deleteTodoService,
  getTodoService,
  getTodosService,
  updateTodoService,
} from "./todo.service";

// create todo
export const CreateTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, completed, due_date } = req.body;

  try {
    const todos = await createTodoService(
      user_id,
      title,
      description,
      completed,
      due_date
    );

    res.status(201).json({ success: true, data: todos.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all todo
export const GetTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getTodosService();

    res.status(200).json({ success: true, data: todos.rows });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get single todo
export const GetTodo = async (req: Request, res: Response) => {
  try {
    const todo = await getTodoService(req.params.id!); //? req.params.id as string

    if (!todo.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// update todo
export const UpdateTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, completed, due_date } = req.body;

  try {
    const todo = await updateTodoService(
      req.params.id!,
      user_id,
      title,
      description,
      completed,
      due_date
    );

    if (!todo.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// delete todo
export const DeleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await deleteTodoService(req.params.id!);

    if (!todo.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
