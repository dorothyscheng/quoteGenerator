import React from 'react';

type Props = {
  title: string;
};
export const AppButton = ({
  title,
  className,
  ...props
}: Props &
  Partial<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >) => {
  return (
    <button
      className={`p-2 rounded-md mt-2 disabled:bg-gray-400 disabled:text-gray-700 ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};
