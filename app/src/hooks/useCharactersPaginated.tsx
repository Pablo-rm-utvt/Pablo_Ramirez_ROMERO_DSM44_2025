import { useState, useEffect, useRef, use } from "react";
import { apiRick } from "../api/apiRick";

import { Character, CharactersResponse } from "../interfaces/characterInterfaces";


interface UseCharactersPaginated {
    characters: Character[];
    isLoading: boolean;
    loadCharacters: () => void;
}


export const useCharactersPaginated = (): UseCharactersPaginated => {

    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState<Character[]>([]);
    const nextPageUrl = useRef<string | null>('https://rickandmortyapi.com/api/character');


    const loadCharacters = async () => {
        if (!nextPageUrl.current) return;
        setIsLoading(true);
        const resp = await apiRick.get<CharactersResponse>(nextPageUrl.current);
        console.log("API response:", resp.data);
        nextPageUrl.current = resp.data.info.next;
        mapCharactersList(resp.data.results);
        console.log("Next page URL:", nextPageUrl.current);
    }


    const mapCharactersList = (CharacterList: Character[]) => {
        const simpleList = CharacterList.map(({ name, url }) => {
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            const image = `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;
            return { id, name, image };
        });

        setCharacters(prev => {
            const nuevosUnicos = CharacterList.filter(
                nuevo => !prev.some(existente => existente.id === nuevo.id)
            );
            return [...prev, ...nuevosUnicos];
        });
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    return {
        characters,
        isLoading,
        loadCharacters

    };




}