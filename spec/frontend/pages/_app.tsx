import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import {store} from '../redux/store';

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
     
    return (
    <Provider store={store}>
        <ApolloProvider client={client}>
                <Header />
                <Component {...pageProps}/>
        </ApolloProvider>
    </Provider>
    );
  }