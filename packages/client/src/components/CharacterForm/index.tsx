import React, { FormEvent } from 'react';
import { SingleCharacterCheckbox } from '~/components/SIngleCharacterCheckbox';
import { AppButton } from '~/components/AppButton';

type Props = {
  characters: string[];
  selectedCharacters: Set<string>;
  handleClickCharacter: (character: string) => void;
  handleSubmitForm: () => void;
};

export const CharacterForm = ({
  characters,
  selectedCharacters,
  handleClickCharacter,
  handleSubmitForm,
}: Props) => {
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitForm();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <fieldset>
        {characters?.map((c) => (
          <SingleCharacterCheckbox
            key={c}
            character={c}
            isChecked={selectedCharacters.has(c)}
            handleClick={handleClickCharacter}
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
