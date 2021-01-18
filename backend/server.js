import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routers/todoRoutes.js";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5050;
const dbpath = "mongodb://localhost/mytodo";
mongoose
  .connect(dbpath, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("connection established"))
  .catch((e) => {
    console.log(e + "error message");
  });
app.use("/api/todo", todoRoutes);

app.get("/", async (req, res) => {
  res.send("server is ready!!!!");
});
app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
