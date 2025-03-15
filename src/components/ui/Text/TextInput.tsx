import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import React from 'react';
import Text from './Text';
import View from '../View/View';
import {size} from 'src/utils/size';

interface Props extends TextInputProps {
  label: string;
}

const TextInput: React.FC<Props> = ({label, ...props}) => {
  return (
    <View style={styles.container}>
      <Text size={size.S}>{label}</Text>
      <RNTextInput {...props} style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Figtree-Regular',
    fontSize: size.S,
  },
});

export default TextInput;
