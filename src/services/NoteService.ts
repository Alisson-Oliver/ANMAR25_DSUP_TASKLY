import { Note } from "../entities/Note.js";
import NoteRepository from "../repositories/NoteRepository.js";
import TaskRepository from "../repositories/TaskRepository.js";

class NoteService {
  async findAll() {
    return await NoteRepository.getAll();
  }

  async findByIdTask(taskId: number) {
    const existingTask = await TaskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error("note not found");
    }
    return await NoteRepository.getByIdTask(taskId);
  }

  async findById(id: number) {
    const note = await NoteRepository.getByid(id);
    if (!note) {
      throw new Error("note not found");
    }
    return note;
  }

  async create(data: Note) {
    const taskId = data.task.id;
    const existingTask = await TaskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error("task not found");
    }

    data.task = existingTask;

    return await NoteRepository.create(data);
  }
}

export default new NoteService();
