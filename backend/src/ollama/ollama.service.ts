/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OllamaEmbeddings , ChatOllama } from '@langchain/ollama';

@Injectable()
export class OllamaService {
  embeddings: OllamaEmbeddings;
  chat: ChatOllama;

  constructor(private configService: ConfigService) {
    this.embeddings = new OllamaEmbeddings({
      model: this.configService.get<string>('model'), //default : llama2
      baseUrl: this.configService.get<string>('url'), //default: http://localhost:11434
      requestOptions: this.configService.get<Record<string, string>>('requestOptions'),
    });

    this.chat = new ChatOllama({
      model: this.configService.get<string>('model'), //default : llama2
      baseUrl: this.configService.get<string>('url'), //default: http://localhost:11434
      format: this.configService.get<string>('format'), //default: json
      temperature: this.configService.get<number>('chatTemperature', 0.5), //default value 0.5
      topP: this.configService.get<number>('topP', 1), //default value 1
      topK: this.configService.get<number>('topK', 40) //default value 40
    });
  }

  getEmbeddings(): OllamaEmbeddings {
    return this.embeddings;
  }

  getChat(): ChatOllama {
    return this.chat;
  }

  async sendPrompt(prompt: string) {
    return this.chat.invoke(prompt);
  }
}
