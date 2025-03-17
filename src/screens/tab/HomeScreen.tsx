import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CirclePlus, Eye, Settings} from 'lucide-react-native';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBottomSheet from 'src/components/ui/BottomSheet/BottomSheet';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import {StackNavigationProp} from '@react-navigation/stack';
import SubmitButton from 'src/components/ui/Button/SubmitButton';
import Text from 'src/components/ui/Text/Text';
import View from 'src/components/ui/View/View';
import {apiClient} from 'src/api/apiClient';
import {colors} from 'src/utils/colors';
import {size} from 'src/utils/size';
import {useNavigation} from '@react-navigation/native';
import useStore from 'src/store/store';

type Props = StackNavigationProp<AppStackParamList, 'BottomTab'>;
const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation<Props>();
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const addCaughtPokemon = useStore(state => state.addCaughtPokemon);
  const fetchPokemonPreview = async (pokemon: any) => {
    const response = await apiClient.get(pokemon.url);
    return response.data;
  };

  const queryClient = useQueryClient();

  const handleFetchPokemon = async (pokemon: any) => {
    if (!pokemon) {
      return;
    }

    const data = await queryClient.ensureQueryData({
      queryKey: ['pokemon-details', pokemon.name],
      queryFn: () => fetchPokemonPreview(pokemon),
      revalidateIfStale: true,
    });

    console.log('data', data);
    setSelectedPokemon(data);
    handleSnapPress(1);
  };

  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const sheetRef = useRef<BottomSheetMethods | null>(null);

  const catchPokemon = (pokemon: any) => {
    const success = Math.random() < 0.5; // 50% chance to catch
    if (success) {
      addCaughtPokemon((prev: any) => [...prev, pokemon]);
      Alert.alert('Success!', `${pokemon.name} has been caught!`);
    } else {
      Alert.alert('Oh no!', `${pokemon.name} escaped! Try again.`);
    }
  };

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(index);
    } else {
      console.warn('BottomSheet ref is not set yet');
    }
  }, []);

  const {data, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      initialPageParam: 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
      queryFn: async ({
        pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
      }) => {
        const response = await apiClient.get(pageParam);
        if (!response?.data) {
          throw new Error('Invalid API response');
        }
        return response.data;
      },
      getNextPageParam: lastPage => lastPage?.next ?? undefined,
    });

  const pokemonList = data?.pages?.flatMap(page => page.results) ?? [];

  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleFetchPokemon(item)}>
        <View row style={styles.itemContainer}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                item.url.split('/')[6]
              }.png`,
            }}
            style={styles.image}
          />
          <Text>{item.name}</Text>
        </View>
        <View row style={styles.buttonContainer}>
          <SubmitButton
            text="Catch Pokemon"
            onPress={() => catchPokemon(item)}
            textColor="secondary"
            style={styles.button}
            textSize={size.XS}
            rightIcon={
              <CirclePlus
                color={colors.secondary}
                size={20}
                style={styles.iconStyle}
              />
            }
          />
          <SubmitButton
            text="Settings"
            onPress={() =>
              navigation.navigate('PokemonDetails', {pokemon: item})
            }
            textColor="secondary"
            style={styles.button}
            textSize={size.XS}
            rightIcon={
              <Settings
                color={colors.secondary}
                size={20}
                style={styles.iconStyle}
              />
            }
          />
          <SubmitButton
            text="View Pokemon"
            onPress={() =>
              navigation.navigate('PokemonDetails', {pokemon: item})
            }
            textColor="secondary"
            style={styles.button}
            textSize={size.XS}
            rightIcon={
              <Eye
                color={colors.secondary}
                size={20}
                style={styles.iconStyle}
              />
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>No Pokémon found</Text>}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color={colors.blue} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
      <CustomBottomSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        onClose={handleClosePress}>
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.bottomSheetText}>{selectedPokemon?.name}</Text>
          <Image
            source={{
              uri: selectedPokemon?.sprites?.front_default,
            }}
            style={styles.image}
          />
          <Text>Height: {selectedPokemon?.height / 10} m</Text>
          <Text>Weight: {selectedPokemon?.weight / 10} kg</Text>
          <Text>Base Experience: {selectedPokemon?.base_experience}</Text>
          <Text>Abilities:</Text>
          <View row style={styles.abilitiesContainer}>
            {selectedPokemon?.abilities?.map((ability: any) => (
              <View style={styles.abilityContainer} key={ability.ability.name}>
                <Text color={'secondary'}>{ability.ability.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </CustomBottomSheet>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  itemContainer: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: 120,
    backgroundColor: colors.blue,
  },
  buttonContainer: {
    gap: 10,
  },
  iconStyle: {
    marginLeft: 7,
  },
  bottomSheetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  abilitiesContainer: {
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  abilityContainer: {
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 10,
  },
});

export default HomeScreen;
