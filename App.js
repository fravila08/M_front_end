import 'react-native-gesture-handler';
import SignUp from './screens/SignUp';
import UserProfile from './screens/UserProfile';
import { NewsFeed } from './screens/NewsFeed';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { UserContext, chatTheme } from './utilities';
import axios from 'axios';
import { Header } from './components/Header.js';
import { ChatChannelList } from './screens/ChatChannelList';
import { ChatContext, ChatProvider } from './contexts/ChatContext';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from './chatConfig';
import { useChatClient } from './useChatClient';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { Text } from 'react-native';

const chatClient = StreamChat.getInstance(chatApiKey);
const Stack = createStackNavigator();

const ChatNavigationStack = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider value={{ theme: chatTheme }}>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChatChannelList"
            component={ChatChannelList}
          />
          <Stack.Screen name="ChatChannel" component={ChatChannel} />
          <Stack.Screen name="ChatThread" component={ChatThread} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('curr user', user);
  }, [user]);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser, axios }}>
        <ChatProvider>
          <Stack.Navigator
            screenOptions={{
              header: () => <Header />,
              // headerShown: false,
            }}
          >
            {user ? (
              <>
                <Stack.Screen
                  name="Profile"
                  component={UserProfile}
                />
                <Stack.Screen
                  name="MentorCircles"
                  component={ChatNavigationStack}
                />
                <Stack.Screen
                  name="Messages"
                  component={ChatNavigationStack}
                />
                <Stack.Screen name="NewsFeed" component={NewsFeed} />
              </>
            ) : (
              <Stack.Screen name="SignUp" component={SignUp} />
            )}
          </Stack.Navigator>
        </ChatProvider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
