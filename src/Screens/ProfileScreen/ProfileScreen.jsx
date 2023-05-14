import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  EvilIcons,
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { db } from "../../firebase/config";
import {
  selectUserAvatar,
  selectUserId,
  selectUserName,
} from "../../redux/auth/authSlice";
import { uploadAvatarToServer } from "../../api/uploadAvatarToServer";
import { AvatarForm } from "../../components/AvatarForm/AvatarForm";
import { styles } from "./ProfileScreenStyle";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userAvatar, setUserAvatar] = useState(useSelector(selectUserAvatar));

  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  useFocusEffect(
    useCallback(() => {
      console.log("useeffect profileScreen");
      getAllPost();
      // }, [getDocs(collection(db, "posts"))])
    }, [])
  );

  const getAllPost = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      // const querySnapshot = await getDocs(collection(db, "posts"));

      const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }));

      setPosts(posts);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      style={styles.bgnImage}
      source={require("../../images/background.png")}
    >
      {/* <ScrollView style={styles.scrollBox}> */}
      <View style={styles.screenContainer}>
        <AvatarForm userAvatar={userAvatar} setUserAvatar={setUserAvatar} />
        <Text style={styles.userName}>{userName}</Text>

        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.5}
          // onPress={logout}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>

        {!posts.length && (
          <Text style={styles.noPost}>You do not have posts yet!</Text>
        )}

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
                <View style={styles.socialWrap}>
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
                    <Text style={styles.textSocial}>{item.comments}</Text>
                  </View>

                  <View style={styles.infoWrap}>
                    <TouchableOpacity
                      style={styles.likeIcon}
                      onPress={() => alert("add like")}
                    >
                      <AntDesign name="like2" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                    <Text style={styles.textSocial}>{item.likes}</Text>
                  </View>
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
      {/* </ScrollView> */}
    </ImageBackground>
  );
};
