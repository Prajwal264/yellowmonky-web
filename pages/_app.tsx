
import client from "../apollo/helpers/apollo-client";
import { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppLayout from '../components/app-layout/app-layout.component';
import { ApolloProvider } from '@apollo/client';
import '../styles/utils/fonts.scss';
import '../styles/utils/_global.scss';
import 'emoji-mart/css/emoji-mart.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import AppContextProvider from '../context/AppContextProvider';
import { RecoilRoot } from 'recoil';
import PopupHolder from '../components/popups/popupholder.component';

const appRoute = `/app`;

const MyApp = ({ Component, pageProps, router }: AppProps) => {

  let component = <Component {...pageProps} />;

  if (router.pathname.startsWith(appRoute)) {
    component =
      <RecoilRoot>
        <AppContextProvider>
          <AppLayout>
            {component}
          </AppLayout>
          <PopupHolder />
        </AppContextProvider>
      </RecoilRoot>
  }

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        {component}
        <Toaster
          position={typeof window !== 'undefined' && window.innerWidth < 640 ? "top-center" : "bottom-left"}
        />
      </ApolloProvider>
    </React.Fragment>
  );
};

export default MyApp;