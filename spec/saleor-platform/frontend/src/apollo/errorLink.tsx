import { fromPromise, createHttpLink, ApolloClient, from, Observable } from '@apollo/client'
import { store } from '../redux/store';
import { setTokens } from '../redux/auth.slice';
import { onError } from "@apollo/client/link/error";
import cache from './cache';
import { useRefreshTokenMutation } from '../../generated/graphql';


const renewTokenApiClient = new ApolloClient({
    link: createHttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL
    }),
    cache: cache,
    credentials: 'include',
})


let isRefreshing = false
let pendingRequests: Function[] = []

const setIsRefreshing = (value: boolean) => {
    isRefreshing = value
}

const addPendingRequest = (pendingRequest: Function) => {
    pendingRequests.push(pendingRequest)
}

const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback())
    pendingRequests = []
}

const getNewToken = async (refreshMut) : Promise<string> => {
    const data = await refreshMut(store.getState().auth.refreshToken);
    console.log(data);

    store.dispatch(setTokens({ userToken: data.data.tokenRefresh.token, refreshToken: store.getState().auth.refreshToken }));
    return data.data.tokenRefresh.token
}

export function createErrorLink() {
    const [refreshMut] = useRefreshTokenMutation({
        client: renewTokenApiClient!, variables: {
            refreshToken: store.getState().auth.refreshToken
        }
    });
    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
                if (message.includes("expired")) {
                    if (!isRefreshing) {
                        setIsRefreshing(true);
                        const observable =  fromPromise(getNewToken(refreshMut))
                        .map((data)=> {console.log("result from observable map method " + data); return data})    
                        .flatMap((data) => {
                            setIsRefreshing(false);
                            operation.setContext(({ headers={} }) => ({
                                headers: {
                                    ...headers,
                                    authorization: "Bearer " + data
                                }
                            }));
                            resolvePendingRequests();
                            return forward(operation);
                        })
                        observable.subscribe({
                            complete: ()=> {
                                operation.operationName !== "tokensDeactivateAll" && renewTokenApiClient.resetStore();
                            }
                        });
                        return observable;
                    } else {
                        return fromPromise(new Promise((resolve => {
                            addPendingRequest(() => resolve(null))
                        }))).flatMap(() => {
                            return forward(operation)
                        })
                    }
                }
            })
    });
    return { errorLink };
}