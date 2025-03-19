import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import Text from 'src/components/ui/Text/Text';
import {colors} from 'src/utils/colors';
import {getPokemonImage} from 'src/utils/pokemonUtils';
import useStore from 'src/store/store';

type Props = NativeStackScreenProps<AppStackParamList, 'CaughtPokemons'>;

const CaughtPokemonList: FunctionComponent<Props> = ({navigation}) => {
  const {caughtPokemons} = useStore();

  const renderItem: ListRenderItem<any> = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PokemonDetails', {pokemon: item})}>
      <View style={styles.itemContent}>
        {item?.url && (
          <Image source={{uri: getPokemonImage(item)}} style={styles.image} />
        )}
        <Text>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScreenWrapper goBack>
      <FlatList
        data={caughtPokemons}
        renderItem={renderItem}
        keyExtractor={item => item?.name}
        style={styles.container}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.card,
  },
  image: {
    width: 100,
    height: 100,
  },
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CaughtPokemonList;
