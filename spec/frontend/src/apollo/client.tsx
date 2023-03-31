import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client'
import { store } from '../redux/store';
import { createErrorLink } from './errorLink';
import cache from './cache';


function createAuthLink(token): Array<ApolloLink> {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({headers} : { headers: Headers }) => ({
        headers: {
          ...headers,
          authorization: token ? "Bearer " + token : "apikey brunswick::stepzen.net+1000::c12e98d9bee9bd2f3051a3b9984fef3ea4da3ebfe1f235f16671f724bc25b662",
        }
    }))
    return forward(operation)
  })
  return [authLink]
}



export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL
  });
  const {errorLink} = createErrorLink();
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([...createAuthLink(store.getState().auth.userToken), errorLink, httpLink]),
    cache: cache
  })
}