import { useState, useEffect, useRef } from "react";
import { pokeApi } from "../api/pokeApi";
import { NewPokemonList, PokemonList, Result } from "../interfaces/pokemonInterfaces";

interface UsePokemonPaginated {
    isLoading: boolean;
    loadPokemons: () => void;
    simplePokemonList: NewPokemonList[];
}

export const usePokemonPaginated = (): UsePokemonPaginated => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [simplePokemonList, setSimplePokemonList] = useState<NewPokemonList[]>([]);
    const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon");

    const loadPokemons = async () => {
        setIsLoading(true);
        const respose = await pokeApi.get<PokemonList>(nextPageUrl.current);
        nextPageUrl.current = respose.data.next;
        mapPokemonList(respose.data.results)

    }

    const mapPokemonList = (PokemonList: Result[]) => {
        const newPokemonList: NewPokemonList[] = PokemonList.map(({ name, url }) => {
            //https://pokeapi.co/api/v2/pokemon/1/
            const urlParts = url.split("/");
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
            return { name, id, picture, url };
        });

        setSimplePokemonList((prevList) => [...prevList, ...newPokemonList]);

        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemons();
    }, []);

    return { isLoading, loadPokemons, simplePokemonList };

}