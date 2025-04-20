import "reflect-metadata";
import app from "./config/express.config.js";
import { AppDataSource } from "./config/data-source.js";

const PORT = process.env.SV_PORT;

AppDataSource.initialize().then(() => {
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
