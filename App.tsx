import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { Explore } from "./src/pages/Explore/Explore";
import { Chats } from "./src/pages/Chats/Chats";
import { Chat } from "./src/pages/Chat/Chat";
import { Authentication } from "./src/pages/Authentication/Authentication";
import { Profile } from "./src/pages/Profile/Profile"; // Add this
import { Likes } from "./src/pages/Likes/Likes";
import { RootStackParamList } from "./src/types/navigations";
import { ProfileSetup } from "./src/pages/ProfileSetup/ProfileSetup";
import { UserProvider } from "./src/context/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type MainTabParamList = {
  Explore: undefined;
  Chats: undefined;
  Profile: undefined;
  Likes: undefined;
};

// Create navigators
const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Bottom Tabs Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          height: 60,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;

          switch (route.name) {
            case "Explore":
              iconName = "compass";
              break;
            case "Chats":
              iconName = "comments";
              break;
            case "Profile":
              iconName = "user";
              break;
            case "Likes":
              iconName = "heart-o";
              break;
          }

          return (
            <FontAwesome
              name={iconName}
              size={24}
              color={focused ? "#FF6B6B" : "gray"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Likes" component={Likes} />
    </Tab.Navigator>
  );
};

// Main App Navigator
export default function App() {
  return (
    <>
      <GestureHandlerRootView>
        <StatusBar backgroundColor="lightcyan" barStyle="dark-content" />
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Authentication"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "lightcyan" },
              }}
            >
              <Stack.Screen name="Authentication" component={Authentication} />
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
              <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </GestureHandlerRootView>
    </>
  );
}
