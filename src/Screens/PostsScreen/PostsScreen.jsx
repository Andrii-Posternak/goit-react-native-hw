import { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import { styles } from "./PostsScreenStyle";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Button
        title="Go to the CommentsScreen"
        onPress={() => navigation.navigate("Comments")}
      />
      <Button
        title="Go to the MapScreen"
        onPress={() => navigation.navigate("Map")}
      />

      <View style={styles.userInfoWrap}>
        <View style={styles.avatarWrap}>
          <Image
            style={styles.avatar}
            source={require("../../images/background.png")}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.userEmail}>User Email</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.imageWrap}>
              <Image style={styles.image} source={{ uri: item.photo }} />
            </View>
            <Text style={styles.textDescription}>{item.description}</Text>
            <View style={styles.postInfoWrap}>
              <View style={styles.infoWrap}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments")}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.textComment}>0</Text>
              </View>
              <View style={styles.infoWrap}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      description: item.description,
                      location: item.location,
                    })
                  }
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
                <Text style={styles.textLocation}>{item.location.name}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
