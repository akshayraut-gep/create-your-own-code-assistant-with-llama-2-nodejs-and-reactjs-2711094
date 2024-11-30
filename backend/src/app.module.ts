import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OllamaService } from './ollama/ollama.service';
import CustomConfigLoader from './custom-config/custom-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      //@ts-expect-error ignore
      load: [CustomConfigLoader],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OllamaService],
})
export class AppModule {}
