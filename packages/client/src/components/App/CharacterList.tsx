import { FormEvent } from 'react';

type Props = {
  characters: string[];
  selectedCharacters: Set<string>;
  handleToggleCharacter: (character: string) => void;
  getQuote: () => void;
};

export const CharacterList = ({
  characters,
  selectedCharacters,
  handleToggleCharacter,
  getQuote,
}: Props) => {
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    getQuote();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <fieldset>
        <legend>Choose your character</legend>
        {characters?.map((c) => (
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
