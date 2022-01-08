import { ApolloLink } from '@apollo/client';
import { w3cwebsocket } from 'websocket';
import {  FetchResult, Observable, Operation } from '@apollo/client/core';
import { print, GraphQLError } from 'graphql';
import { Client, ClientOptions, createClient } from 'graphql-ws';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>({ 
        ...operation, 
        query: print(operation.query) },{
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              return sink.error(err);
            }

            if (err instanceof CloseEvent) {
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`,
                ),
              );
            }
            return sink.error(
              new Error(
                (err as GraphQLError[])
                  .map(({ message }) => message)
                  .join(', '),
              ),
            );
          },
        },
      );
    });
  }
}

export const wsLink =  new WebSocketLink({
  url: 'ws://localhost:4001/graphql', 
  webSocketImpl: w3cwebsocket,
  // connectionParams: () => {
  //   const session = getSession();
  //   if (!session) {
  //     return {};
  //   }
  //   return {
  //     Authorization: `Bearer ${session.token}`,
  //   };
  // }
})