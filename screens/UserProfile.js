import { useEffect, useState, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { UserContext, alterAxios } from "../utilities";
import { ProfileItem } from "../components/ProfileItem";

const UserProfile = () => {
  const [profile, setProfile] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getProfile = async () => {
      const formattedAxios = await alterAxios();
      formattedAxios
        .get("users/profile/")
        .then((resp) => {
          setProfile(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProfile();
  }, []);

  return (
    <ScrollView style={[styles.container]}>
      <Text style={[styles.greeting]}>
        Welcome{" "}
        {user ? (user.name === "Unknown" ? user.email : user.name) : null}
      </Text>
      <View style={[styles.profileHolder]}>
        <View style={[styles.profile]}>
          <Image
            style={[styles.userProfilePicture]}
            source={require("../assets/logo.png")}
          />
          <View style={[styles.userInfo]}>
            {profile.map((ele, idx) => (
              <>
                {ele.title !== "bio" ? (
                  <ProfileItem ele={ele} key={idx} />
                ) : null}
              </>
            ))}
          </View>
        </View>
        {profile.map((ele, idx) => (
          <>
            {ele.title === "bio" ? <ProfileItem ele={ele} key={idx} /> : null}
          </>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    paddingTop: "8%",
  },
  greeting: {
    fontSize: "20",
    fontWeight: "500",
    textAlign: "center",
  },
  profileHolder: {
    // borderTopWidth:1,
    paddingTop: 10,
    marginTop: 10,
    flex: 4,
    flexDirection: "column",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  userProfilePicture: {
    height: 135,
    width: 135,
    borderWidth: 3,
    borderColor: "black",
  },
  userInfo: {
    width: 120,
    justifyContent: "space-around",
  },
  edit: {
    flexDirection: "row-reverse",
  },
  editButton: {
    borderWidth: 2,
    height: 30,
    width: 60,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfile;
