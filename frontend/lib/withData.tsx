import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createUploadLink } from "apollo-upload-client";
import withApollo, { InitApolloClient } from "next-with-apollo";
import { endpoint } from "../config";
import paginationField from "./paginationField";

const createClient: InitApolloClient<NormalizedCacheObject> = ({
  headers,
  initialState,
}) =>
  new ApolloClient({
    uri: endpoint,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            // eslint-disable-next-line no-console
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        if (networkError) {
          // eslint-disable-next-line no-console
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
        }
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: endpoint,
        fetchOptions: {
          credentials: "include",
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
    connectToDevTools: process.env.NODE_ENV === "development",
  });

export default withApollo(createClient, { getDataFromTree });
