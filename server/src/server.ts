import cors from "cors";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/auth";

const app = express();
//  process.env.ORIGIN;
const origin = "http://localhost:3000";
app.use(
  cors({
    origin,
    credentials: true,
  })
);

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
