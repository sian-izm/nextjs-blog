import '../styles/global.css'
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client'
import { AppProps } from 'next/dist/shared/lib/router/router';

export default function App({ Component, pageProps }: AppProps ) {
  return (
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider>
  );
}
