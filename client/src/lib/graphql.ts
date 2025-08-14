import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { nhost } from './nhost';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_NHOST_GRAPHQL_URL || 'https://mtgxujfteudjuldxiehh.nhost.run/v1/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_NHOST_GRAPHQL_WS_URL || 'wss://mtgxujfteudjuldxiehh.nhost.run/v1/graphql',
    connectionParams: () => {
      const session = nhost.auth.getSession();
      return {
        headers: {
          Authorization: session ? `Bearer ${session.accessToken}` : '',
        },
      };
    },
  })
);

const authLink = setContext((_, { headers }) => {
  const session = nhost.auth.getSession();
  return {
    headers: {
      ...headers,
      authorization: session ? `Bearer ${session.accessToken}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
