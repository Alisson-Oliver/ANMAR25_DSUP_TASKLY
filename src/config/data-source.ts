import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Note } from "../entities/Note";
import { Task } from "../entities/Task";

const PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Task, Note],
  synchronize: true,
});
