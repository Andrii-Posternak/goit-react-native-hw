import { useEffect, useState } from "react";
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./CommentsScreenStyle";

export const CommentsScreen = ({ route }) => {
  const { photo } = route.params;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>

        <ScrollView style={styles.commentContainer}>
          <View style={styles.commentWrap}>
            <View style={styles.avatarWrap}>
              <Image
                style={styles.avatar}
                source={require("../../images/background.png")}
              />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.text}>comment text</Text>
              <Text style={styles.date}>date</Text>
            </View>
          </View>

          <View style={styles.commentWrap}>
            <View style={styles.userTextWrap}>
              <Text style={styles.text}>comment text</Text>
              <Text style={styles.userDate}>date</Text>
            </View>
            <View style={styles.userAvatarWrap}>
              <Image style={styles.avatar} source={{ uri: photo }} />
            </View>
          </View>

          <View style={styles.commentWrap}>
            <View style={styles.avatarWrap}>
              <Image
                style={styles.avatar}
                source={require("../../images/background.png")}
              />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.text}>comment text</Text>
              <Text style={styles.date}>date</Text>
            </View>
          </View>

          <View style={styles.commentWrap}>
            <View style={styles.userTextWrap}>
              <Text style={styles.text}>comment text</Text>
              <Text style={styles.userDate}>date</Text>
            </View>
            <View style={styles.userAvatarWrap}>
              <Image style={styles.avatar} source={{ uri: photo }} />
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.newComment}
              cursorColor="#212121"
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
              // value={comment}
              // onChangeText={(value) => setComment(value)}
              // onFocus={() => setIsInputCommentInFocus(true)}
              // onBlur={() => setIsInputCommentInFocus(false)}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              activeOpacity={0.5}
              onPress={() => console.log("send comment")}
            >
              <AntDesign name="arrowup" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
