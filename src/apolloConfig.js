import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
        'X-Api-Key': process.env.REACT_APP_AWS_APPSYNC_APIKEY,
    }
});