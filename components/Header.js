import { UserContext } from '../utilities';
import { logOut } from '../utilities';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';

export const Header = () => {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigation();

  return (
    <>
      {user ? (
        <View style={[styles.header]}>
          <TouchableOpacity
            onPress={() => navigate.navigate('Profile')}
          >
            <Image
              style={[styles.icon]}
              source={require('../assets/profile.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.navigate('MentorCircles')}
          >
            <Image
              style={[styles.icon]}
              source={require('../assets/circle.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.navigate('Messages')}
          >
            <Image
              style={[styles.icon]}
              source={require('../assets/messages.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.navigate('NewsFeed')}
          >
            <Image
              style={[styles.icon]}
              source={require('../assets/news.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => [setUser(await logOut())]}
          >
            <Text
              style={[styles.buttonText, styles.buttonOutlineText]}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={[styles.header, styles.headerWoUser]}>
          Welcome To
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#C0C0C0',
    paddingTop: '10%',
    paddingBottom: '3%',
    borderBottomWidth: 1,
  },
  headerWoUser: {
    justifyContent: 'center',
    fontWeight: '500',
    fontSize: 35,
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
