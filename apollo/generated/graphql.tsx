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

export type Mutation = {
  __typename?: 'Mutation';
  editTeam: EditTeamResponse;
  login: UserResponse;
  registerAdmin: RegisterAdminResponse;
};


export type MutationEditTeamArgs = {
  channels?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  displayPicture?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  ownerId: Scalars['String'];
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
  getUsers: Array<Maybe<User>>;
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

export type Team = EntityWrapper & {
  __typename?: 'Team';
  createdAt: Scalars['DateTime'];
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
  role: Scalars['String'];
  status: Scalars['String'];
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TeamResponse = EntityWrapper & {
  __typename?: 'TeamResponse';
  createdAt: Scalars['DateTime'];
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

export type EditTeamMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  ownerId: Scalars['String'];
  channels?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  members?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type EditTeamMutation = { __typename?: 'Mutation', editTeam: { __typename?: 'EditTeamResponse', teamId: string, channels: Array<string> } };


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