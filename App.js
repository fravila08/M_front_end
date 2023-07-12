import "react-native-gesture-handler";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile";
import { NewsFeed } from "./screens/NewsFeed";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { UserContext } from "./utilities";
import axios from "axios";
import { Header } from "./components/Header.js";
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("curr user", user)
  }, [user]);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser, axios }}>
        <Stack.Navigator
          screenOptions={{
            header:()=>(<Header />),
            // headerShown: false,
          }}
        >
          {user?
          <>
          <Stack.Screen name="Profile" component={UserProfile} />
          <Stack.Screen name="NewsFeed" component={NewsFeed} />
          <Stack.Screen name="Affirmations" component={Affirmations} /> 
          </>
          :
          <Stack.Screen name="SignUp" component={SignUp} />
          }
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
