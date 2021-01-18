import Todo from "../models/todoModel.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const todoRoutes = express.Router();

todoRoutes.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const todos = await Todo.find({});
    res.send(todos);
  })
);

todoRoutes.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const todo = new Todo({
      task: req.body.task,
      done: true,
      creationTime: new Date(),
    });

    const createdTodo = await todo.save();
    res.send(createdTodo);
  })
);

todoRoutes.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findOne({ _id: id });
    todo.task = req.body.task;
    await todo.save();
    res.send(todo);
  } catch (e) {
    res.sendStatus(404);
  }
});

todoRoutes.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Todo.deleteOne({ _id: id });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  })
);
export default todoRoutes;
