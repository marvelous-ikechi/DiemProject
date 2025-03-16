import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import {StackNavigationProp} from '@react-navigation/stack';
import Text from 'src/components/ui/Text/Text';
import View from 'src/components/ui/View/View';
import {apiClient} from 'src/api/apiClient';
import {colors} from 'src/utils/colors';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<AppStackParamList, 'BottomTab'>;
const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation<Props>();
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
      <TouchableOpacity
        onPress={() => navigation.navigate('PokemonDetails', {pokemon: item})}>
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
      />
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
  },
});

export default HomeScreen;
