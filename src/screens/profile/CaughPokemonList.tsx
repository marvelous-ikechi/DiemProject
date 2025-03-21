import Animated, {
  FadeIn,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
import {CircleX} from 'lucide-react-native';
import {PokemonType} from 'src/types/appTypes';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import Text from 'src/components/ui/Text/Text';
import {colors} from 'src/utils/colors';
import {getPokemonImage} from 'src/utils/pokemonUtils';
import {useNavigation} from '@react-navigation/native';
import useStore from 'src/store/store';

type Props = NativeStackScreenProps<AppStackParamList, 'CaughtPokemons'>;

const CaughtPokemonList: FunctionComponent<Props> = () => {
  const {caughtPokemons} = useStore();

  return (
    <ScreenWrapper goBack>
      <Text style={styles.title}>Caught Pokemons</Text>
      <FlatList
        data={caughtPokemons}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={item => item?.name}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text color={colors.disabled} style={styles.emptyText}>
              No caught pokemons yet.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

// separate renderItem component from the CaughtPokemonList to allow for individual animation
const RenderItem: FunctionComponent<{item: PokemonType}> = ({item}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppStackParamList, 'CaughtPokemons'>
    >();
  const {releasePokemon} = useStore();
  const translateX = useSharedValue(0);

  const onLongPress = () => {
    if (translateX.value > 150) {
      translateX.value = withSpring(-120);
    } else {
      translateX.value = withSpring(translateX.value + 20);
    }
  };
  return (
    <View style={styles.item}>
      <CircleX
        style={styles.closeCircle}
        color={colors.danger}
        onPress={() => releasePokemon(item?.name)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('PokemonDetails', {pokemon: item})}
        onLongPress={onLongPress}>
        <Animated.View
          style={{transform: [{translateX: translateX}]}}
          entering={FadeIn}>
          <View style={styles.itemContent}>
            {item?.url ? (
              <Image
                source={{uri: getPokemonImage(item)}}
                style={styles.image}
              />
            ) : null}
            <Text>{item?.name}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 16,
    textAlign: 'center',
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
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeCircle: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default CaughtPokemonList;
