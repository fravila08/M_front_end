import { useContext, useEffect, useState } from "react";
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
} from "react-native";
import { UserContext, alterAxios } from "../utilities";

export const Post = ({ ele, posts, setPosts }) => {
  const { user } = useContext(UserContext);

  const deleteAPost = async (id) => {
    const formattedAxios = await alterAxios();
    formattedAxios
      .delete(`users/posts/${id}/`)
      .then((resp) => {
        if (resp.status === 200) {
          console.log("good");
          const updatedData = posts.filter((post) => post.id !== id);
          setPosts(updatedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View key={ele.id} style={[styles.post]}>
      <View style={[styles.postHeader]}>
        <Text>Creted By: {ele.user}</Text>
        {user && ele.user_email === user.email ? (
          <TouchableOpacity onPress={() => deleteAPost(ele.id)}>
            <Text>🗑</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={[styles.postBody]}>
        <Text>{ele.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: "white",
    margin: 20,
    width: "90%",
    padding: 15,
    borderWidth: 2,
    borderRadius: 15,
  },
  postHeader: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  postBody: {
    paddingTop: 10,
  },
});
