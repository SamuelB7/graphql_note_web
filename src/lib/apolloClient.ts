import { ApolloClient, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
    uri: 'http://localhost:7000/graphql',
    cache: new InMemoryCache()
})