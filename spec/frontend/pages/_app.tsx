import '../styles/globals.css';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import Header from '../components/Header';

const client = new ApolloClient({
    uri: 'https://brunswick.stepzen.net/api/saleor-strapi/__graphql',
    headers: {
        "Content-Type": "application/json",
        "Authorization": !process.env.BEARER_TOKEN ? "apikey brunswick::stepzen.net+1000::c12e98d9bee9bd2f3051a3b9984fef3ea4da3ebfe1f235f16671f724bc25b662" : process.env.BEARER_TOKEN
    },
  // ...other arguments...
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