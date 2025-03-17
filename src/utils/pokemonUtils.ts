export const getPokemonImage = (pokemon: any) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    pokemon.url.split('/')[6]
  }.png`;
