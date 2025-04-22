import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { Note } from "../entities/Note.js";

class NoteRepository {
  private repository: Repository<Note>;

  constructor() {
    this.repository = AppDataSource.getRepository(Note);
  }

  async getAll() {
    return await this.repository.find();
  }

  async getByid(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ["task"],
    });
  }

  async getByIdTask(id: number) {
    return await this.repository.find({ where: { task: { id } } });
  }

  async create(noteData: Partial<Note>) {
    const note = this.repository.create(noteData);
    return await this.repository.save(note);
  }

  async update(newData: Partial<Note>, id: number) {
    return await this.repository.update(id, newData);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}

export default new NoteRepository();
