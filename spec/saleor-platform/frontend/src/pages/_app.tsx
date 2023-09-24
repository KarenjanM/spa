import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import { CheckoutProvider } from '../contexts/checkoutContext';
import { MainLayout } from '../components/layouts/MainLayout';
import { PersistGate } from 'redux-persist/integration/react';
import { createApolloClient } from '../apollo/client';
import ErrorBoundary from '../components/ErrorBoundary';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page)=> page)
  return (
    <ErrorBoundary fallback={"Es ist ein Fehler eingetroffen worden. Wir wurden schon darüber informiert und werden in Kürze das Problem lösen. Wir bitten um Entschuldingung wegen diesen Unahnemlichkeiten."}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={createApolloClient()}>
          <CheckoutProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
          </CheckoutProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
    </ErrorBoundary>
  );
}