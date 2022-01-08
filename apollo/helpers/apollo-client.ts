import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from 'apollo-link-error';
import { wsLink } from './ws-link';

// import { createUploadLink } from "apollo-upload-client";
// import { GenerateNewAccessTokenDocument } from "apollo/generated/graphql";
// import { Cookies } from "types/cookie.types";
// import cookie from "react-cookies";
// import { fromPromise } from "apollo-link";
// import { onError } from "apollo-link-error";
// import Router from "next/dist/client/router";
// import { getPathToNavigate, PAGE_KIND } from "@services/navigation.service";

// const authLink = new ApolloLink((operation, forward) => {
//   const token = cookie.load(Cookies.ACCESSTOKEN);
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   });
//   return forward(operation);
// });

// const uploadLink = createUploadLink({
//   uri: "http://localhost:4000/graphql",
//   // credentials: "include",
// }) as unknown as ApolloLink; // workaround for https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46785

// /**
//  *
//  *
//  * @return {*}
//  */
// const getNewToken = () => {
//   const refreshToken = cookie.load(Cookies.REFRESHTOKEN);
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   return client
//     .mutate({
//       mutation: GenerateNewAccessTokenDocument,
//       variables: {
//         refreshToken,
//       },
//     })
//     .then((response) => {
//       // extract your accessToken from your response data and return it
//       const {
//         generateAccessToken: { accessToken },
//       } = response.data;
//       cookie.save(Cookies.ACCESSTOKEN, accessToken, { path: "" });
//       return accessToken;
//     });
// };

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    // eslint-disable-next-line no-restricted-syntax
    for (let err of graphQLErrors) {
      switch (err.message) {
        // case "UNAUTHORIZED":
        //   return fromPromise(
        //     getNewToken().catch(() => {
        //       // Handle token refresh errors e.g clear stored tokens, redirect to login
        //       Router.push(getPathToNavigate(PAGE_KIND.LOGIN));
        //       cookie.remove(Cookies.ACCESSTOKEN);
        //     })
        //   )
        //     .filter((value) => Boolean(value))
        //     .flatMap((accessToken) => {
        //       const oldHeaders = operation.getContext().headers;
        //       // modify the operation context with a new token
        //       operation.setContext({
        //         headers: {
        //           ...oldHeaders,
        //           authorization: `Bearer ${accessToken}`,
        //         },
        //       });
        //       // retry the request, returning the new observable
        //       return forward(operation);
        //     });
        default:
          forward(operation);
      }
    }
  }
});


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql/',
  fetch,
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
  httpLink,
);

const link = ApolloLink.from([splitLink]);

const client = new ApolloClient({
  // link: ApolloLink.from([errorLink as any, authLink, uploadLink]),
  link: ApolloLink.from([errorLink as any, link]),
  // link: link,
  cache: new InMemoryCache(),
});

export default client;
