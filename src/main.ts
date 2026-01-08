import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableCors({
    origin: "*",
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, "..", "static"), {
    prefix: "/api/static",
  });
  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
