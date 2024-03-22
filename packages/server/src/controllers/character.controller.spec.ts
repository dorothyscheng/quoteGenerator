import { Test, TestingModule } from '@nestjs/testing';

import { RepositoryService } from '../repository.service';
import { CharactersController } from './character.controller';

describe('CharacterController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: RepositoryService,
          useValue: {
            getCharacters: async () => {
              return ['Test1', 'Test2'];
            },
          },
        },
      ],
    }).compile();

    controller = app.get<CharactersController>(CharactersController);
  });

  it('should return an array of characters', async () => {
    expect(await controller.getCharacters()).toStrictEqual(['Test1', 'Test2']);
  });
});
