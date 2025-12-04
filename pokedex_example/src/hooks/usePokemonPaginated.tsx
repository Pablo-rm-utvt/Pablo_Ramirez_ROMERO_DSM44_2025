import { useState, useEffect, useRef } from "react";
import { pokeApi } from "../api/pokeApi";
import { NewPokemonList, PokemonList, Result } from "../interfaces/pokemonInterfaces";

interface UsePokemonPaginated {
    estaCargando: boolean;
    cargarPokemons: () => void;
    listaSimplePokemon: NewPokemonList[];
}

export const usePokemonPaginated = (): UsePokemonPaginated => {

    const [estaCargando, setEstaCargando] = useState<boolean>(false);
    const [listaSimplePokemon, setListaSimplePokemon] = useState<NewPokemonList[]>([]);
    const urlSiguiente = useRef("https://pokeapi.co/api/v2/pokemon");

    const cargarPokemons = async () => {
        setEstaCargando(true);
        const respose = await pokeApi.get<PokemonList>(urlSiguiente.current);
        urlSiguiente.current = respose.data.next;
        mapearListaPokemon(respose.data.results)

    }

    const mapearListaPokemon = (PokemonList: Result[]) => {
        const newPokemonList: NewPokemonList[] = PokemonList.map(({ name, url }) => {
            const urlParts = url.split("/");
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
            return { name, id, picture, url };
        });

        setListaSimplePokemon((prevList) => [...prevList, ...newPokemonList]);

        setEstaCargando(false);
    }

    useEffect(() => {
        cargarPokemons();
    }, []);

    return { estaCargando, cargarPokemons, listaSimplePokemon };

}