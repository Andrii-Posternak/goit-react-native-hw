import { Button, View, Text } from "react-native";

export const PostsScreen = ({ navigation }) => {
  return (
    <View style={{ paddingVertical: 50, gap: 20 }}>
      <Text>Posts Screen</Text>
      <Button
        title="Go to the CommentsScreen"
        onPress={() => navigation.navigate("Comments")}
      />
      <Button
        title="Go to the MapScreen"
        onPress={() => navigation.navigate("Map")}
      />
    </View>
  );
};
