import React, { useState } from 'react';

export const ChatAppContext = React.createContext({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});

export const ChatAppProvider = ({ children }) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();

  return (
    <ChatAppContext.Provider
      value={{ channel, setChannel, thread, setThread }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

export const useChatAppContext = () =>
  React.useContext(ChatAppContext);
