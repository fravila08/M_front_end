import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useChatClient } from '../useChatClient';
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Thread,
  ChannelPreviewMessenger,
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from '../chatConfig';
import {
  ChatProvider,
  useChatContext,
} from '../contexts/ChatContext';

const CustomListItem = (props) => {
  const { unread } = props;
  const backgroundColor = unread ? '#8fcdea' : '#fff';
  return (
    <View style={{ backgroundColor }}>
      <ChannelPreviewMessenger {...props} />
    </View>
  );
};

const filters = {
  $or: [{ members: { $in: [chatUserId] } }, { type: 'livestream' }],
};

const sort = {
  last_message_at: -1,
};

export const ChatChannelList = ({ navigation }) => {
  const { setChannel } = useAppContext();
  return (
    <ChannelList
      Preview={CustomListItem}
      onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate('ChatChannel');
      }}
      filters={filters}
      sort={sort}
    />
  );
};
