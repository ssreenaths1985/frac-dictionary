import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client} from './client'

// Wrap all child components under Apollo Client
export const wrapRootElement = ({ element }) => (
    <ApolloProvider client ={client}>{element}</ApolloProvider>
)