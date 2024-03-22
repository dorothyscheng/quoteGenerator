import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { APP_ROOT } from '~/config';
import { AppRoot } from '~/components/App';

import './index.scss';

const root = createRoot(document.getElementById(APP_ROOT)!);

function ReactApp(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <AppRoot />
    </Suspense>
  );
}

root.render(<ReactApp />);
