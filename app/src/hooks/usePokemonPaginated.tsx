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
        const respuesta = await pokeApi.get<PokemonList>(urlSiguiente.current);
        urlSiguiente.current = respuesta.data.next;
        mapearListaPokemon(respuesta.data.results)

    }

    const mapearListaPokemon = (listaPokemon: Result[]) => {
        const nuevoListaPokemon: NewPokemonList[] = listaPokemon.map(({ name, url }) => {
            const partesUrl = url.split("/");
            const id = partesUrl[partesUrl.length - 2];
            const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
            return { name, id, picture: imagen, url };
        });

        setListaSimplePokemon((listaAnterior) => [...listaAnterior, ...nuevoListaPokemon]);

        setEstaCargando(false);
    }

    useEffect(() => {
        cargarPokemons();
    }, []);

    return { estaCargando, cargarPokemons, listaSimplePokemon };

}