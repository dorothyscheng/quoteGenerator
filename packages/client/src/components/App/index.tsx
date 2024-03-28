import { DigitalHubLayout } from '~/components/DigitalHubLayout';
import { QuoteDisplay } from '~/components/QuoteDisplay';
import { useEffect, useState } from 'react';
import { GameDisplay } from '~/components/GameDisplay';
import { DisplayType } from '@violet/types';
import { httpService } from '~/utils/httpService';

export const AppRoot = () => {
  const [display, setDisplay] = useState(DisplayType.Quote);
  const [characterOptions, setCharacterOptions] = useState<string[]>([]);

  const getCharacterOptions = async () => {
    const characters = await httpService.getCharacterOptions();
    setCharacterOptions(characters);
  };

  useEffect(() => {
    getCharacterOptions();
  }, []);

  return (
    <DigitalHubLayout>
      <div className={'min-h-[400px] min-w-full'}>
        {
          {
            0: (
              <GameDisplay
                handleChangeDisplay={setDisplay}
                characterOptions={characterOptions}
              />
            ),
            1: (
              <QuoteDisplay
                handleChangeDisplay={setDisplay}
                characterOptions={characterOptions}
              />
            ),
          }[display]
        }
      </div>
    </DigitalHubLayout>
  );
};
