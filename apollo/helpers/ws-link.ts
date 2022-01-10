import { ApolloLink } from '@apollo/client';
import { w3cwebsocket } from 'websocket';
import {  FetchResult, Observable, Operation } from '@apollo/client/core';
import { print } from 'graphql';
import { Client, ClientOptions, createClient } from 'graphql-ws';
import toast from 'react-hot-toast';

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
          error: (err: any) => {
            if (err instanceof Error) {
              return sink.error(err);
            }

            if (isLikeCloseEvent(err)) {
              toast.error('Websocket not registered')
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`,
                ),
              );
            }
            toast.error('Websocket not registered')
            return sink.error(
              new Error(err.message),
            );
          },
        },
      );
    });
  }
}

function isLikeCloseEvent(val: any) {
  return 'code' in Object(val) && 'reason' in Object(val);
}

export const wsLink =  new WebSocketLink({
  url: process.env.NEXT_PUBLIC_BASE_WS_URL!, 
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