import { ApiProperty } from '@nestjs/swagger';

export class Note {
  @ApiProperty({
    description: 'ID of the Note',
    example: 'LoJ1grR9CvTyv3gnJjSh',
  })
  id?: string;

  @ApiProperty({
    description: 'Title of the Note',
    example: 'My Note Title',
  })
  title: string;

  @ApiProperty({
    description: 'Content of the Note',
    example: 'This is my content, good that i noted it.',
  })
  content: string;

  @ApiProperty({
    description: 'UserId that the Note belongs to',
    example: 21,
  })
  userId: number;
}
