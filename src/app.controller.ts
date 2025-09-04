import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import * as fs from 'fs';
import * as path from 'path';
import { marked } from 'marked';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): string {
    return 'OK';
  }

  @Get()
  async getHome(@Res({ passthrough: true }) res: Response): Promise<Response> {
    let readmeHtml: string;

    try {
      const readmePath = path.join(process.cwd(), 'README.md');
      const readmeContent = fs.readFileSync(readmePath, 'utf8');

      readmeHtml = await marked.parse(readmeContent);
    } catch (error) {
      console.error('Erro ao ler ou converter o README.md:', error);
      readmeHtml =
        '<h1>Bem-vindo à API!</h1><p>A documentação está indisponível no momento.</p>';
    }

    res.set('Content-Type', 'text/html');
    res.send(readmeHtml);

    return res;
  }

  @Get(':zipCode')
  async findZipCode(
    @Param('zipCode') zipCode: string,
    @Query('source') source: string,
  ): Promise<any> {
    const cleanedZipCode = zipCode.replace(/\D/g, '');
    if (cleanedZipCode.length !== 8) {
      throw new BadRequestException('The zip code must contain 8 digits.');
    }
    return await this.appService.findAddressByCep(cleanedZipCode, source);
  }
}
