import React, { FormEvent } from 'react';
import { SingleCharacterCheckbox } from '~/components/SIngleCharacterCheckbox';
import { AppButton } from '~/components/AppButton';

type Props = {
  characters: string[];
  selectedCharacters: Set<string> | string;
  handleClickCharacter: (character: string) => void;
  handleSubmitForm: () => void;
  buttonTitle: string;
  checkboxColor?: string;
  disabled?: boolean;
};

export const CharacterForm = ({
  characters,
  selectedCharacters,
  handleClickCharacter,
  handleSubmitForm,
  buttonTitle,
  checkboxColor,
  disabled,
}: Props) => {
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitForm();
  };

  const getIsChecked = (character: string) => {
    if (typeof selectedCharacters === 'string') {
      return selectedCharacters === character;
    }
    return selectedCharacters.has(character);
  };

  const getIsDisabled = () => {
    if (typeof selectedCharacters === 'string') {
      return selectedCharacters.length === 0;
    }
    return selectedCharacters.size === 0;
  };

  return (
    <form onSubmit={onSubmitForm}>
      <fieldset>
        {characters?.map((c) => (
          <SingleCharacterCheckbox
            key={c}
            character={c}
            isChecked={getIsChecked(c)}
            handleClick={handleClickCharacter}
            checkboxColor={checkboxColor}
          />
        ))}
      </fieldset>
      <AppButton
        type={'submit'}
        className={'bg-sky-blue'}
        disabled={disabled ? disabled : getIsDisabled()}
        title={buttonTitle}
      />
    </form>
  );
};
