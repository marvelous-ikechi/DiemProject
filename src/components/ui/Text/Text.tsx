import {Text as RNText, StyleSheet, TextProps, TextStyle} from 'react-native';

import {size as AppSize} from 'src/utils/size';
import React from 'react';

interface Props extends TextProps {
  bold?: boolean;
  medium?: boolean;
  size?: number;
  color?: 'primary' | 'secondary';
}

const Text: React.FC<Props> = ({
  style,
  bold,
  medium,
  size = AppSize.S,
  color,
  ...props
}) => {
  // determine font
  let fontFamily = 'Figtree-Regular';
  if (bold) {
    fontFamily = 'Figtree-Bold';
  } else if (medium) {
    fontFamily = 'Figtree-Medium';
  }

  // determine text color
  let textColor: string = '';
  switch (color) {
    case 'primary':
      textColor = 'black';
      break;
    case 'secondary':
      textColor = 'white';
      break;
  }

  return (
    <RNText
      {...props}
      style={[
        styles.text,
        {fontFamily, fontSize: size, color: textColor},
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
