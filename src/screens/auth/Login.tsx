import React, {FunctionComponent} from 'react';

import GoogleIcon from 'src/assets/Icons/GoogleIcon';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import {StyleSheet} from 'react-native';
import SubmitButton from 'src/components/ui/Button/SubmitButton';
import Text from 'src/components/ui/Text/Text';
import TextInput from 'src/components/ui/Text/TextInput';
import View from 'src/components/ui/View/View';
import {size} from 'src/utils/size';

const Login: FunctionComponent = () => {
  return (
    <ScreenWrapper>
      <Text bold size={size.XL}>
        Login
      </Text>
      <Text medium size={size.S}>
        Welcome back
      </Text>
      <View style={styles.inputFieldsContainer}>
        <TextInput label="Email Address" />
        <TextInput label="Password" />
        <SubmitButton text="Login" onPress={() => {}} textColor="secondary" />
        <SubmitButton
          text="Sign up with google"
          onPress={() => {}}
          textColor="secondary"
          backgroundColor="secondary"
          leftIcon={<GoogleIcon style={styles.iconStyle} />}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  inputFieldsContainer: {
    marginTop: 40,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default Login;
