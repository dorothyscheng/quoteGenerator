// vendors
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

import { AppModule } from '~/app.module';
import { QuoteEntity } from '~/+entity/quote.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [QuoteEntity],
          logging: false,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get a random quote: /quote (GET)', () => {
    return request(app.getHttpServer())
      .get('/quote')
      .expect(200)
      .expect(({ body }) => {
        return body.hasOwnProperty('quote') && body.hasOwnProperty('character');
      });
  });

  it('should get a random quote for "dWiGHt": /quote (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/quote?characters=dWiGHt')
      .expect(200);

    expect(response.body.quote).toBeDefined();
    expect(response.body.character).toBeDefined();
    expect(response.body.character).toBe('Dwight');
  });

  it('should get an alphabetically sorted list of characters: /characters (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toStrictEqual(['Dwight', 'Jim', 'Michael', 'Pam']);
  });
});
