import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import {CirclePlus, Eye} from 'lucide-react-native';
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';

import {AppStackParamList} from 'src/navigation/types/AppStackParamList';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBottomSheet from 'src/components/ui/BottomSheet/BottomSheet';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import {StackNavigationProp} from '@react-navigation/stack';
import SubmitButton from 'src/components/ui/Button/SubmitButton';
import Text from 'src/components/ui/Text/Text';
import View from 'src/components/ui/View/View';
import {apiClient} from 'src/api/apiClient';
import {colors} from 'src/utils/colors';
import {getPokemonImage} from 'src/utils/pokemonUtils';
import {size} from 'src/utils/size';
import {useNavigation} from '@react-navigation/native';
import usePushNotifications from 'src/hooks/usePushNotifications';
import useStore from 'src/store/store';

type Props = StackNavigationProp<AppStackParamList, 'BottomTab'>;

type PokemonModalType = 'caught' | 'escaped' | 'alreadyCaught';

type PokemonModalProps = {
  visible: boolean;
  type: PokemonModalType | null;
  pokemon: any;
  onClose: () => void;
};

const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation<Props>();
  const queryClient = useQueryClient();
  const sheetRef = useRef<BottomSheetMethods | null>(null);

  const {initializeFirebase} = usePushNotifications();
  useEffect(() => {
    initializeFirebase();
  }, [initializeFirebase]);

  const [state, setState] = useState({
    selectedPokemon: null as any,
    activePokemon: null as any,
    modalType: null as PokemonModalType | null,
  });

  const {caughtPokemons, addCaughtPokemon, releasePokemon} = useStore();

  const fetchPokemonPreview = async (pokemon: any) => {
    const response = await apiClient.get(pokemon.url);
    return response.data;
  };

  const handleFetchPokemon = async (pokemon: any) => {
    if (!pokemon) {
      return;
    }

    const data = await queryClient.ensureQueryData({
      queryKey: ['pokemon-details', pokemon.name],
      queryFn: () => fetchPokemonPreview(pokemon),
      revalidateIfStale: true,
    });

    setState(prev => ({...prev, selectedPokemon: data}));
    sheetRef.current?.snapToIndex(1);
  };

  const catchPokemon = (pokemon: any) => {
    if (caughtPokemons.some(p => p?.name === pokemon?.name)) {
      setState(prev => ({
        ...prev,
        modalType: 'alreadyCaught',
        activePokemon: pokemon,
      }));
      return;
    }

    const success = Math.random() < 0.5;
    setState(prev => ({
      ...prev,
      activePokemon: pokemon,
      modalType: success ? 'caught' : 'escaped',
    }));

    if (success) {
      addCaughtPokemon(pokemon);
    }
  };

  const {data, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      initialPageParam: 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
      queryFn: async ({pageParam}) => {
        const response = await apiClient.get(pageParam);
        return response.data ?? [];
      },
      getNextPageParam: lastPage => lastPage?.next ?? undefined,
    });

  const pokemonList = useMemo(
    () => data?.pages?.flatMap(page => page.results) ?? [],
    [data],
  );

  const renderItem: ListRenderItem<any> = ({item}) => (
    <TouchableOpacity onPress={() => handleFetchPokemon(item)}>
      <View row style={styles.itemContainer}>
        <Image source={{uri: getPokemonImage(item)}} style={styles.image} />
        <Text>{item.name}</Text>
      </View>
      <View row style={styles.buttonContainer}>
        <SubmitButton
          text="Catch Pokemon"
          onPress={() => catchPokemon(item)}
          textColor="secondary"
          style={styles.button}
          textSize={size.XS}
          rightIcon={<CirclePlus color={colors.secondary} size={20} />}
        />
        <SubmitButton
          text="View Pokemon"
          onPress={() => navigation.navigate('PokemonDetails', {pokemon: item})}
          textColor="secondary"
          style={styles.button}
          textSize={size.XS}
          rightIcon={<Eye color={colors.secondary} size={20} />}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>No Pokémon found</Text>}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              style={styles.activityIndicator}
              color={colors.blue}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Modals */}
      <Portal>
        <PokemonModal
          visible={!!state.modalType}
          type={state.modalType}
          pokemon={state.activePokemon}
          onClose={() => {
            if (state.modalType === 'alreadyCaught') {
              releasePokemon(state.activePokemon?.name);
            }
            setState(prev => ({...prev, modalType: null}));
          }}
        />
      </Portal>

      {/* Bottom Sheet */}
      <CustomBottomSheet
        sheetRef={sheetRef}
        snapPoints={['25%', '50%']}
        onClose={() => sheetRef.current?.close()}>
        {state.selectedPokemon && (
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.bottomSheetText}>
              {state.selectedPokemon.name}
            </Text>
            <Image
              source={{uri: state.selectedPokemon.sprites.front_default}}
              style={styles.image}
            />
            <Text>Height: {state.selectedPokemon.height / 10} m</Text>
            <Text>Weight: {state.selectedPokemon.weight / 10} kg</Text>
            <Text>
              Base Experience: {state.selectedPokemon.base_experience}
            </Text>
            <Text>Abilities:</Text>
            <View row style={styles.abilitiesContainer}>
              {state.selectedPokemon.abilities.map((ability: any) => (
                <View
                  style={styles.abilityContainer}
                  key={ability.ability.name}>
                  <Text color="secondary">{ability.ability.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </CustomBottomSheet>
    </ScreenWrapper>
  );
};

const PokemonModal = ({visible, type, pokemon, onClose}: PokemonModalProps) => {
  if (!type) {
    return null;
  }
  const messages: Record<string, string> = {
    caught: `${pokemon?.name} has been caught!`,
    escaped: `Oh no! ${pokemon?.name} escaped! Try again.`,
    alreadyCaught: `You already caught ${pokemon?.name}!`,
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      <Text style={styles.modalText}>
        {type === 'caught' ? 'Success!' : 'Oops!'}
      </Text>
      <Text>{messages[type]}</Text>
      <Image source={{uri: getPokemonImage(pokemon)}} style={styles.image} />
      <Button onPress={onClose}>
        {type === 'alreadyCaught' ? 'Release Pokemon' : 'Close'}
      </Button>
    </Modal>
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
  },
  button: {
    width: 140,
    backgroundColor: colors.blue,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginTop: 40,
  },
});

export default HomeScreen;
