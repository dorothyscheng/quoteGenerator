import { CharacterList } from '~/components/App/CharacterList';
import { useEffect, useState } from 'react';
import { getApiUrl, Logger } from '~/utils';
import { IQuote } from '@violet/types';

export const AppRoot = () => {
  const [quoteResponse, setQuoteResponse] = useState<IQuote | undefined>(
    undefined
  );
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set()
  );

  const getQuote = async () => {
    const selectedCharacterString = Array.from(selectedCharacters)
      .map((c) => c.toLowerCase())
      .join(',');
    const apiUrl = `${getApiUrl()}/quote?characters=${selectedCharacterString}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        Logger.error(`Unable to fetch from ${apiUrl}`);
      }
      const quote: IQuote = await response.json();
      setQuoteResponse(quote);
    } catch (e) {
      Logger.error(e);
    }
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
  }, []);

  return (
    <>
      <div>
        <button onClick={getQuote}>Random Quote</button>

        <div>
          <p>{quoteResponse?.quote}</p>
          <p>-{quoteResponse?.character}</p>
        </div>

        <div>
          <CharacterList
            selectedCharacters={selectedCharacters}
            handleToggleCharacter={handleToggleCharacter}
            getQuote={getQuote}
          />
        </div>
      </div>
    </>
  );
};
