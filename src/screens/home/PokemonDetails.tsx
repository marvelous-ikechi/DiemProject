import {ActivityIndicator, Image, ScrollView, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';

import {AppStackParamList} from 'src/navigation/types/AppStackParamList';
import ErrorScreen from 'src/components/container/ErrorScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import Text from 'src/components/ui/Text/Text';
import View from 'src/components/ui/View/View';
import {apiClient} from 'src/api/apiClient';
import {colors} from 'src/utils/colors';
import {useQuery} from '@tanstack/react-query';

type Props = NativeStackScreenProps<AppStackParamList, 'PokemonDetails'>;

const PokemonDetails: FunctionComponent<Props> = ({route}) => {
  const {pokemon} = route.params;

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['pokemon', pokemon.url],
    queryFn: async () => {
      const response = await apiClient.get(pokemon.url);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.isLoadingViewStyle}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <ErrorScreen error={error.message} onRetry={refetch} />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper goBack>
      <View style={styles.container}>
        {/* Pokémon Name */}
        <Text style={styles.title}>{pokemon?.name?.toUpperCase()}</Text>

        {/* Pokémon Image */}
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          }}
          style={styles.image}
        />

        <ScrollView>
          {/* Basic Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Height: {data.height / 10} m</Text>
            <Text style={styles.detailText}>Weight: {data.weight / 10} kg</Text>
            <Text style={styles.detailText}>
              Base Experience: {data.base_experience}
            </Text>
          </View>

          {/* Types */}
          <View style={styles.section}>
            <Text style={styles.subtitle}>Types:</Text>
            <View style={styles.badgeContainer}>
              {data?.types?.map((typeObj: any) => (
                <View key={typeObj.type.name} style={styles.badge}>
                  <Text style={styles.badgeText}>{typeObj.type.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Abilities */}
          <View style={styles.section}>
            <Text style={styles.subtitle}>Abilities:</Text>
            <Text>
              {data?.abilities
                ?.map((abilityObj: any) => abilityObj.ability.name)
                .join(', ')}
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.section}>
            <Text style={styles.subtitle}>Stats:</Text>
            {data?.stats?.map((statObj: any) => (
              <Text key={statObj.stat.name}>
                {statObj.stat.name}: {statObj.base_stat}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
  },
  section: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.secondary,
    fontSize: 14,
  },
  isLoadingViewStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});

export default PokemonDetails;
