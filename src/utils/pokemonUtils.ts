import {PokemonType} from 'src/types/appTypes';

export const getPokemonImage = (pokemon: PokemonType) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    pokemon.url.split('/')[6]
  }.png`;
