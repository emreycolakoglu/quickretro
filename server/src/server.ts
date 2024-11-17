import express from "express";
import cors from "cors";
import { apiRouter } from "./api";
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/", express.static(__dirname + "/client"));

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
