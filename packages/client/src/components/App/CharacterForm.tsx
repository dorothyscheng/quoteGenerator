import React, { FormEvent } from 'react';
import { SingleCharacterCheckbox } from '~/components/App/SingleCharacterCheckbox';
import { AppButton } from '~/components/App/AppButton';

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
        {characters?.map((c) => (
          <SingleCharacterCheckbox
            key={c}
            character={c}
            isChecked={selectedCharacters.has(c)}
            handleClick={handleToggleCharacter}
          />
        ))}
      </fieldset>
      <AppButton
        type={'submit'}
        className={'bg-sky-blue'}
        disabled={selectedCharacters.size === 0}
        title={'Get Quote'}
      />
    </form>
  );
};
