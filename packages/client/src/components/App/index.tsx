import { DigitalHubLayout } from '~/components/DigitalHubLayout';
import { QuoteDisplay } from '~/components/QuoteDisplay';
import { useState } from 'react';
import { GameDisplay } from '~/components/GameDisplay';
import { DisplayType } from '@violet/types';

export const AppRoot = () => {
  const [display, setDisplay] = useState(DisplayType.Quote);

  return (
    <DigitalHubLayout>
      {
        {
          0: <GameDisplay />,
          1: <QuoteDisplay handleChangeDisplay={setDisplay} />,
        }[display]
      }
    </DigitalHubLayout>
  );
};
