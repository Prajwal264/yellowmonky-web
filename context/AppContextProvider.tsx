import React, { useState } from 'react';

export interface IAppContext {
  teamId: string | null;
  setTeamId: React.Dispatch<React.SetStateAction<string | null>>
  recipientId: string | null;
  setRecipientId: React.Dispatch<React.SetStateAction<string | null>>
  recipientType: RecipientType,
  setRecipientType: React.Dispatch<React.SetStateAction<RecipientType>>
}

export enum RecipientType {
  CHANNEL = 'CHANNEL',
  DIRECT_MESSAGE = 'DIRECT_MESSAGE'
}

const defaultContext = {
  teamId: null,
  setTeamId: () => { },
  recipientId: null,
  setRecipientId: () => { },
  recipientType: RecipientType.CHANNEL,
  setRecipientType: () => { },
};
const AppContext = React.createContext<IAppContext>(defaultContext);

const AppContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [recipientType, setRecipientType] = useState<RecipientType>(RecipientType.CHANNEL);
  return (
    <AppContext.Provider
      value={{
        teamId,
        setTeamId,
        recipientId,
        setRecipientId,
        recipientType,
        setRecipientType,
      }}
      {...props}
    />
  )
}

export { AppContext };

export default AppContextProvider;