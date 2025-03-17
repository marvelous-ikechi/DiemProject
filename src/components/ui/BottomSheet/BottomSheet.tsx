import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';

import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {StyleSheet} from 'react-native';

const CustomBottomSheet = ({
  children,
  snapPoints,
  sheetRef,
  onClose,
}: {
  children: React.ReactNode;
  snapPoints: string[];
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  onClose: () => void;
}) => {
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  // Updated backdrop using Gorhom's `BottomSheetBackdrop`
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0} // Hide backdrop when fully closed
        appearsOnIndex={1} // Show when opening
        opacity={0.5} // Adjust transparency
        pressBehavior="close" // Tap outside to close sheet
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.container}
      backdropComponent={renderBackdrop}
      index={-1}
      onChange={handleSheetChange}>
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
});

export default CustomBottomSheet;
