import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from './core.constants';

@Module({
  imports:[
    MongooseModule.forRoot('mongodb://nest-microservice-mongodb-event-store:27017/vf-event-store',{
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true
    })
  ]
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            // We are going to hardcode the connection options for simplicity
            // but you can use a configuration file or environment variables
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'nest-microservice-postgress',
              port: 5432,
              password: 'pass123',
              username: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://nest-microservice-mongodb:27017/vf-read-db')
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
