import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PokemonSimple } from '../interfaces/pokemonInterfaces';
import { TypePokemon } from '../hooks/useTypeColorPokemon';

interface Props {
    pokemon: PokemonSimple;
}

export const PokemonDetail = ({ pokemon }: Props) => {

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

    const findColorType = (name: string) => {
        const type = tipo.find(element => element.name === name);
        return type?.color || "#68A090";
    };

    return (
        <ScrollView style={styles.container}>

            {/* Type(s) */}
            <Text style={styles.title}>Type(s)</Text>
            <View style={styles.typeContainer}>
                {
                    pokemon.types?.map(({ type }) => (
                        <Text
                            key={type.name}
                            style={{
                                ...styles.typeText,
                                backgroundColor: findColorType(type.name),
                            }}
                        >
                            {type.name}
                        </Text>
                    ))
                }
            </View>

            {/* Weight */}
            <Text style={styles.title}>Weight</Text>
            <Text style={styles.value}>
                {pokemon.weight ? pokemon.weight + " lb" : "N/A"}
            </Text>

            {/* Sprites */}
            <Text style={styles.title}>Sprites</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.spritesScroll}
            >
                {
                    pokemon.sprites && (
                        <View style={{ flexDirection: "row" }}>
                            {pokemon.sprites.front_shiny && (
                                <Image style={styles.sprite} source={{ uri: pokemon.sprites.front_shiny }} />
                            )}
                            {pokemon.sprites.back_shiny && (
                                <Image style={styles.sprite} source={{ uri: pokemon.sprites.back_shiny }} />
                            )}
                            {pokemon.sprites.back_default && (
                                <Image style={styles.sprite} source={{ uri: pokemon.sprites.back_default }} />
                            )}
                            {pokemon.sprites.front_default && (
                                <Image style={styles.sprite} source={{ uri: pokemon.sprites.front_default }} />
                            )}
                            {pokemon.sprites.front_female && (
                                <Image style={styles.sprite} source={{ uri: pokemon.sprites.front_female }} />
                            )}
                            {pokemon.sprites.back_female && (
                                <Image style={styles.sprite} source={{ uri: pokemon.sprites.back_female }} />
                            )}
                        </View>
                    )
                }
            </ScrollView>

            {/* Moves (ataques) */}
            <Text style={styles.title}>Moves</Text>
            <View style={
                styles.movesContainer
            }>
                {
                    pokemon.moves?.slice(0, 20).map(({ move }) => ( // mostramos solo 20 para no saturar
                        <Text key={move.name} style={{
                            ...styles.moveText,
                            color: findColorType(pokemon.types[0].type.name),
                        }}>
                            {move.name}
                        </Text>
                    ))
                }
            </View>

            <Text style={styles.title}>
                Abilities
            </Text>
            <View>
                {pokemon.abilities?.map(({ ability }) => (
                    <Text key={ability?.name} style={{
                        ...styles.container,
                        backgroundColor: findColorType(pokemon.types[0].type.name),
                        width: 150,
                        justifyContent: "space-evenly",
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        marginBottom: 5,
                        marginTop: 5,
                        borderRadius: 10,
                        padding: 5,
                    }}>
                        {ability?.name}
                    </Text>
                ))}
            </View>

            <Text style={styles.title}>Stats</Text>
            <View>
                {
                    pokemon.stats?.map(({ stat, base_stat }) => (
                        <View key={stat.name} style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 5,
                        }}>
                            <Text style={styles.value}>{stat.name}</Text>
                            <Text style={styles.value}>{base_stat}</Text>
                        </View>
                    ))
                }
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
    },
    value: {
        fontSize: 18,
        marginVertical: 5,
    },
    typeContainer: {
        flexDirection: "row",
        marginVertical: 5,
    },
    typeText: {
        fontSize: 16,
        color: "white",
        marginRight: 10,
        borderRadius: 5,
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    spritesScroll: {
        marginTop: 10,
        marginBottom: 20,
    },
    sprite: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    movesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10,
    },
    moveText: {
        backgroundColor: "#ddd",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        margin: 4,
        fontSize: 14,
        textTransform: "capitalize",
    },
});
