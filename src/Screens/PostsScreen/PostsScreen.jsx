import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import {
  selectUserAvatar,
  selectUserEmail,
  selectUserName,
} from "../../redux/auth/authSlice";
import { styles } from "./PostsScreenStyle";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const userAvatar = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoWrap}>
        <View style={styles.avatarWrap}>
          <Image style={styles.avatar} source={{ uri: userAvatar }} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
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
                  onPress={() =>
                    navigation.navigate("Comments", { photo: item.photo })
                  }
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
