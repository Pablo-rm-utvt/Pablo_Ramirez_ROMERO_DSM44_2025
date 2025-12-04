import { useState, useEffect, useRef, use } from "react";
import { apiRick } from "../api/apiRick";

import { Character, CharactersResponse } from "../interfaces/characterInterfaces";


interface UseCharactersPaginated {
    personajes: Character[];
    estaCargando: boolean;
    cargarPersonajes: () => void;
}


export const useCharactersPaginated = (): UseCharactersPaginated => {

    const [estaCargando, setEstaCargando] = useState(true);
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const urlSiguiente = useRef<string | null>('https://rickandmortyapi.com/api/character');


    const cargarPersonajes = async () => {
        if (!urlSiguiente.current) return;
        setEstaCargando(true);
        const respuesta = await apiRick.get<CharactersResponse>(urlSiguiente.current);
        urlSiguiente.current = respuesta.data.info.next;
        mapearListaPersonajes(respuesta.data.results);
    }


    const mapearListaPersonajes = (listaPersonajes: Character[]) => {
        const listaSimple = listaPersonajes.map(({ name, url }) => {
            const partesUrl = url.split('/');
            const id = partesUrl[partesUrl.length - 1];
            const imagen = `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;
            return { id, name, image: imagen };
        });

        setPersonajes(anterior => {
            const nuevosUnicos = listaPersonajes.filter(
                nuevo => !anterior.some(existente => existente.id === nuevo.id)
            );
            return [...anterior, ...nuevosUnicos];
        });
    };

    useEffect(() => {
        cargarPersonajes();
    }, []);

    return {
        personajes,
        estaCargando,
        cargarPersonajes

    };




}