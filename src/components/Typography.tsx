import React, { FC, ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  style?: TextStyle;
  children: ReactNode;
}

const Typography: FC<TypographyProps> = ({ style, children, ...rest }) => {
  return (
    <Text style={[styles.container,{...style}]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins-Regular',
  },
});

export default Typography;
