import { IQuote } from '@violet/types';

type Props = {
  quote: IQuote | undefined;
  hideCharacter?: boolean;
};
export const Quote = ({ quote, hideCharacter }: Props) => {
  return (
    <div className={'flex flex-col'}>
      <p>{quote?.quote}</p>
      {!hideCharacter && <p className={'self-end'}>-{quote?.character}</p>}
    </div>
  );
};
