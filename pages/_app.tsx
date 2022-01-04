
import { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppLayout from '../components/app-layout/app-layout.component';
import client from "../apollo/helpers/apollo-client";
import { ApolloProvider } from '@apollo/client';
import '../styles/utils/_global.scss';
import 'emoji-mart/css/emoji-mart.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

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
      <ApolloProvider client={client}>
        {component}
        <Toaster
          position="bottom-left"
        />
      </ApolloProvider>
    </React.Fragment>
  );
};

export default MyApp;