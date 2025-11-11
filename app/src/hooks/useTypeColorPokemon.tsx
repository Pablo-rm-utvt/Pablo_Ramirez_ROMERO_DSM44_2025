import { useState, useEffect } from "react";
import { pokeApi } from "../api/pokeApi";
import { PokemonSimple, Type } from "../interfaces/pokemonInterfaces";

export interface TypePokemon {
    name: string;
    color: string;
}

interface UseTypeColorPokemon {
    isLoading: boolean;
    color: string[];
}

export const useTypeColorPokemon = (id: string | number): UseTypeColorPokemon => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string[]>([]);

    const tipo: TypePokemon[] = [
        { 'name': 'normal', 'color': '#A8A878' },
        { 'name': 'fighting', 'color': '#C03028' },
        { 'name': 'flying', 'color': '#A890F0' },
        { 'name': 'poison', 'color': '#A040A0' },
        { 'name': 'ground', 'color': '#E0C068' },
        { 'name': 'rock', 'color': '#B8A038' },
        { 'name': 'bug', 'color': '#A8B820' },
        { 'name': 'ghost', 'color': '#705898' },
        { 'name': 'steel', 'color': '#B8B8D0' },
        { 'name': 'fire', 'color': '#F08030' },
        { 'name': 'water', 'color': '#6890F0' },
        { 'name': 'grass', 'color': '#78C850' },
        { 'name': 'electric', 'color': '#F8D030' },
        { 'name': 'psychic', 'color': '#F85888' },
        { 'name': 'ice', 'color': '#98D8D8' },
        { 'name': 'dragon', 'color': '#7038F8' },
        { 'name': 'dark', 'color': '#705848' },
        { 'name': 'fairy', 'color': '#EE99AC' },
        { 'name': 'default', 'color': '#68A090' },
    ];

    const getColorType = async (pokemonType: Type[]) => {
        const newColorList: string[] = pokemonType.map(({ type }) => {
            const found = tipo.find((element) => element.name == type.name);
            return (found) ? found.color : "defaulColor";
        });
        setColor(newColorList);
    }

    const loadType = async () => {
        const respose = await pokeApi.get<PokemonSimple>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        getColorType(respose.data.types);
        setIsLoading(false);
    }

    useEffect(() => {
        loadType();
    }, []);

    return { isLoading, color };

}