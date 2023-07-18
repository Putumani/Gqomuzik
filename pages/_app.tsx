import React, { ReactElement, ComponentType } from 'react';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

type MyAppProps = AppProps & {
  Component: ComponentType<any>;
};

export default function App({ Component, pageProps }: MyAppProps): ReactElement {
  return (
    <Layout toggleUploader={() => {}}>
      <Component {...pageProps} />
    </Layout>
  );
}



