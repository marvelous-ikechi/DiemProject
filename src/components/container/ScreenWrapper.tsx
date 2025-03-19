import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import React, {FunctionComponent, ReactNode} from 'react';

import View from '../ui/View/View';
import {colors} from 'src/utils/colors';

interface Props {
  children: ReactNode;
  center?: boolean;
}

const ScreenWrapper: FunctionComponent<Props> = ({center, children}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, center && styles.center]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 15,
    flex: 1,
    backgroundColor: colors.secondary,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenWrapper;
