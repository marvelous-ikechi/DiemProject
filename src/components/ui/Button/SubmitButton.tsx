import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from '../Text/Text';

interface Props {
  text: string;
  onPress: () => void;
  backgroundColor?: 'primary' | 'secondary';
  textColor?: 'primary' | 'secondary';
  textSize?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const COLORS = {
  primary: 'blue',
  secondary: 'black',
};

const SubmitButton: React.FC<Props> = ({
  text,
  onPress,
  backgroundColor = 'primary',
  textColor,
  textSize,
  leftIcon,
  rightIcon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: COLORS[backgroundColor]}]}
      onPress={onPress}
      activeOpacity={0.7}>
      {leftIcon}
      <Text color={textColor} size={textSize}>
        {text}
      </Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});

export default SubmitButton;
