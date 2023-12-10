import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NoteModule } from './note/note.module';
import { FireStoreModule } from './shared/firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        GOOGLE_PROJECT_ID: Joi.string().required(),
      }),
    }),
    NoteModule,
    FireStoreModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
