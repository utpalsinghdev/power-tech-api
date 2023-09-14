import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import { ValidationPipe } from '@nestjs/common/pipes'
import * as morgan from 'morgan'
import * as express from 'express'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  app.enableCors()
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })) //TODO: Fixing Pipe Issue
  const config = new DocumentBuilder()
    .setTitle('Plan Grid APIs')
    .setDescription('Plan Grid APIs')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  app.use(morgan('dev'))
  SwaggerModule.setup('/api-docs', app, document)
  await app.listen(8084)
}
bootstrap()
