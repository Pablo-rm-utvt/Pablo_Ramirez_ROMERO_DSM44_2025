import { useState, useEffect } from "react";
import { PokemonSimple } from "../interfaces/pokemonInterfaces";
import { pokeApi } from "../api/pokeApi";

interface UsePokemonDetail {
    estaCargandoPokemon: boolean;
    pokemon: PokemonSimple;
}

export const usePokemonDetail = (url: string): UsePokemonDetail => {

    const [estaCargandoPokemon, setEstaCargandoPokemon] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<PokemonSimple>({} as PokemonSimple);

    const cargarPokemon = async () => {
        setEstaCargandoPokemon(true);
        const response = await pokeApi.get<PokemonSimple>(url);
        setPokemon(response.data);
        setEstaCargandoPokemon(false);
    }

    useEffect(() => {
        cargarPokemon();
    }, []);

    return { estaCargandoPokemon, pokemon };
}