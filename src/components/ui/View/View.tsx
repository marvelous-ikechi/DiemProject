import {View as RNView, StyleSheet, ViewProps} from 'react-native';

import React from 'react';

interface Props extends ViewProps {
  row?: boolean;
  column?: boolean;
}

const View: React.FC<Props> = ({style, row, column, ...props}) => {
  return (
    <RNView
      {...props}
      style={[style, row && styles.row, column && styles.column]}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  column: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default View;
