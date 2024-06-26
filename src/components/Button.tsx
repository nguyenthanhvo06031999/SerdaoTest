import React from 'react';
import { StyleSheet, TouchableOpacity, TextStyle } from "react-native";
import Typography from "./Typography.tsx";

interface Props {
  title: string;
  onPress: () => void;
  style?: TextStyle;
  disabled?: boolean;
}

export const Button = (props: Props) => {
  const { title, onPress, style, disabled } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8} style={[styles.container, style, disabled && { backgroundColor: "#888"}]}>
      <Typography style={styles.title}>{title}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#82fb9e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#313131',
  }
});
