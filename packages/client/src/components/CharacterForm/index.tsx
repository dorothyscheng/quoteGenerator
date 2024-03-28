import React, { FormEvent } from 'react';
import { SingleCharacterCheckbox } from '~/components/SIngleCharacterCheckbox';
import { AppButton } from '~/components/AppButton';

type Props = {
  characters: string[];
  selectedCharacters: Set<string> | string;
  handleClickCharacter: (character: string, isOnly: boolean) => void;
  handleSubmitForm: () => void;
  buttonTitle: string;
  checkboxColor?: string;
  disabled?: boolean;
  hideOnly?: boolean;
};

export const CharacterForm = ({
  characters,
  selectedCharacters,
  handleClickCharacter,
  handleSubmitForm,
  buttonTitle,
  checkboxColor,
  disabled,
  hideOnly,
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
          <div key={c} className={'flex flex-row items-center'}>
            <SingleCharacterCheckbox
              character={c}
              isChecked={getIsChecked(c)}
              handleClick={(c) => handleClickCharacter(c, false)}
              checkboxColor={checkboxColor}
            />
            {!hideOnly && (
              <p
                className={'text-sm underline hover:cursor-pointer'}
                onClick={() => handleClickCharacter(c, true)}
              >
                only
              </p>
            )}
          </div>
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
