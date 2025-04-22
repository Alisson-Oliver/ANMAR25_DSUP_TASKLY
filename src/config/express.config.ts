import express from "express";
import cors from "cors";

import taskRoutes from "../routes/task.routes.js";
import noteRoutes from "../routes/note.routes.js";
import errorHandler from "../middlewares/error-handler.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", taskRoutes, noteRoutes);

app.use(errorHandler);

export default app;
