import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/handlers/globalErrorHandler";
import notFoundHandler from "./app/handlers/notFounderHandler";
import router from "./app/routes/index.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/api/v1", (_, res) => {
  res.send("Server Running");
});

// routes
app.use("/api/v1", router);

// handle global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(notFoundHandler);

export default app;
