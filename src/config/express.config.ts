import express from "express";
import cors from "cors";

import taskRoutes from "../routes/task.routes";
import noteRoutes from "../routes/note.routes";
import errorHandler from "../middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", taskRoutes, noteRoutes);

app.use(errorHandler);

export default app;
