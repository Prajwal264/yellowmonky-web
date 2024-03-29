import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AdminUser = EntityWrapper & {
  __typename?: 'AdminUser';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type Channel = EntityWrapper & {
  __typename?: 'Channel';
  adminId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  teamId: Scalars['String'];
  topics?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ChannelMessage = EntityWrapper & Message & {
  __typename?: 'ChannelMessage';
  childMessages?: Maybe<ChannelMessage>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: TeamMember;
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  parentMessage?: Maybe<ChannelMessage>;
  parentMessageId?: Maybe<Scalars['String']>;
  sourceChannel: Channel;
  sourceChannelId: Scalars['String'];
  sourceType: MessageSourceType;
  updatedAt: Scalars['DateTime'];
};

export type CreateMemberResponse = {
  __typename?: 'CreateMemberResponse';
  channelId: Scalars['String'];
  id: Scalars['String'];
  teamId: Scalars['String'];
};

export type DirectMessage = EntityWrapper & Message & {
  __typename?: 'DirectMessage';
  childMessages?: Maybe<DirectMessage>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: TeamMember;
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  parentMessage?: Maybe<DirectMessage>;
  parentMessageId?: Maybe<Scalars['String']>;
  recipient: TeamMember;
  recipientId: Scalars['String'];
  sourceType: MessageSourceType;
  updatedAt: Scalars['DateTime'];
};

export type EditTeamResponse = {
  __typename?: 'EditTeamResponse';
  channels: Array<Scalars['String']>;
  teamId: Scalars['String'];
};

/** parent entity type. This consists the shared logic and fields for all entities. */
export type EntityWrapper = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type Error = {
  __typename?: 'Error';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  statusCode: Scalars['Int'];
};

export type Message = {
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  parentMessageId?: Maybe<Scalars['String']>;
  sourceType: MessageSourceType;
  updatedAt: Scalars['DateTime'];
};

/** The source type of the message */
export enum MessageSourceType {
  Channel = 'CHANNEL',
  DirectMessage = 'DIRECT_MESSAGE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  createChannelMessage: Scalars['String'];
  createDirectMessage: Scalars['String'];
  createUserAndAddToTeam: CreateMemberResponse;
  editChannel: Channel;
  editTeam: EditTeamResponse;
  inviteMembers: Scalars['Boolean'];
  login: UserResponse;
  registerAdmin: RegisterAdminResponse;
};


export type MutationCreateChannelArgs = {
  adminId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  teamId: Scalars['String'];
  topics?: InputMaybe<Scalars['String']>;
};


export type MutationCreateChannelMessageArgs = {
  content: Scalars['String'];
  creatorId: Scalars['String'];
  sourceChannelId?: InputMaybe<Scalars['String']>;
  sourceType: MessageSourceType;
};


export type MutationCreateDirectMessageArgs = {
  content: Scalars['String'];
  creatorId: Scalars['String'];
  recipientId?: InputMaybe<Scalars['String']>;
  sourceType: MessageSourceType;
};


export type MutationCreateUserAndAddToTeamArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  teamId: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEditChannelArgs = {
  channelId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  topics?: InputMaybe<Scalars['String']>;
};


export type MutationEditTeamArgs = {
  channels?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  displayPicture?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  ownerId: Scalars['String'];
};


export type MutationInviteMembersArgs = {
  inviteeEmails: Array<Scalars['String']>;
  inviterId: Scalars['String'];
  teamId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterAdminArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allChannelMessages: Array<ChannelMessage>;
  allChannels: Array<Maybe<Channel>>;
  allDirectMessagesByRecipientId: Array<DirectMessage>;
  allTeamMembers: Array<TeamMember>;
  allTeams: Array<TeamListResponse>;
  channel: Channel;
  getUsers: Array<Maybe<User>>;
  team: Team;
  teamMember: TeamMember;
};


export type QueryAllChannelMessagesArgs = {
  channelId: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Float'];
};


export type QueryAllChannelsArgs = {
  teamId: Scalars['String'];
};


export type QueryAllDirectMessagesByRecipientIdArgs = {
  creatorId: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Float'];
  recipientId: Scalars['String'];
};


export type QueryAllTeamMembersArgs = {
  teamId: Scalars['String'];
};


export type QueryAllTeamsArgs = {
  userId: Scalars['String'];
};


export type QueryChannelArgs = {
  channelId: Scalars['String'];
};


export type QueryTeamArgs = {
  teamId: Scalars['String'];
};


export type QueryTeamMemberArgs = {
  memberId: Scalars['String'];
};

export type RegisterAdminResponse = EntityWrapper & {
  __typename?: 'RegisterAdminResponse';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newChannelMessage: ChannelMessage;
  newDirectMessage: DirectMessage;
};


export type SubscriptionNewChannelMessageArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionNewDirectMessageArgs = {
  creatorId: Scalars['String'];
  recipientId: Scalars['String'];
};

export type Team = EntityWrapper & {
  __typename?: 'Team';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  displayPicture?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  ownerId: Scalars['String'];
  teamMembers: Array<TeamMember>;
  updatedAt: Scalars['DateTime'];
};

export type TeamListResponse = EntityWrapper & {
  __typename?: 'TeamListResponse';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  displayPicture?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  memberCount: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  ownerId: Scalars['String'];
  teamMembers: Array<TeamMember>;
  updatedAt: Scalars['DateTime'];
};

export type TeamMember = EntityWrapper & {
  __typename?: 'TeamMember';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  role: TeamMemberRole;
  status: TeamMemberStatus;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

/** The team member role type */
export enum TeamMemberRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

/** The team member status type */
export enum TeamMemberStatus {
  Invited = 'INVITED',
  Joined = 'JOINED',
  Rejected = 'REJECTED'
}

export type TeamResponse = EntityWrapper & {
  __typename?: 'TeamResponse';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  displayPicture?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  ownerId: Scalars['String'];
  teamMembers: Array<TeamMember>;
  updatedAt: Scalars['DateTime'];
};

export type User = EntityWrapper & {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = EntityWrapper & {
  __typename?: 'UserResponse';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type RegisterAdminMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'RegisterAdminResponse', id: string, email: string, username: string, profileImage?: string | null | undefined, teamId: string, createdAt: any, updatedAt: any } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', id: string } };

export type CreateChannelMessageMutationVariables = Exact<{
  content: Scalars['String'];
  sourceType: MessageSourceType;
  creatorId: Scalars['String'];
  sourceChannelId: Scalars['String'];
}>;


export type CreateChannelMessageMutation = { __typename?: 'Mutation', createChannelMessage: string };

export type FetchAllChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['String'];
  limit: Scalars['Float'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type FetchAllChannelMessagesQuery = { __typename?: 'Query', allChannelMessages: Array<{ __typename?: 'ChannelMessage', id: string, content: string, creatorId: string, createdAt: any }> };

export type CreateDirectMessageMutationVariables = Exact<{
  content: Scalars['String'];
  creatorId: Scalars['String'];
  recipientId: Scalars['String'];
  sourceType: MessageSourceType;
}>;


export type CreateDirectMessageMutation = { __typename?: 'Mutation', createDirectMessage: string };

export type FetchAllDirectMessagesQueryVariables = Exact<{
  creatorId: Scalars['String'];
  recipientId: Scalars['String'];
  limit: Scalars['Float'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type FetchAllDirectMessagesQuery = { __typename?: 'Query', allDirectMessagesByRecipientId: Array<{ __typename?: 'DirectMessage', id: string, content: string, creatorId: string, createdAt: any }> };

export type CreateMemberAndAddToTeamMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  teamId: Scalars['String'];
}>;


export type CreateMemberAndAddToTeamMutation = { __typename?: 'Mutation', createUserAndAddToTeam: { __typename?: 'CreateMemberResponse', id: string, teamId: string, channelId: string } };

export type InviteMembersMutationVariables = Exact<{
  inviterId: Scalars['String'];
  inviteeEmails: Array<Scalars['String']> | Scalars['String'];
  teamId: Scalars['String'];
}>;


export type InviteMembersMutation = { __typename?: 'Mutation', inviteMembers: boolean };

export type FetchTeamInfoQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type FetchTeamInfoQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, name?: string | null | undefined, description?: string | null | undefined, createdAt: any, updatedAt: any } };

export type FetchAllTeamsForUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FetchAllTeamsForUserQuery = { __typename?: 'Query', allTeams: Array<{ __typename?: 'TeamListResponse', id: string, name?: string | null | undefined, description?: string | null | undefined, memberCount: string }> };

export type EditTeamMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  ownerId: Scalars['String'];
  channels?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type EditTeamMutation = { __typename?: 'Mutation', editTeam: { __typename?: 'EditTeamResponse', teamId: string, channels: Array<string> } };

export type FetchChannelQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type FetchChannelQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: string, name: string, description?: string | null | undefined, topics?: string | null | undefined, createdAt: any, adminId: string } };

export type FetchAllChannelsQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type FetchAllChannelsQuery = { __typename?: 'Query', allChannels: Array<{ __typename?: 'Channel', id: string, name: string } | null | undefined> };

export type CreateChannelMutationVariables = Exact<{
  teamId: Scalars['String'];
  adminId: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', id: string, name: string } };

export type EditChannelMutationVariables = Exact<{
  channelId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  topics?: InputMaybe<Scalars['String']>;
}>;


export type EditChannelMutation = { __typename?: 'Mutation', editChannel: { __typename?: 'Channel', id: string, name: string, description?: string | null | undefined, topics?: string | null | undefined, createdAt: any, adminId: string } };

export type FetchAllTeamMembersQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type FetchAllTeamMembersQuery = { __typename?: 'Query', allTeamMembers: Array<{ __typename?: 'TeamMember', id: string, user: { __typename?: 'User', id: string, email: string, username: string, profileImage?: string | null | undefined } }> };

export type FetchTeamMemberQueryVariables = Exact<{
  memberId: Scalars['String'];
}>;


export type FetchTeamMemberQuery = { __typename?: 'Query', teamMember: { __typename?: 'TeamMember', id: string, user: { __typename?: 'User', id: string, email: string, username: string, profileImage?: string | null | undefined } } };

export type NewChannelMessageSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type NewChannelMessageSubscription = { __typename?: 'Subscription', newChannelMessage: { __typename?: 'ChannelMessage', id: string, content: string, creatorId: string, createdAt: any } };

export type NewDirectMessageSubscriptionVariables = Exact<{
  creatorId: Scalars['String'];
  recipientId: Scalars['String'];
}>;


export type NewDirectMessageSubscription = { __typename?: 'Subscription', newDirectMessage: { __typename?: 'DirectMessage', id: string, content: string, creatorId: string, createdAt: any } };


export const RegisterAdminDocument = gql`
    mutation RegisterAdmin($username: String!, $email: String!, $password: String!) {
  registerAdmin(username: $username, email: $email, password: $password) {
    id
    email
    username
    profileImage
    teamId
    createdAt
    updatedAt
  }
}
    `;
export type RegisterAdminMutationFn = Apollo.MutationFunction<RegisterAdminMutation, RegisterAdminMutationVariables>;

/**
 * __useRegisterAdminMutation__
 *
 * To run a mutation, you first call `useRegisterAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAdminMutation, { data, loading, error }] = useRegisterAdminMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterAdminMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAdminMutation, RegisterAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument, options);
      }
export type RegisterAdminMutationHookResult = ReturnType<typeof useRegisterAdminMutation>;
export type RegisterAdminMutationResult = Apollo.MutationResult<RegisterAdminMutation>;
export type RegisterAdminMutationOptions = Apollo.BaseMutationOptions<RegisterAdminMutation, RegisterAdminMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateChannelMessageDocument = gql`
    mutation CreateChannelMessage($content: String!, $sourceType: MessageSourceType!, $creatorId: String!, $sourceChannelId: String!) {
  createChannelMessage(
    content: $content
    sourceType: $sourceType
    creatorId: $creatorId
    sourceChannelId: $sourceChannelId
  )
}
    `;
export type CreateChannelMessageMutationFn = Apollo.MutationFunction<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;

/**
 * __useCreateChannelMessageMutation__
 *
 * To run a mutation, you first call `useCreateChannelMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMessageMutation, { data, loading, error }] = useCreateChannelMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      sourceType: // value for 'sourceType'
 *      creatorId: // value for 'creatorId'
 *      sourceChannelId: // value for 'sourceChannelId'
 *   },
 * });
 */
export function useCreateChannelMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>(CreateChannelMessageDocument, options);
      }
export type CreateChannelMessageMutationHookResult = ReturnType<typeof useCreateChannelMessageMutation>;
export type CreateChannelMessageMutationResult = Apollo.MutationResult<CreateChannelMessageMutation>;
export type CreateChannelMessageMutationOptions = Apollo.BaseMutationOptions<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;
export const FetchAllChannelMessagesDocument = gql`
    query FetchAllChannelMessages($channelId: String!, $limit: Float!, $cursor: String) {
  allChannelMessages(channelId: $channelId, limit: $limit, cursor: $cursor) {
    id
    content
    creatorId
    createdAt
  }
}
    `;

/**
 * __useFetchAllChannelMessagesQuery__
 *
 * To run a query within a React component, call `useFetchAllChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFetchAllChannelMessagesQuery(baseOptions: Apollo.QueryHookOptions<FetchAllChannelMessagesQuery, FetchAllChannelMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllChannelMessagesQuery, FetchAllChannelMessagesQueryVariables>(FetchAllChannelMessagesDocument, options);
      }
export function useFetchAllChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllChannelMessagesQuery, FetchAllChannelMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllChannelMessagesQuery, FetchAllChannelMessagesQueryVariables>(FetchAllChannelMessagesDocument, options);
        }
export type FetchAllChannelMessagesQueryHookResult = ReturnType<typeof useFetchAllChannelMessagesQuery>;
export type FetchAllChannelMessagesLazyQueryHookResult = ReturnType<typeof useFetchAllChannelMessagesLazyQuery>;
export type FetchAllChannelMessagesQueryResult = Apollo.QueryResult<FetchAllChannelMessagesQuery, FetchAllChannelMessagesQueryVariables>;
export const CreateDirectMessageDocument = gql`
    mutation CreateDirectMessage($content: String!, $creatorId: String!, $recipientId: String!, $sourceType: MessageSourceType!) {
  createDirectMessage(
    content: $content
    creatorId: $creatorId
    recipientId: $recipientId
    sourceType: $sourceType
  )
}
    `;
export type CreateDirectMessageMutationFn = Apollo.MutationFunction<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      creatorId: // value for 'creatorId'
 *      recipientId: // value for 'recipientId'
 *      sourceType: // value for 'sourceType'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>(CreateDirectMessageDocument, options);
      }
export type CreateDirectMessageMutationHookResult = ReturnType<typeof useCreateDirectMessageMutation>;
export type CreateDirectMessageMutationResult = Apollo.MutationResult<CreateDirectMessageMutation>;
export type CreateDirectMessageMutationOptions = Apollo.BaseMutationOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;
export const FetchAllDirectMessagesDocument = gql`
    query FetchAllDirectMessages($creatorId: String!, $recipientId: String!, $limit: Float!, $cursor: String) {
  allDirectMessagesByRecipientId(
    creatorId: $creatorId
    recipientId: $recipientId
    limit: $limit
    cursor: $cursor
  ) {
    id
    content
    creatorId
    createdAt
  }
}
    `;

/**
 * __useFetchAllDirectMessagesQuery__
 *
 * To run a query within a React component, call `useFetchAllDirectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllDirectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllDirectMessagesQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *      recipientId: // value for 'recipientId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFetchAllDirectMessagesQuery(baseOptions: Apollo.QueryHookOptions<FetchAllDirectMessagesQuery, FetchAllDirectMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllDirectMessagesQuery, FetchAllDirectMessagesQueryVariables>(FetchAllDirectMessagesDocument, options);
      }
export function useFetchAllDirectMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllDirectMessagesQuery, FetchAllDirectMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllDirectMessagesQuery, FetchAllDirectMessagesQueryVariables>(FetchAllDirectMessagesDocument, options);
        }
export type FetchAllDirectMessagesQueryHookResult = ReturnType<typeof useFetchAllDirectMessagesQuery>;
export type FetchAllDirectMessagesLazyQueryHookResult = ReturnType<typeof useFetchAllDirectMessagesLazyQuery>;
export type FetchAllDirectMessagesQueryResult = Apollo.QueryResult<FetchAllDirectMessagesQuery, FetchAllDirectMessagesQueryVariables>;
export const CreateMemberAndAddToTeamDocument = gql`
    mutation CreateMemberAndAddToTeam($username: String!, $password: String!, $email: String!, $teamId: String!) {
  createUserAndAddToTeam(
    username: $username
    password: $password
    email: $email
    teamId: $teamId
  ) {
    id
    teamId
    channelId
  }
}
    `;
export type CreateMemberAndAddToTeamMutationFn = Apollo.MutationFunction<CreateMemberAndAddToTeamMutation, CreateMemberAndAddToTeamMutationVariables>;

/**
 * __useCreateMemberAndAddToTeamMutation__
 *
 * To run a mutation, you first call `useCreateMemberAndAddToTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberAndAddToTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberAndAddToTeamMutation, { data, loading, error }] = useCreateMemberAndAddToTeamMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useCreateMemberAndAddToTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberAndAddToTeamMutation, CreateMemberAndAddToTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemberAndAddToTeamMutation, CreateMemberAndAddToTeamMutationVariables>(CreateMemberAndAddToTeamDocument, options);
      }
export type CreateMemberAndAddToTeamMutationHookResult = ReturnType<typeof useCreateMemberAndAddToTeamMutation>;
export type CreateMemberAndAddToTeamMutationResult = Apollo.MutationResult<CreateMemberAndAddToTeamMutation>;
export type CreateMemberAndAddToTeamMutationOptions = Apollo.BaseMutationOptions<CreateMemberAndAddToTeamMutation, CreateMemberAndAddToTeamMutationVariables>;
export const InviteMembersDocument = gql`
    mutation InviteMembers($inviterId: String!, $inviteeEmails: [String!]!, $teamId: String!) {
  inviteMembers(
    inviterId: $inviterId
    inviteeEmails: $inviteeEmails
    teamId: $teamId
  )
}
    `;
export type InviteMembersMutationFn = Apollo.MutationFunction<InviteMembersMutation, InviteMembersMutationVariables>;

/**
 * __useInviteMembersMutation__
 *
 * To run a mutation, you first call `useInviteMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMembersMutation, { data, loading, error }] = useInviteMembersMutation({
 *   variables: {
 *      inviterId: // value for 'inviterId'
 *      inviteeEmails: // value for 'inviteeEmails'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useInviteMembersMutation(baseOptions?: Apollo.MutationHookOptions<InviteMembersMutation, InviteMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteMembersMutation, InviteMembersMutationVariables>(InviteMembersDocument, options);
      }
export type InviteMembersMutationHookResult = ReturnType<typeof useInviteMembersMutation>;
export type InviteMembersMutationResult = Apollo.MutationResult<InviteMembersMutation>;
export type InviteMembersMutationOptions = Apollo.BaseMutationOptions<InviteMembersMutation, InviteMembersMutationVariables>;
export const FetchTeamInfoDocument = gql`
    query FetchTeamInfo($teamId: String!) {
  team(teamId: $teamId) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFetchTeamInfoQuery__
 *
 * To run a query within a React component, call `useFetchTeamInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTeamInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTeamInfoQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFetchTeamInfoQuery(baseOptions: Apollo.QueryHookOptions<FetchTeamInfoQuery, FetchTeamInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTeamInfoQuery, FetchTeamInfoQueryVariables>(FetchTeamInfoDocument, options);
      }
export function useFetchTeamInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTeamInfoQuery, FetchTeamInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTeamInfoQuery, FetchTeamInfoQueryVariables>(FetchTeamInfoDocument, options);
        }
export type FetchTeamInfoQueryHookResult = ReturnType<typeof useFetchTeamInfoQuery>;
export type FetchTeamInfoLazyQueryHookResult = ReturnType<typeof useFetchTeamInfoLazyQuery>;
export type FetchTeamInfoQueryResult = Apollo.QueryResult<FetchTeamInfoQuery, FetchTeamInfoQueryVariables>;
export const FetchAllTeamsForUserDocument = gql`
    query FetchAllTeamsForUser($userId: String!) {
  allTeams(userId: $userId) {
    id
    name
    description
    memberCount
  }
}
    `;

/**
 * __useFetchAllTeamsForUserQuery__
 *
 * To run a query within a React component, call `useFetchAllTeamsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllTeamsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllTeamsForUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFetchAllTeamsForUserQuery(baseOptions: Apollo.QueryHookOptions<FetchAllTeamsForUserQuery, FetchAllTeamsForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllTeamsForUserQuery, FetchAllTeamsForUserQueryVariables>(FetchAllTeamsForUserDocument, options);
      }
export function useFetchAllTeamsForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllTeamsForUserQuery, FetchAllTeamsForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllTeamsForUserQuery, FetchAllTeamsForUserQueryVariables>(FetchAllTeamsForUserDocument, options);
        }
export type FetchAllTeamsForUserQueryHookResult = ReturnType<typeof useFetchAllTeamsForUserQuery>;
export type FetchAllTeamsForUserLazyQueryHookResult = ReturnType<typeof useFetchAllTeamsForUserLazyQuery>;
export type FetchAllTeamsForUserQueryResult = Apollo.QueryResult<FetchAllTeamsForUserQuery, FetchAllTeamsForUserQueryVariables>;
export const EditTeamDocument = gql`
    mutation EditTeam($name: String, $id: String!, $ownerId: String!, $channels: [String], $members: [String]) {
  editTeam(
    name: $name
    id: $id
    ownerId: $ownerId
    channels: $channels
    members: $members
  ) {
    teamId
    channels
  }
}
    `;
export type EditTeamMutationFn = Apollo.MutationFunction<EditTeamMutation, EditTeamMutationVariables>;

/**
 * __useEditTeamMutation__
 *
 * To run a mutation, you first call `useEditTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTeamMutation, { data, loading, error }] = useEditTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *      ownerId: // value for 'ownerId'
 *      channels: // value for 'channels'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useEditTeamMutation(baseOptions?: Apollo.MutationHookOptions<EditTeamMutation, EditTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTeamMutation, EditTeamMutationVariables>(EditTeamDocument, options);
      }
export type EditTeamMutationHookResult = ReturnType<typeof useEditTeamMutation>;
export type EditTeamMutationResult = Apollo.MutationResult<EditTeamMutation>;
export type EditTeamMutationOptions = Apollo.BaseMutationOptions<EditTeamMutation, EditTeamMutationVariables>;
export const FetchChannelDocument = gql`
    query FetchChannel($channelId: String!) {
  channel(channelId: $channelId) {
    id
    name
    description
    topics
    createdAt
    adminId
  }
}
    `;

/**
 * __useFetchChannelQuery__
 *
 * To run a query within a React component, call `useFetchChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFetchChannelQuery(baseOptions: Apollo.QueryHookOptions<FetchChannelQuery, FetchChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchChannelQuery, FetchChannelQueryVariables>(FetchChannelDocument, options);
      }
export function useFetchChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchChannelQuery, FetchChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchChannelQuery, FetchChannelQueryVariables>(FetchChannelDocument, options);
        }
export type FetchChannelQueryHookResult = ReturnType<typeof useFetchChannelQuery>;
export type FetchChannelLazyQueryHookResult = ReturnType<typeof useFetchChannelLazyQuery>;
export type FetchChannelQueryResult = Apollo.QueryResult<FetchChannelQuery, FetchChannelQueryVariables>;
export const FetchAllChannelsDocument = gql`
    query FetchAllChannels($teamId: String!) {
  allChannels(teamId: $teamId) {
    id
    name
  }
}
    `;

/**
 * __useFetchAllChannelsQuery__
 *
 * To run a query within a React component, call `useFetchAllChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllChannelsQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFetchAllChannelsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllChannelsQuery, FetchAllChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllChannelsQuery, FetchAllChannelsQueryVariables>(FetchAllChannelsDocument, options);
      }
export function useFetchAllChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllChannelsQuery, FetchAllChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllChannelsQuery, FetchAllChannelsQueryVariables>(FetchAllChannelsDocument, options);
        }
export type FetchAllChannelsQueryHookResult = ReturnType<typeof useFetchAllChannelsQuery>;
export type FetchAllChannelsLazyQueryHookResult = ReturnType<typeof useFetchAllChannelsLazyQuery>;
export type FetchAllChannelsQueryResult = Apollo.QueryResult<FetchAllChannelsQuery, FetchAllChannelsQueryVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($teamId: String!, $adminId: String!, $name: String!, $description: String!) {
  createChannel(
    teamId: $teamId
    adminId: $adminId
    name: $name
    description: $description
  ) {
    id
    name
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      adminId: // value for 'adminId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const EditChannelDocument = gql`
    mutation EditChannel($channelId: String!, $name: String, $description: String, $topics: String) {
  editChannel(
    channelId: $channelId
    name: $name
    description: $description
    topics: $topics
  ) {
    id
    name
    description
    topics
    createdAt
    adminId
  }
}
    `;
export type EditChannelMutationFn = Apollo.MutationFunction<EditChannelMutation, EditChannelMutationVariables>;

/**
 * __useEditChannelMutation__
 *
 * To run a mutation, you first call `useEditChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editChannelMutation, { data, loading, error }] = useEditChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      topics: // value for 'topics'
 *   },
 * });
 */
export function useEditChannelMutation(baseOptions?: Apollo.MutationHookOptions<EditChannelMutation, EditChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditChannelMutation, EditChannelMutationVariables>(EditChannelDocument, options);
      }
export type EditChannelMutationHookResult = ReturnType<typeof useEditChannelMutation>;
export type EditChannelMutationResult = Apollo.MutationResult<EditChannelMutation>;
export type EditChannelMutationOptions = Apollo.BaseMutationOptions<EditChannelMutation, EditChannelMutationVariables>;
export const FetchAllTeamMembersDocument = gql`
    query FetchAllTeamMembers($teamId: String!) {
  allTeamMembers(teamId: $teamId) {
    id
    user {
      id
      email
      username
      profileImage
    }
  }
}
    `;

/**
 * __useFetchAllTeamMembersQuery__
 *
 * To run a query within a React component, call `useFetchAllTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFetchAllTeamMembersQuery(baseOptions: Apollo.QueryHookOptions<FetchAllTeamMembersQuery, FetchAllTeamMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllTeamMembersQuery, FetchAllTeamMembersQueryVariables>(FetchAllTeamMembersDocument, options);
      }
export function useFetchAllTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllTeamMembersQuery, FetchAllTeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllTeamMembersQuery, FetchAllTeamMembersQueryVariables>(FetchAllTeamMembersDocument, options);
        }
export type FetchAllTeamMembersQueryHookResult = ReturnType<typeof useFetchAllTeamMembersQuery>;
export type FetchAllTeamMembersLazyQueryHookResult = ReturnType<typeof useFetchAllTeamMembersLazyQuery>;
export type FetchAllTeamMembersQueryResult = Apollo.QueryResult<FetchAllTeamMembersQuery, FetchAllTeamMembersQueryVariables>;
export const FetchTeamMemberDocument = gql`
    query FetchTeamMember($memberId: String!) {
  teamMember(memberId: $memberId) {
    id
    user {
      id
      email
      username
      profileImage
    }
  }
}
    `;

/**
 * __useFetchTeamMemberQuery__
 *
 * To run a query within a React component, call `useFetchTeamMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTeamMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTeamMemberQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useFetchTeamMemberQuery(baseOptions: Apollo.QueryHookOptions<FetchTeamMemberQuery, FetchTeamMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTeamMemberQuery, FetchTeamMemberQueryVariables>(FetchTeamMemberDocument, options);
      }
export function useFetchTeamMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTeamMemberQuery, FetchTeamMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTeamMemberQuery, FetchTeamMemberQueryVariables>(FetchTeamMemberDocument, options);
        }
export type FetchTeamMemberQueryHookResult = ReturnType<typeof useFetchTeamMemberQuery>;
export type FetchTeamMemberLazyQueryHookResult = ReturnType<typeof useFetchTeamMemberLazyQuery>;
export type FetchTeamMemberQueryResult = Apollo.QueryResult<FetchTeamMemberQuery, FetchTeamMemberQueryVariables>;
export const NewChannelMessageDocument = gql`
    subscription NewChannelMessage($channelId: String!) {
  newChannelMessage(channelId: $channelId) {
    id
    content
    creatorId
    createdAt
  }
}
    `;

/**
 * __useNewChannelMessageSubscription__
 *
 * To run a query within a React component, call `useNewChannelMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChannelMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChannelMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewChannelMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewChannelMessageSubscription, NewChannelMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewChannelMessageSubscription, NewChannelMessageSubscriptionVariables>(NewChannelMessageDocument, options);
      }
export type NewChannelMessageSubscriptionHookResult = ReturnType<typeof useNewChannelMessageSubscription>;
export type NewChannelMessageSubscriptionResult = Apollo.SubscriptionResult<NewChannelMessageSubscription>;
export const NewDirectMessageDocument = gql`
    subscription NewDirectMessage($creatorId: String!, $recipientId: String!) {
  newDirectMessage(creatorId: $creatorId, recipientId: $recipientId) {
    id
    content
    creatorId
    createdAt
  }
}
    `;

/**
 * __useNewDirectMessageSubscription__
 *
 * To run a query within a React component, call `useNewDirectMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewDirectMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewDirectMessageSubscription({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *      recipientId: // value for 'recipientId'
 *   },
 * });
 */
export function useNewDirectMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewDirectMessageSubscription, NewDirectMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewDirectMessageSubscription, NewDirectMessageSubscriptionVariables>(NewDirectMessageDocument, options);
      }
export type NewDirectMessageSubscriptionHookResult = ReturnType<typeof useNewDirectMessageSubscription>;
export type NewDirectMessageSubscriptionResult = Apollo.SubscriptionResult<NewDirectMessageSubscription>;