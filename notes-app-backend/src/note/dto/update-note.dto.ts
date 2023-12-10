import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Title of the Note',
    example: 'My Note Title',
  })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Content of the Note',
    example: 'This is my content, good that i noted it.',
  })
  readonly content?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'UserId that the Note belongs to',
    example: 21,
  })
  readonly userId?: number;
}
