import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { Note } from "../entities/Note.js";

class NoteRepository {
  private repository: Repository<Note>;

  constructor() {
    this.repository = AppDataSource.getRepository(Note);
  }

  async create(noteData: Partial<Note>) {
    const note = this.repository.create(noteData);
    return await this.repository.save(note);
  }
}

export default new NoteRepository();
