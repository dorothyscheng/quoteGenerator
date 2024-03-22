import { Test, TestingModule } from '@nestjs/testing';

import { RepositoryService } from '../repository.service';
import { QuoteController } from './quote.controller';

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: RepositoryService;

  const quotes = [
    { quote: 'Quote 1', character: 'Character1' },
    { quote: 'Quote 2', character: 'Character2' },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: RepositoryService,
          useValue: {
            getRandomQuote: async (characters) => {
              return characters
                ? quotes.filter(
                    (q) => characters.indexOf(q.character) !== -1
                  )[0]
                : quotes[0];
            },
          },
        },
      ],
    }).compile();

    controller = app.get<QuoteController>(QuoteController);
    service = app.get<RepositoryService>(RepositoryService);
  });

  it('should return a single quote by Character2', async () => {
    jest.spyOn(service, 'getRandomQuote');

    const actual = await controller.getQuote({ characters: 'Character2' });

    expect(actual).toBe(quotes[1]);
    expect(service.getRandomQuote).toBeCalledWith(['Character2']);
  });

  it('should return a single quote by Character1', async () => {
    jest.spyOn(service, 'getRandomQuote');

    const actual = await controller.getQuote({
      characters: 'Character1,Character2',
    });

    expect(actual).toBe(quotes[0]);
    expect(service.getRandomQuote).toBeCalledWith(['Character1', 'Character2']);
  });

  it('should return a single random quote', async () => {
    jest.spyOn(service, 'getRandomQuote');

    const actual = await controller.getQuote();

    expect(actual).toBe(quotes[0]);
    expect(service.getRandomQuote).toBeCalledWith(null);
  });
});
