import { useState } from "react";
import { styles } from "./AvatarFormStyle";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const AvatarForm = () => {
  const [avatarExist, setAvatarExist] = useState(false);

  return (
    <View style={styles.avatarBox}>
      <Image
        style={styles.avatarImage}
        source={require("../../images/background.png")}
        alt="avatar"
      />
      <TouchableOpacity
        style={[
          styles.avatarBtnWrap,
          avatarExist && styles.avatarBtnWrapActive,
        ]}
        activeOpacity={0.8}
        onPress={() => setAvatarExist(!avatarExist)}
      >
        <Text style={[styles.avatarBtn, avatarExist && styles.avatarBtnActive]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};
