import {Bell, CircleAlert} from 'lucide-react-native';

import React from 'react';
import {StyleSheet} from 'react-native';
import Text from 'src/components/ui/Text/Text';
import {ToastConfig} from 'react-native-toast-message';
import View from 'src/components/ui/View/View';
import {colors} from './colors';
import {size} from './size';

const toastConfig: ToastConfig | undefined = {
  genericToast: ({text1, text2}) => (
    <View style={styles.genericToastContainer}>
      <View row>
        <Bell size={20} color={colors.secondary} />
        <Text style={styles.text1}>{text1}</Text>
      </View>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  ),
  error: ({text1, text2}) => (
    <View style={styles.genericToastContainer}>
      <View row>
        <CircleAlert size={20} color={colors.secondary} />
        <Text style={styles.text1}>{text1}</Text>
      </View>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  genericToastContainer: {
    width: '90%',
    backgroundColor: colors.blue,
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 10,
    height: 70,
  },
  text1: {
    color: colors.secondary,
    fontSize: size.S,
    textAlign: 'center',
    marginLeft: 10,
  },
  text2: {
    color: colors.secondary,
    fontSize: size.XS,
    marginTop: 5,
  },
  errorToastContainer: {
    width: '90%',
    backgroundColor: colors.danger,
    alignItems: 'flex-start',
    padding: 10,
  },
});

export default toastConfig;
