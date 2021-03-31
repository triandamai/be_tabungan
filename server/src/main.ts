import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

declare const module: any;
import * as express from 'express';
import { Express } from 'express';
import * as functions from 'firebase-functions';
const server: Express = express();

async function bootstrap(expressInstance: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return await app.init();
}

bootstrap(server)
  .then((v) => console.log('nest ready'))
  .catch((e) => console.log('nest broke', e));

exports.api = functions.https.onRequest(server);
