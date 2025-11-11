import { useState, useEffect } from "react";
import { PokemonSimple } from "../interfaces/pokemonInterfaces";
import { pokeApi } from "../api/pokeApi";

interface UsePokemonDetail {
    isLoadingPokemon: boolean;
    pokemon: PokemonSimple;
}

export const usePokemonDetail = (url: string): UsePokemonDetail => {

    const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<PokemonSimple>({} as PokemonSimple);

    const loadPokemon = async () => {
        setIsLoadingPokemon(true);
        const response = await pokeApi.get<PokemonSimple>(url);
        setPokemon(response.data);
        setIsLoadingPokemon(false);
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    return { isLoadingPokemon, pokemon };
}