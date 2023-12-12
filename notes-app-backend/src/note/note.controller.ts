import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entity/note.entity';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: 201,
    description: 'The note has been successfully created.',
    type: Note,
  })
  @ApiBody({ type: CreateNoteDto })
  async create(@Body() createNoteDto: CreateNoteDto) {
    const note = await this.noteService.create(createNoteDto);
    return { status: HttpStatus.CREATED, note };
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({ status: 200, description: 'Array of notes.', type: [Note] })
  @ApiQuery({ name: 'queryParams', required: false, type: 'object' })
  async findAll(@Query() queryParams) {
    const notes = await this.noteService.findAll(queryParams);
    return { status: HttpStatus.OK, notes };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiResponse({ status: 200, description: 'The found note.', type: Note })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'The ID of the note to find.',
  })
  async findOne(@Param('id') id: string) {
    const note = await this.noteService.findOne(id);
    return { status: HttpStatus.OK, note };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({ status: 200, description: 'The updated note.', type: Note })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'The ID of the note to update.',
  })
  @ApiBody({ type: UpdateNoteDto })
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.noteService.update(id, updateNoteDto);
    return { status: HttpStatus.OK, updatedNote };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({
    status: 204,
    description: 'The note has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'The ID of the note to delete.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.noteService.remove(id);
    return { status: HttpStatus.NO_CONTENT };
  }
}
