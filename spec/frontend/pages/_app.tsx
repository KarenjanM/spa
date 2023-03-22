import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import {store} from '../redux/store';
import { useApollo } from '../apollo/client';
import { CheckoutProvider } from '../contexts/checkoutContext';
import RefreshToken from '../components/RefreshToken';


export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialState, store.getState().auth.userToken);
  return (
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <CheckoutProvider>
              <RefreshToken>
                <Header />
                <Component {...pageProps}/>
              </RefreshToken>
          </CheckoutProvider>
        </ApolloProvider>
    </Provider>
    );
  }