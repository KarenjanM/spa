import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import merge from 'deepmerge'
import { setContext } from '@apollo/client/link/context'

let apolloClient

function createIsomorphLink(token) {
    const httpLink = createHttpLink({
      uri: 'https://brunswick.stepzen.net/api/saleor-strapi/__graphql'
    });
    const authLink = setContext((_, { headers }) => {
        return {
        headers: {
            ...headers,
            authorization: token ? "Bearer " + token : "apikey brunswick::stepzen.net+1000::c12e98d9bee9bd2f3051a3b9984fef3ea4da3ebfe1f235f16671f724bc25b662",
        }
        }
    });
    return authLink.concat(httpLink)
  }

function createApolloClient(token) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(token),
    cache: new InMemoryCache({
    typePolicies: {
      Checkout: {
        fields: {
          lines: {
            merge(existing = [], incoming: any[]) {
              console.log("merge");
              existing.map((item)=>console.log("exist " + item));
              incoming.map((item)=>console.log("comes " +item));
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  })
})
}

export function initializeApollo(initialState = null, token=null) {
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
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState, token) {
  const store = useMemo(() => initializeApollo(initialState, token), [initialState, token])
  return store
}