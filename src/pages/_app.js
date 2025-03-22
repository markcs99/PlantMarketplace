import { useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Head>
          <title>Plant Marketplace - Buy and sell plants online</title>
          <meta name="description" content="Buy and sell plants online. Find rare and exotic plants, indoor plants, outdoor plants, and more." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp; 