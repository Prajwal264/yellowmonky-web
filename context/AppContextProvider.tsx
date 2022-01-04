import React, { useState } from 'react';

export interface IAppContext {
  teamId: string | null;
  setTeamId: React.Dispatch<React.SetStateAction<string | null>>
  channelId: string | null;
  setChannelId: React.Dispatch<React.SetStateAction<string | null>>
}

const defaultContext = {
  teamId: null,
  setTeamId: () => { },
  channelId: null,
  setChannelId: () => { },
};
const AppContext = React.createContext<IAppContext>(defaultContext);

const AppContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [channelId, setChannelId] = useState<string | null>(null);
  return (
    <AppContext.Provider
      value={{
        teamId,
        setTeamId,
        channelId,
        setChannelId,
      }}
      {...props}
    />
  )
}

export { AppContext };

export default AppContextProvider;