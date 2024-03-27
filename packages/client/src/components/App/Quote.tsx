import { IQuote } from '@violet/types';

type Props = {
  quote: IQuote | undefined;
};
export const Quote = ({ quote }: Props) => {
  return (
    <div>
      <p>{quote?.quote}</p>
      <p>-{quote?.character}</p>
    </div>
  );
};
