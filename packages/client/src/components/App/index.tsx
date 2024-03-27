import { CharacterForm } from '~/components/App/CharacterForm';
import { useEffect, useState } from 'react';
import { IQuote } from '@violet/types';
import { httpService } from '~/utils/httpService';
import { DigitalHubLayout } from '~/components/App/DigitalHubLayout';

export const AppRoot = () => {
  const [quoteResponse, setQuoteResponse] = useState<IQuote | undefined>(
    undefined
  );
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
    setQuoteResponse(quote);
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
    <DigitalHubLayout>
      <div>
        <p>{quoteResponse?.quote}</p>
        <p>-{quoteResponse?.character}</p>
      </div>
      <CharacterForm
        characters={characterOptions}
        selectedCharacters={selectedCharacters}
        handleToggleCharacter={handleToggleCharacter}
        getQuote={getQuote}
      />
    </DigitalHubLayout>
  );
};
