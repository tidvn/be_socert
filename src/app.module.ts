import { Module } from '@nestjs/common';
import { LoggerModule, Params } from 'nestjs-pino';
import { loggerOptions } from 'src/config/config.logger';
import { AppController } from './app.controller';
import { NODE_ENV } from './app.environment';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dbOrmModuleAsync } from './config/config.typeorm';
import { OrganizationModule } from './organization/organization.module';
import { ImageModule } from './image/image.module';
import { CertificateModule } from './certificate/certificate.module';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    dbOrmModuleAsync,
    LoggerModule.forRoot(loggerOptions[NODE_ENV] as Params),
    AuthModule,
    ImageModule,
    OrganizationModule,
    CertificateModule,
    MetadataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
