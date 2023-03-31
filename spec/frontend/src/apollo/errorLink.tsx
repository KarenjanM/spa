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
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                );
                if (message.includes("expired")) {
                    console.log("expired");
                    console.log(isRefreshing);

                    if (!isRefreshing) {
                        setIsRefreshing(true);
                        const observable =  fromPromise(getNewToken(refreshMut))
                        .map((data)=> {console.log("result from observable map method " + data); return data})    
                        .flatMap((data) => {
                            setIsRefreshing(false);
                            console.log("accessToken in flatMap method " + data);
                            operation.setContext(({ headers={} }) => ({
                                headers: {
                                    ...headers,
                                    authorization: "Bearer " + data
                                }
                            }));
                            console.log(operation.getContext());
                            resolvePendingRequests();
                            return forward(operation);
                        })
                        observable.subscribe({
                            next: (value)=> console.log(value),
                            error: (error)=> console.error(error),
                            complete: ()=> {
                                operation.operationName !== "tokensDeactivateAll" && renewTokenApiClient.resetStore();
                                console.log('Completed')
                            }
                        });
                        return observable;
                    } else {
                        return fromPromise(new Promise((resolve => {
                            addPendingRequest(() => resolve(null))
                        }))).flatMap(() => {
                            console.log("isRefreshing equals true");

                            return forward(operation)
                        })
                    }
                }
            })
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    return { errorLink };
}