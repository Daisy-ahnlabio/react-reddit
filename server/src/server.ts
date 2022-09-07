import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";
import postRoutes from "./routes/posts";
import voteRoutes from "./routes/votes";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/votes", voteRoutes);

// 브라우저에서 이미지 폴더 가능하게 설정
app.use(express.static("public"));

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
