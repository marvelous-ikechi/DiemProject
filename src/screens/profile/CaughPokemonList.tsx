import React, {FunctionComponent} from 'react';

import ScreenWrapper from 'src/components/container/ScreenWrapper';
import Text from 'src/components/ui/Text/Text';
import {View} from 'react-native';

const CaughtPokemonList: FunctionComponent = () => {
  return (
    <ScreenWrapper>
      <View>
        <Text>Caught Pokemons</Text>
      </View>
    </ScreenWrapper>
  );
};

export default CaughtPokemonList;
