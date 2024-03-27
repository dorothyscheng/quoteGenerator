import { PropsWithChildren } from 'react';
import logo from '~/assets/dunder-mifflin-logo.png';

export const DigitalHubLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        'justify-center items-center flex min-h-screen min-w-screen text-2xl'
      }
    >
      <div className={'bg-blue flex-col items-center flex w-1/2 p-10'}>
        <img src={logo} alt={'Dunder Mifflin Logo'} />
        {children}
      </div>
    </div>
  );
};
