import React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "./Button.tsx";
import Typography from "./Typography.tsx";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  hideRightButton?: boolean;
  onPress?: () => void;
  hasBackIcon?: boolean;
}

export const Header = (props: Props) => {
  const { title, hideRightButton, onPress, hasBackIcon } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        {
          hasBackIcon && <TouchableOpacity onPress={() => {
            navigation.goBack();
          }} activeOpacity={0.8} style={styles.backButton}>
            <Typography style={styles.title}>
              {"<"}
            </Typography>
          </TouchableOpacity>
        }
        <View style={[hasBackIcon && {marginLeft: 8}]}>
          <Typography style={styles.title}>
            {title}
          </Typography>
        </View>
      </View>
      {
        !hideRightButton && <Button onPress={() => {
          onPress && onPress()
        }} title="+ Create Beneficiary" />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#82fb9e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#313131',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
