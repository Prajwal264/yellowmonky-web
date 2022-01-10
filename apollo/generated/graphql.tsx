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
  updatedAt: Scalars['DateTime'];
};

export type CreateMemberResponse = {
  __typename?: 'CreateMemberResponse';
  channelId: Scalars['String'];
  id: Scalars['String'];
  teamId: Scalars['String'];
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

export type Message = EntityWrapper & {
  __typename?: 'Message';
  childMessages?: Maybe<Message>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  parentMessage?: Maybe<Message>;
  parentMessageId?: Maybe<Scalars['String']>;
  sourceChannel: Channel;
  sourceChannelId: Scalars['String'];
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
  createMessage: Scalars['String'];
  createUserAndAddToTeam: CreateMemberResponse;
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
};


export type MutationCreateMessageArgs = {
  content: Scalars['String'];
  creatorId: Scalars['String'];
  sourceChannelId?: InputMaybe<Scalars['String']>;
  sourceType: MessageSourceType;
};


export type MutationCreateUserAndAddToTeamArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  teamId: Scalars['String'];
  username: Scalars['String'];
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
  allChannelMessages: Array<Message>;
  allChannels: Array<Maybe<Channel>>;
  allTeamMembers: Array<TeamMember>;
  channel: Channel;
  getUsers: Array<Maybe<User>>;
  team: Team;
};


export type QueryAllChannelMessagesArgs = {
  channelId: Scalars['String'];
};


export type QueryAllChannelsArgs = {
  teamId: Scalars['String'];
};


export type QueryAllTeamMembersArgs = {
  teamId: Scalars['String'];
};


export type QueryChannelArgs = {
  channelId: Scalars['String'];
};


export type QueryTeamArgs = {
  teamId: Scalars['String'];
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
  newChannelMessage: Message;
};


export type SubscriptionNewChannelMessageArgs = {
  channelId: Scalars['String'];
};

export type Team = EntityWrapper & {
  __typename?: 'Team';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  displayPicture?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  ownerId: Scalars['String'];
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

export type CreateMessageMutationVariables = Exact<{
  content: Scalars['String'];
  sourceType: MessageSourceType;
  creatorId: Scalars['String'];
  sourceChannelId: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: string };

export type FetchAllChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type FetchAllChannelMessagesQuery = { __typename?: 'Query', allChannelMessages: Array<{ __typename?: 'Message', id: string, content: string, creatorId: string, createdAt: any }> };

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


export type FetchChannelQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', name: string, description?: string | null | undefined, createdAt: any, adminId: string } };

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

export type FetchAllTeamMembersQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type FetchAllTeamMembersQuery = { __typename?: 'Query', allTeamMembers: Array<{ __typename?: 'TeamMember', id: string, user: { __typename?: 'User', id: string, email: string, username: string, profileImage?: string | null | undefined } }> };

export type NewChannelMessageSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type NewChannelMessageSubscription = { __typename?: 'Subscription', newChannelMessage: { __typename?: 'Message', id: string, content: string, creatorId: string, createdAt: any } };


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
export const CreateMessageDocument = gql`
    mutation CreateMessage($content: String!, $sourceType: MessageSourceType!, $creatorId: String!, $sourceChannelId: String!) {
  createMessage(
    content: $content
    sourceType: $sourceType
    creatorId: $creatorId
    sourceChannelId: $sourceChannelId
  )
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      sourceType: // value for 'sourceType'
 *      creatorId: // value for 'creatorId'
 *      sourceChannelId: // value for 'sourceChannelId'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const FetchAllChannelMessagesDocument = gql`
    query FetchAllChannelMessages($channelId: String!) {
  allChannelMessages(channelId: $channelId) {
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
    name
    description
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