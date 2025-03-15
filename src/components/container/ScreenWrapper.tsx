import React, {FunctionComponent, ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import View from '../ui/View/View';

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
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenWrapper;
