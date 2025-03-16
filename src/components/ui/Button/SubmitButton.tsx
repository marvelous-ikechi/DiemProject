import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {ReactNode, useMemo} from 'react';

import Text from '../Text/Text';

interface Props extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  backgroundColor?: 'primary' | 'secondary';
  textColor?: 'primary' | 'secondary';
  textSize?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const COLORS = {
  primary: 'blue',
  secondary: 'black',
  disabled: 'grey',
};

const SubmitButton: React.FC<Props> = ({
  text,
  onPress,
  backgroundColor = 'primary',
  textColor = 'primary',
  textSize,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  ...props
}) => {
  const buttonStyle = useMemo(
    () => [
      styles.button,
      {
        backgroundColor:
          COLORS[isLoading || disabled ? 'disabled' : backgroundColor],
      },
    ],
    [backgroundColor, isLoading, disabled],
  );

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {leftIcon}
          <Text color={textColor ?? 'white'} size={textSize}>
            {text}
          </Text>
          {rightIcon}
        </>
      )}
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
