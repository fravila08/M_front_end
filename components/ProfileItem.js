import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { alterAxios, evalElement } from "../utilities";

export const ProfileItem = ({ ele }) => {
  const [edit, setEdit] = useState(false);
  const [elemContent, setElemContent] = useState(ele.body);
  const [inputContent, setInputContent] = useState(ele.body);

  const updateProfileItem = async (newContent) => {
    const formattedAxios = await alterAxios();
    formattedAxios.put("users/profile/", evalElement(ele.title, newContent));
  };

  const evaluateUpdate = () => {
    if (isNaN(ele.body)) {
      if (elemContent !== inputContent) {
        setElemContent(inputContent);
        updateProfileItem(inputContent);
      } else {
        setInputContent(elemContent);
      }
    } else {
      if (!isNaN(parseFloat(inputContent)) && elemContent !== inputContent) {
        if (Number(inputContent) <= 20) {
          setElemContent(inputContent);
          updateProfileItem(inputContent);
        } else {
          setElemContent("20");
          setInputContent("20");
          updateProfileItem("20");
        }
      } else {
        setInputContent(elemContent);
        console.log("Wrong Input");
      }
    }
  };

  return (
    <>
      <View style={[styles.infoItem]}>
        <View style={[styles.header]}>
          {edit ? (
            <TouchableOpacity
              style={[styles.edit]}
              onPress={() => [setEdit(!edit), setInputContent(elemContent)]}
            >
              <Text>❌</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.edit]}
              onPress={() => setEdit(!edit)}
            >
              <Text>✏️</Text>
            </TouchableOpacity>
          )}
          <Text style={[styles.itemTitle]}>{`${ele.title}:`}</Text>
        </View>
        {edit ? (
          <View style={[styles.inputView]}>
            <TextInput
              placeholder={`${elemContent}`}
              multiline
              numberOfLines={ele.title === "bio" ? 10 : 1}
              maxLength={ele.title === "bio" ? 500 : 20}
              style={[styles.input]}
              value={`${inputContent}`}
              onChangeText={(text) => setInputContent(text)}
            />
            <TouchableOpacity
              onPress={() => [evaluateUpdate(), setEdit(!edit)]}
            >
              <Text>✅</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>{elemContent}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    margin: 10,
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: 14,
    textTransform: "capitalize",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
  },
  edit: {
    height: "auto",
    width: 17,
    marginRight: 10,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    width: "90%",
    marginRight: 5,
  },
  inputView: {
    flexDirection: "row",
  },
});
