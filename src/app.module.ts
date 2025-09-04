import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'assets'),
      serveRoot: '/static',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
