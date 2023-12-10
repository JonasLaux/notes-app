import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { http } from '@google-cloud/functions-framework';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(server) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

const server = express();
bootstrap(server);
http('Notes-App-Backend', server);
