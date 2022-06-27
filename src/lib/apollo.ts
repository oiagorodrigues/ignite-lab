import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4vsz2e91tv401uk2yn138s8/master',
  cache: new InMemoryCache(),
})
