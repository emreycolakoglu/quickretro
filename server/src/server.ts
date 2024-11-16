import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
