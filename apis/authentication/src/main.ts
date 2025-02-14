import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from "@nestjs/common";
import { AppModule } from "./app.module";
import { ResponseTransformInterceptor } from "./interceptors/response.interceptor";
import { CatchAllExceptionFilter } from "./interceptors/exception.filter";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  // Enable global request validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new CatchAllExceptionFilter(app.get(HttpAdapterHost)));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
