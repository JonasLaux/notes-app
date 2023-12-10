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
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    const note = await this.noteService.create(createNoteDto);
    return { status: HttpStatus.CREATED, note };
  }

  @Get()
  async findAll(@Query() queryParams) {
    const notes = await this.noteService.findAll(queryParams);
    return { status: HttpStatus.OK, notes };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const note = await this.noteService.findOne(id);
    return { status: HttpStatus.OK, note };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.noteService.update(id, updateNoteDto);
    return { status: HttpStatus.OK, updatedNote };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.noteService.remove(id);
    return { status: HttpStatus.NO_CONTENT };
  }
}
