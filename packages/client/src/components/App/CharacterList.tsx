import { getApiUrl, Logger } from '~/utils';
import { FormEvent, useEffect, useState } from 'react';

type Props = {
  selectedCharacters: Set<string>;
  handleToggleCharacter: (character: string) => void;
  getQuote: () => void;
};

export const CharacterList = ({
  selectedCharacters,
  handleToggleCharacter,
  getQuote,
}: Props) => {
  const [characterList, setCharacterList] = useState<string[] | undefined>();
  const getCharacters = async () => {
    const apiUrl = getApiUrl();
    try {
      const response = await fetch(`${apiUrl}/characters`);
      const characters = await response.json();
      setCharacterList(characters);
    } catch (e) {
      Logger.error(e);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    getQuote();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <fieldset>
        <legend>Choose your character</legend>
        {characterList?.map((c) => (
          <div key={c}>
            <input
              type={'checkbox'}
              value={c}
              id={c}
              name={'character'}
              checked={selectedCharacters.has(c)}
              onChange={() => handleToggleCharacter(c)}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </fieldset>
      <button type={'submit'}>Show me a quote</button>
    </form>
  );
};
