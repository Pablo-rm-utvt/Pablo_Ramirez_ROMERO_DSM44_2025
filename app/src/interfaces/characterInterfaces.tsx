// models.ts

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string; 
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string; // la API devuelve un string tipo fecha
}

export interface CharactersResponse {
  info: Info;
  next: string;
   results: Character[];
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Genderless = "Genderless",
  Unknown = "unknown",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
