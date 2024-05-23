import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';

/**
 * The root component for the application, wrapping all other components.
 * @param {AppProps} props - The properties for the app component.
 * @returns {JSX.Element} The rendered app component.
 */
function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
