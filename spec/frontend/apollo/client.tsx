import { useMemo } from 'react'
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import merge from 'deepmerge';
import { setContext } from '@apollo/client/link/context';
import { isRefreshNeeded } from './auth_vars';
let apolloClient: ApolloClient<NormalizedCacheObject>

function createAuthLink(token): Array<ApolloLink> {
  const httpLink = createHttpLink({
    uri: 'https://brunswick.stepzen.net/api/saleor-strapi/__graphql'
  });
  const retryLink = new RetryLink({
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error
    }
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? "Bearer " + token : "apikey brunswick::stepzen.net+1000::c12e98d9bee9bd2f3051a3b9984fef3ea4da3ebfe1f235f16671f724bc25b662",
      }
    }
  });
  return [authLink, retryLink, httpLink]
}

function createErrorLink(): ApolloLink {
  const errorLink = onError(({ graphQLErrors, networkError, response, forward, operation }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        {
          console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
          if(message.includes("expired")){
            isRefreshNeeded(true);
            console.log(response.errors);
            console.log(operation.query);
            console.log(operation.operationName);
            response.errors = null;
          }
        }
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  return errorLink;
}

function createApolloClient(token) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([createErrorLink(), ...createAuthLink(token)]),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = null, token = null) {
  if (apolloClient) {
    apolloClient.stop();
    console.log("stopping apollo client");

  }
  console.log("initializing apollo");

  const _apolloClient = createApolloClient(token)
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState, token) {
  console.log("updating with " + token);

  const store = useMemo(() => initializeApollo(initialState, token), [initialState, token])
  return store
}