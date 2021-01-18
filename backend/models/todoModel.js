import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    task: String,
    done: Boolean,
    creationTime: Date,
    // userId: mongoose.Schema.Types.ObjectId,
  });
  const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
