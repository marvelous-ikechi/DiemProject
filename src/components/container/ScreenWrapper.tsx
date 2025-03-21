import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {FunctionComponent, ReactNode} from 'react';

import {MoveLeft} from 'lucide-react-native';
import View from '../ui/View/View';
import {colors} from 'src/utils/colors';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: ReactNode;
  center?: boolean;
  goBack?: boolean;
  testID?: string;
}

const ScreenWrapper: FunctionComponent<Props> = ({
  center,
  children,
  goBack,
  testID,
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, center && styles.center]} testID={testID}>
        {goBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MoveLeft size={24} color={colors.blue} />
          </TouchableOpacity>
        )}
        <View style={styles.children}>{children}</View>
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
  children: {
    flex: 1,
  },
});

export default ScreenWrapper;
