import { HttpException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';

import { EventBusModule } from '@/libs/event-bus';
import { LoggerModule } from '@/libs/logger';
import { UserModule } from '@/modules/user/infra/framework/user.module';

import { SentryConfig } from '../config/sentry.config';
import { ServerConfig } from '../config/server.config';
import { PrismaModule } from '../drivers/prisma/prisma.module';

@Module({
  imports: [
    EventBusModule.forRoot(),
    LoggerModule.forRoot({
      serviceName: 'server',
    }),
    SentryModule.forRoot({
      dsn: SentryConfig.dsn,
      environment: ServerConfig.nodeEnv,
      logLevels: ['debug'],
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              type: HttpException,
              filter: (exception: HttpException) => exception.getStatus() > 500,
            },
          ],
        }),
    },
  ],
})
export class AppModule {}
