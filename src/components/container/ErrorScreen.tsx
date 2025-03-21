import React, {FunctionComponent} from 'react';

import {StyleSheet} from 'react-native';
import SubmitButton from '../ui/Button/SubmitButton';
import Text from '../ui/Text/Text';
import View from '../ui/View/View';
import {colors} from 'src/utils/colors';

type ErrorScreenProps = {
  error: string;
  onRetry: () => void;
};

const ErrorScreen: FunctionComponent<ErrorScreenProps> = ({error, onRetry}) => {
  return (
    <View style={styles.container}>
      <Text>An error occurred</Text>
      <Text color={colors.danger}>{error}</Text>
      <SubmitButton
        textColor={colors.secondary}
        text="Retry"
        onPress={onRetry}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    width: '50%',
  },
});

export default ErrorScreen;
