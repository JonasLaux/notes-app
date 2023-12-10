import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FireStoreService } from '../shared/firestore/firestore.service';
import { Note } from './entity/note.entity';
import { Firestore, Query } from '@google-cloud/firestore';

@Injectable()
export class NoteService {
  private readonly db: Firestore;
  constructor(private fireStoreService: FireStoreService) {
    this.db = this.fireStoreService.getDb();
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const docRef = await this.db.collection('notes').add(createNoteDto);
    return { id: docRef.id, ...createNoteDto };
  }

  async findAll(queryParams: any): Promise<Note[]> {
    let query: Query = this.db.collection('notes');

    Object.keys(queryParams).forEach((key) => {
      let value = queryParams[key];

      // parse to Int
      if (key === 'userId') {
        value = JSON.parse(value);
      }
      query = query.where(key, '==', value);
    });

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Note),
    }));
  }

  async findOne(id: string): Promise<Note> {
    const doc = await this.db.collection('notes').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    return { id: doc.id, ...(doc.data() as Note) };
  }

  async update(id: string, updateNote: UpdateNoteDto): Promise<Note> {
    const docRef = this.db.collection('notes').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    await this.db
      .collection('notes')
      .doc(id)
      .update({ ...updateNote });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const docRef = this.db.collection('notes').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    await docRef.delete();
  }
}
