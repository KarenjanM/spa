import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import {store} from '../redux/store';
import { useApollo } from '../apollo/client';
import { CheckoutProvider } from '../contexts/checkoutContext';

export default function App({ Component, pageProps }) {    
    const apolloClient = useApollo(pageProps.initialState, store.getState().auth.userToken);
    console.log(store.getState().auth.userToken);
    return (
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <CheckoutProvider>
                <Header />
                <Component {...pageProps}/>
          </CheckoutProvider>
        </ApolloProvider>
    </Provider>
    );
  }