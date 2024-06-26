type Props = {
  character: string;
  isChecked: boolean;
  handleClick: (character: string) => void;
  checkboxColor?: string;
};
export const SingleCharacterCheckbox = ({
  character,
  isChecked,
  handleClick,
  checkboxColor,
}: Props) => {
  const checkboxColorToUse = checkboxColor ?? 'black';
  return (
    <div
      className={'flex items-center hover:cursor-pointer m-2'}
      onClick={(e) => {
        e.preventDefault();
        handleClick(character);
      }}
    >
      <input
        type={'checkbox'}
        value={character}
        id={character}
        name={'character'}
        checked={isChecked}
        onChange={() => {}}
        className={'hidden'}
      />
      <div
        className={`rounded-full h-5 w-5 border-2 flex items-center justify-center m-1`}
        style={{ borderColor: checkboxColorToUse }}
      >
        {isChecked && (
          <div
            className={`rounded-full h-1/2 w-1/2`}
            style={{ backgroundColor: checkboxColorToUse }}
          />
        )}
      </div>
      <label htmlFor={character} className={'hover:cursor-pointer'}>
        - {character}
      </label>
    </div>
  );
};
