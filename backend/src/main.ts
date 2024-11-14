import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';  // Import bodyParser to handle large requests

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with more restrictive configuration (frontend domain)
  const corsOptions : CorsOptions={
    origin: 'http://localhost:5173', // Allow only your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies)
  };
  app.enableCors(corsOptions);

  // Set body-parser to handle larger payload sizes if needed (optional)
  app.use(bodyParser.json({ limit: '10mb' })); // Set an appropriate limit if you expect large payloads
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  // Start the server on the desired port
  await app.listen(3001);
}
bootstrap();
