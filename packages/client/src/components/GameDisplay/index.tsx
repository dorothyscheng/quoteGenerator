import { DisplayType } from '@violet/types';

type Props = {
  handleChangeDisplay: (displayType: DisplayType) => void;
};

export const GameDisplay = ({ handleChangeDisplay }: Props) => {
  return (
    <div>
      <p>game</p>
    </div>
  );
};
