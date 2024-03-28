import React, { useEffect, useState } from 'react';
import { DisplayType, IQuote } from '@violet/types';
import { httpService } from '~/utils/httpService';
import { Quote } from '~/components/Quote';
import { AppButton } from '~/components/AppButton';
import { CharacterForm } from '~/components/CharacterForm';

type Props = {
  handleChangeDisplay: (displayType: DisplayType) => void;
  characterOptions: string[];
};

export const QuoteDisplay = ({
  handleChangeDisplay,
  characterOptions,
}: Props) => {
  const [quote, setQuote] = useState<IQuote | undefined>(undefined);
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set()
  );

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
    setSelectedCharacters(new Set(characterOptions));
  }, [characterOptions]);

  return (
    <div className={'flex flex-col justify-between items-center min-h-[400px]'}>
      <div className={'flex flex-row justify-between p-2 mt-3 w-full'}>
        <div className={'w-1/3'}>
          <CharacterForm
            characters={characterOptions}
            selectedCharacters={selectedCharacters}
            handleClickCharacter={handleToggleCharacter}
            handleSubmitForm={getQuote}
            buttonTitle={'Get Quote'}
          />
        </div>
        <div className={'w-2/3'}>
          <Quote quote={quote} />
        </div>
      </div>
      <AppButton
        className={'bg-navy text-white'}
        title={'Ready to test your knowledge?'}
        onClick={() => handleChangeDisplay(DisplayType.Game)}
      />
    </div>
  );
};
