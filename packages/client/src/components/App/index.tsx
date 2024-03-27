import { CharacterForm } from '~/components/App/CharacterForm';
import { useEffect, useState } from 'react';
import { IQuote } from '@violet/types';
import { httpService } from '~/utils/httpService';
import { DigitalHubLayout } from '~/components/App/DigitalHubLayout';
import { Quote } from '~/components/App/Quote';
import { AppButton } from '~/components/App/AppButton';

export const AppRoot = () => {
  const [quote, setQuote] = useState<IQuote | undefined>(undefined);
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set()
  );
  const [characterOptions, setCharacterOptions] = useState<string[]>([]);
  const getCharacterOptions = async () => {
    const characters = await httpService.getCharacterOptions();
    setCharacterOptions(characters);
    setSelectedCharacters(new Set(characters));
  };

  const getQuote = async () => {
    const quote = await httpService.getQuote(selectedCharacters);
    setQuote(quote);
  };

  const handleToggleCharacter = (character: string) => {
    const copiedSet = new Set(selectedCharacters);
    if (copiedSet.has(character)) {
      copiedSet.delete(character);
    } else {
      copiedSet.add(character);
    }

    setSelectedCharacters(copiedSet);
  };

  useEffect(() => {
    getQuote();
    getCharacterOptions();
  }, []);

  return (
    <div>
      <DigitalHubLayout>
        <div className={'flex flex-row justify-between p-2 mt-3 w-full'}>
          <div className={'w-1/3'}>
            <CharacterForm
              characters={characterOptions}
              selectedCharacters={selectedCharacters}
              handleToggleCharacter={handleToggleCharacter}
              getQuote={getQuote}
            />
          </div>
          <div className={'w-2/3'}>
            <Quote quote={quote} />
          </div>
        </div>
        <AppButton
          className={'bg-navy text-white'}
          title={'Ready to test your knowledge?'}
        />
      </DigitalHubLayout>
    </div>
  );
};
