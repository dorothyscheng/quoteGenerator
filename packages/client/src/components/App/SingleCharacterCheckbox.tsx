type Props = {
  character: string;
  isChecked: boolean;
  handleClick: (character: string) => void;
};
export const SingleCharacterCheckbox = ({
  character,
  isChecked,
  handleClick,
}: Props) => {
  return (
    <div className={'flex items-center'}>
      <input
        type={'checkbox'}
        value={character}
        id={character}
        name={'character'}
        checked={isChecked}
        onChange={() => handleClick(character)}
        className={'hidden'}
      />
      <div
        className={
          'rounded-full h-5 w-5 border-2 border-black flex items-center justify-center m-1'
        }
        onClick={() => handleClick(character)}
      >
        {isChecked && <div className={'rounded-full bg-black h-1/2 w-1/2'} />}
      </div>
      <label htmlFor={character}>- {character}</label>
    </div>
  );
};
