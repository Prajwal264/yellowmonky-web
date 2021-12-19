
import React from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/utils/_global.scss'
export default ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Toaster
        position="bottom-left"
      />
    </React.Fragment>
  );
};