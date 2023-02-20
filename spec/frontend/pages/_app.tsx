import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import {store} from '../redux/store';
import { useApollo } from '../apollo/client';
import useCreateCheckout from '../hooks/checkout';
import { CheckoutContext } from '../contexts/checkoutContext';

const httpLink = createHttpLink({
    uri: 'https://brunswick.stepzen.net/api/saleor-strapi/__graphql'
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: "apikey brunswick::stepzen.net+1000::c12e98d9bee9bd2f3051a3b9984fef3ea4da3ebfe1f235f16671f724bc25b662",
      }
    }
  });
  
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  

export default function App({ Component, pageProps }) {    
    const apolloClient = useApollo(pageProps.initialState, store.getState().auth.userToken);
    console.log(store.getState().auth.userToken);
    const checkoutId = useCreateCheckout(apolloClient, []).id;
    return (
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <CheckoutContext.Provider value={checkoutId}>
                <Header />
                <Component {...pageProps}/>
          </CheckoutContext.Provider>
        </ApolloProvider>
    </Provider>
    );
  }