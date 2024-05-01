import { AppProvider } from '@lib/context';
import AppLayout from '@modules/base/layout/AppLayout';
import '@styles/main.scss';
import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
const lato = Lato({
  weight: ['400', '100', '300', '900', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
});

function App({ Component, router, pageProps }: AppProps) {
  return (
    <AppProvider nextFont={lato}>
      <AppLayout router={router}>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
