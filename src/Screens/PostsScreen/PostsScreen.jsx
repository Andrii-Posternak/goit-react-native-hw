import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
import { db } from "../../firebase/config";
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

  // useEffect(() => {
  //   (async () => {
  //     setPosts(await getAllPost());
  //   })();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     (async () => {
  //       setPosts(await getAllPost());
  //     })();
  //   }, [])
  // );

  useFocusEffect(
    useCallback(() => {
      getAllPost();
    }, [getDocs(collection(db, "posts"))])
  );

  const getAllPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

      const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }));

      setPosts(posts);
    } catch (error) {
      alert(error.message);
    }
  };

  // const getAllPost = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "posts"));

  //     const posts = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       postId: doc.id,
  //     }));

  //     return posts;
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

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
              <Image style={styles.image} source={{ uri: item.photoUrl }} />
            </View>
            <Text style={styles.textDescription}>{item.description}</Text>
            <View style={styles.postInfoWrap}>
              <View style={styles.infoWrap}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      photo: item.photoUrl,
                      postId: item.postId,
                    })
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
