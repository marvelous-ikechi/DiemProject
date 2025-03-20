import {Text as RNText, StyleSheet, TextProps, TextStyle} from 'react-native';

import {size as AppSize} from 'src/utils/size';
import React from 'react';
import {colors} from 'src/utils/colors';

interface Props extends TextProps {
  bold?: boolean;
  medium?: boolean;
  size?: number;
  color?: string;
}

const Text: React.FC<Props> = ({
  style,
  bold,
  medium,
  size = AppSize.S,
  color = colors.primary,
  ...props
}) => {
  // determine font
  let fontFamily = 'Figtree-Regular';
  if (bold) {
    fontFamily = 'Figtree-Bold';
  } else if (medium) {
    fontFamily = 'Figtree-Medium';
  }

  return (
    <RNText
      {...props}
      style={[
        styles.text,
        {fontFamily, fontSize: size, color},
        style as TextStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: AppSize.S,
    marginVertical: 4,
  },
});

export default Text;
