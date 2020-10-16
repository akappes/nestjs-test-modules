import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {useContainer} from 'class-validator';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), {fallbackOnErrors: true});

    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('Licit')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    /**
     * Validation pipe transform json body
     * to dto class & checks validity
     */
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    await app.listen(3000);
}

bootstrap();
