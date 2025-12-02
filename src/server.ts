import express from "express";
import userRoutes from "./modules/users/users.routes";
import todoRoutes from "./modules/todos/todo.routes";
import config from "./config";
import initDB from "./config/db";

const app = express();
app.use(express.json());

const PORT = config.port;

initDB();

//* Routes
app.use("/api", userRoutes);
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
