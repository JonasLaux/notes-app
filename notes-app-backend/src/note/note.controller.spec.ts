import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { HttpStatus } from '@nestjs/common';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entity/note.entity';

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
  });

  it('should create a note', async () => {
    const createNoteDto: CreateNoteDto = {
      title: 'Test Note',
      content: 'Content',
      userId: 1,
    };
    const result = { id: 'a1', ...createNoteDto };

    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await controller.create(createNoteDto)).toEqual({
      status: HttpStatus.CREATED,
      note: result,
    });
  });

  it('should find one note by id', async () => {
    const noteId = 'a1';
    const result = {
      id: noteId,
      title: 'Test Note',
      content: 'Content',
      userId: 1,
    };

    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    expect(await controller.findOne(noteId)).toEqual({
      status: HttpStatus.OK,
      note: result,
    });
  });

  it('should find all notes', async () => {
    const result = [
      { id: 'a1', title: 'Test Note', content: 'Content', userId: 1 },
    ];

    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll({})).toEqual({
      status: HttpStatus.OK,
      notes: result,
    });
  });

  it('should find all notes for a specific user', async () => {
    const userId = 1;
    const queryParams = { userId: userId.toString() };
    const result = [
      { id: 'a1', title: 'User Note', content: 'Content', userId },
    ];

    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll(queryParams)).toEqual({
      status: HttpStatus.OK,
      notes: result,
    });
  });

  it('should update a note', async () => {
    const noteId = 'a1';
    const updateNoteDto: UpdateNoteDto = {
      title: 'Updated Note',
      content: 'Updated Content',
    };
    const updatedResult: Note = {
      id: noteId,
      title: 'Updated Note',
      content: 'Updated Content',
      userId: 1,
    };

    jest.spyOn(service, 'update').mockImplementation(async () => updatedResult);

    expect(await controller.update(noteId, updateNoteDto)).toEqual({
      status: HttpStatus.OK,
      updatedNote: updatedResult,
    });
  });

  it('should remove a note', async () => {
    const noteId = 'a1';

    jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve());

    expect(await controller.remove(noteId)).toEqual({
      status: HttpStatus.NO_CONTENT,
    });
  });
});
