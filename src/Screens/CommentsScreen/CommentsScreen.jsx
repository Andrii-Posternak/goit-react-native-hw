import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { selectUserAvatar, selectUserId } from "../../redux/auth/authSlice";
import { styles } from "./CommentsScreenStyle";
import { CommentListItem } from "../../components/CommentListItem/CommentListItem";

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);

  //input
  const [isInputCommentInFocus, setIsInputCommentInFocus] = useState(false);

  const { photo, postId } = route.params;
  const userAvatar = useSelector(selectUserAvatar);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      setAllComments(await getAllComment(postId));
    })();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     (async () => {
  //       setAllComments(await getAllComment(postId));
  //     })();
  //   }, [getDocs(collection(db, `posts/${postId}`, "comments"))])
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     getAllComment(postId);
  //   }, [])
  // );

  const uploadCommentToServer = async () => {
    try {
      const newComment = { postId, userId, userAvatar, comment };

      const docRef = await addDoc(
        collection(db, `posts/${newComment.postId}`, "comments"),
        { ...newComment, createdAt: serverTimestamp() }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // const getAllComment = async (postId) => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(db, `posts/${postId}`, "comments")
  //     );

  //     const comments = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       commentId: doc.id,
  //     }));

  //     setAllComments(comments);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const getAllComment = async (postId) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, `posts/${postId}`, "comments")
      );

      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
      }));

      return comments;
    } catch (error) {
      alert(error.message);
    }
  };

  const addComment = async () => {
    Keyboard.dismiss();
    setComment("");
    await uploadCommentToServer();
  };

  const countComment = () => {
    return allComments.length;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>

        <FlatList
          style={styles.commentContainer}
          data={allComments}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <CommentListItem item={item} userId={userId} />
          )}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputWrap}>
            <TextInput
              style={[
                styles.newComment,
                isInputCommentInFocus && styles.inFocus,
              ]}
              cursorColor="#212121"
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
              value={comment}
              onChangeText={(value) => setComment(value)}
              onFocus={() => setIsInputCommentInFocus(true)}
              onBlur={() => setIsInputCommentInFocus(false)}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              activeOpacity={0.5}
              onPress={addComment}
            >
              <AntDesign name="arrowup" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
