import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";

const HomeTab = createBottomTabNavigator();

export const Home = () => {
  return (
    <HomeTab.Navigator initialRouteName="Posts">
      <HomeTab.Screen
        name="Posts"
        component={PostsScreen}
        // options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        // options={{ headerShown: false }}
      />
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </HomeTab.Navigator>
  );
};
