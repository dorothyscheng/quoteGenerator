import { DisplayType, IQuote } from '@violet/types';
import React, { useEffect, useState } from 'react';
import { httpService } from '~/utils/httpService';
import { CharacterForm } from '~/components/CharacterForm';
import { Quote } from '~/components/Quote';
import { AppButton } from '~/components/AppButton';

type Props = {
  handleChangeDisplay: (displayType: DisplayType) => void;
  characterOptions: string[];
};

export const GameDisplay = ({
  handleChangeDisplay,
  characterOptions,
}: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [quote, setQuote] = useState<IQuote | undefined>(undefined);
  const [hideCharacter, setHideCharacter] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<
    boolean | undefined
  >(undefined);

  const getQuote = async () => {
    const quote = await httpService.getQuote(new Set<string>());
    setQuote(quote);
  };

  useEffect(() => {
    getQuote();
  }, []);

  const handleSelectCharacter = (character: string) => {
    setSelectedCharacter(character);
  };

  const handleSubmitForm = () => {
    if (selectedCharacter === quote?.character) {
      setAnsweredCorrectly(true);
    } else {
      setAnsweredCorrectly(false);
    }
    setHideCharacter(false);
    setSubmitted(true);
  };

  const handleRefreshGame = () => {
    setHideCharacter(true);
    setSubmitted(false);
    setSelectedCharacter('');
    setAnsweredCorrectly(undefined);
    getQuote();
  };

  if (!quote) return <></>;

  return (
    <div className={'flex flex-col justify-between items-center min-h-[400px]'}>
      <div className={'flex flex-col mt-3 p-2 text-white'}>
        <p
          className={'text-sm hover:cursor-pointer underline mb-5'}
          onClick={() => handleChangeDisplay(DisplayType.Quote)}
        >
          Back to quotes
        </p>
        <p>Who said:</p>
        <div className={'flex flex-row justify-between p-2 mt-3 w-full'}>
          <div className={'w-2/3'}>
            <Quote quote={quote} hideCharacter={hideCharacter} />
          </div>
          <div className={'w-1/4'}>
            <CharacterForm
              characters={characterOptions}
              selectedCharacters={selectedCharacter}
              handleClickCharacter={handleSelectCharacter}
              handleSubmitForm={handleSubmitForm}
              buttonTitle={'Submit'}
              checkboxColor={'white'}
              disabled={submitted}
            />
          </div>
        </div>
      </div>
      {submitted && (
        <AppButton
          className={'bg-navy text-white'}
          title={`${
            answeredCorrectly ? 'You got it! ' : 'Whoops... '
          } Try again?`}
          onClick={handleRefreshGame}
        />
      )}
    </div>
  );
};
