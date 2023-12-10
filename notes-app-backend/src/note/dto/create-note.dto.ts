import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Title of the Note',
    example: 'My Note Title',
  })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Content of the Note',
    example: 'This is my content, good that i noted it.',
  })
  readonly content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'UserId that the Note belongs to',
    example: 21,
  })
  readonly userId: number;
}
