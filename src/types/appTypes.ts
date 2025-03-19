export type UserType = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
};

export type PokemonType = {
  name: string;
  url: string;
  sprites?: {
    front_default: string;
  };
  height?: number;
  weight?: number;
  base_experience?: number;
  abilities?: {
    ability: {
      name: string;
    };
  }[];
};
