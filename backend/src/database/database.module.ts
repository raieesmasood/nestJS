import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("POSTGRES_HOST"),
        port: configService.getOrThrow("POSTGRES_PORT") || 5432,
        username: configService.getOrThrow("POSTGRES_USER"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        database: configService.getOrThrow("POSTGRES_DB"),
        synchronize: true,
        autoLoadEntities: true
      })
    })
  ]
})
export class DatabaseModule {}


