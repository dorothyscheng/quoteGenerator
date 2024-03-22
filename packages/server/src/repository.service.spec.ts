import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { QuoteEntity } from './+entity/quote.entity';
import { RepositoryService } from './repository.service';

const testData = [
  { quote: 'Quote1', character: 'Character1' },
  { quote: 'Quote2', character: 'Character2' },
];

const selectSpy = jest.fn().mockReturnThis();
const whereSpy = jest.fn().mockReturnThis();
const orderBySpy = jest.fn().mockReturnThis();
const groupBySpy = jest.fn().mockReturnThis();
const getOneSpy = jest.fn().mockReturnValueOnce(testData[0]);
const getManySpy = jest
  .fn()
  .mockReturnValueOnce(testData.map(({ character }) => ({ character })));

const mockRepository = {
  createQueryBuilder: jest.fn(() => ({
    select: selectSpy,
    where: whereSpy,
    orderBy: orderBySpy,
    groupBy: groupBySpy,
    getOne: getOneSpy,
    getMany: getManySpy,
  })),
};

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // Provide the original service
        RepositoryService,
        // Mock the repository using the `getRepositoryToken` from @nestjs/typeorm
        {
          provide: getRepositoryToken(QuoteEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();
    // get the RepositoryService from the testing module.
    service = await module.get(RepositoryService);
  });

  // reset call counts and called with arguments after each spec
  afterEach(() => jest.clearAllMocks());

  describe('getRandomQuote', () => {
    it('should return a random quote', async () => {
      const actual = await service.getRandomQuote();

      expect(selectSpy).toHaveBeenCalled();
      expect(orderBySpy).toHaveBeenCalled();
      expect(getOneSpy).toReturnWith(testData[0]);
      expect(actual).toStrictEqual(testData[0]);
    });
  });

  describe('getCharacters', () => {
    it('should return an array of characters', async () => {
      const actual = await service.getCharacters();

      expect(selectSpy).toHaveBeenCalled();
      expect(groupBySpy).toHaveBeenCalledWith('character');
      expect(getManySpy).toReturnWith(
        testData.map(({ character }) => ({ character }))
      );
      expect(actual).toStrictEqual(['Character1', 'Character2']);
    });
  });
});
