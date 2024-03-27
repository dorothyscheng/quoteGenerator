import { FormEvent } from 'react';
import { SingleCharacterCheckbox } from '~/components/App/SingleCharacterCheckbox';

type Props = {
  characters: string[];
  selectedCharacters: Set<string>;
  handleToggleCharacter: (character: string) => void;
  getQuote: () => void;
};

export const CharacterForm = ({
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
          <SingleCharacterCheckbox
            key={c}
            character={c}
            isChecked={selectedCharacters.has(c)}
            handleClick={handleToggleCharacter}
          />
        ))}
      </fieldset>
      <button type={'submit'}>Show me a quote</button>
    </form>
  );
};
