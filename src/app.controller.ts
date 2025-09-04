import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `CEP Join é uma API RESTful gratuita que fornece informações de endereço completas a partir de um CEP. 
    Ela se conecta a múltiplos serviços de CEP, garantindo que você sempre receba os dados mais precisos e 
    atualizados, mesmo que um dos serviços esteja temporariamente indisponível.`;
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
