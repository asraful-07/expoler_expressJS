import express from "express";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  UpdateTodo,
} from "../controller/todo.controller";

const router = express.Router();
router.post("/todos", CreateTodo);
router.get("/todos", GetTodos);
router.get("/todo/:id", GetTodo);
router.put("/todo/:id", UpdateTodo);
router.delete("/todo/:id", DeleteTodo);
export default router;
