// pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import { SocketProvider } from '../context/SocketContext';
import '../styles/index.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
};

export default MyApp;