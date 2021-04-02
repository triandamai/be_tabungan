import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

declare const module: any;
import * as express from 'express';
import { Express } from 'express';
import cors from 'cors';
import * as functions from 'firebase-functions';

const whitelist = ['https://tabungan.trian.app', 'https://tabungan.trian.app'];
const server: Express = express();

async function bootstrap(expressInstance: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.useGlobalPipes(new ValidationPipe());
  return await app.listen(5000);
  // return await app.init();
}
server.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
bootstrap(server)
  .then((v) => console.log('nest ready'))
  .catch((e) => console.log('nest broke', e));

exports.api = functions.https.onRequest(server);
