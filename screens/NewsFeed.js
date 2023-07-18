import { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { UserContext, alterAxios } from '../utilities';
import { Post } from '../components/Post';

export const NewsFeed = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const formattedAxios = await alterAxios();
    formattedAxios
      .get('users/posts/')
      .then((resp) => {
        setPosts(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setPosts([]);
      });
  };

  const createAPost = async () => {
    const formattedAxios = await alterAxios();
    formattedAxios
      .post('users/posts/', {
        content: newPost,
      })
      .then((resp) => {
        console.log(resp.data);
        getAllPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ScrollView style={[styles.container]}>
      <View>
        <Text style={[styles.header]}>NewsFeed</Text>
      </View>
      <View style={[styles.inputHolder]}>
        <TextInput
          style={[styles.input]}
          value={newPost}
          placeholder="What's on your mind?"
          onChangeText={(text) => setNewPost(text)}
          multiline
          numberOfLines={30}
        />
        <TouchableOpacity
          style={[styles.buttonText]}
          onPress={() => [createAPost(), setNewPost('')]}
        >
          <Text>✅</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNewPost('')}
          style={[styles.buttonText, styles.buttonCancel]}
        >
          <Text>🛑</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.postHolder]}>
        {posts.map((ele, i) => (
          <Post key={i} ele={ele} posts={posts} setPosts={setPosts} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
  },
  header: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 30,
    textDecorationLine: 'underline',
  },
  inputHolder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
  },
  input: {
    width: '99%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    paddingRight: 32,
  },
  buttonText: {
    position: 'absolute',
    right: 13,
    top: 5,
  },
  buttonCancel: {
    top: 27,
  },
  postHolder: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
});
// padding:25,
