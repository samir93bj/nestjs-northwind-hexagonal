import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, CategoryEntity, SupplierEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'northwind',
      password: 'northwind',
      database: 'northwind',
      entities: [ProductEntity, CategoryEntity, SupplierEntity],
      synchronize: false,
      logging: ['query'],
    }),
  ],
})
export class NorthwindDatabaseModule {}
