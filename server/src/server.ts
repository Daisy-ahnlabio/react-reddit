import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
// const origin = process.env.ORIGIN;
const origin = "http://localhost:3000";
app.use(
  cors({
    origin,
    credentials: true,
  })
);
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);

let port = 4000;
app.listen(port, async () => {
  // ${process.env.APP_URL}
  console.log(`server running at http://localhost:${port} `);

  AppDataSource.initialize()
    .then(() => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
