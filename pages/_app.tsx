
import { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppLayout from '../components/app-layout/app-layout.component';
import '../styles/utils/_global.scss';

const appRoute = `/app/`;


const MyApp = ({ Component, pageProps, router }: AppProps) => {

  let component = <Component {...pageProps} />;

  if (router.pathname.startsWith(appRoute)) {
    component = <AppLayout>
      {component}
    </AppLayout>
  }

  return (
    <React.Fragment>
      {component}
      <Toaster
        position="bottom-left"
      />
    </React.Fragment>
  );
};

export default MyApp;