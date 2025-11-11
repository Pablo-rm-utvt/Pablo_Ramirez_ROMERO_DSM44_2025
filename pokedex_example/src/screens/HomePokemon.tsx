import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

export const HomePokemon = () => {

    const { loadPokemons, simplePokemonList } = usePokemonPaginated();

    return (
        <View
            style={style.root}
        >
            <FlatList
                data={simplePokemonList}
                keyExtractor={(pokemon, index) => `${pokemon.id}${index}`}
                // Header
                ListHeaderComponent={(
                    <View>
                        <Image
                            source={require("../../assets/pokeball-dark.png")}
                            style={{
                                width: 300,
                                height: 300,
                                position: "absolute",
                                top: -100,
                                right: -100,
                            }}
                        />
                        <Text
                            style={{ fontSize: 60, marginHorizontal: 10 }}
                        >
                            Pokedex
                        </Text>
                    </View>
                )}
                // Body
                showsVerticalScrollIndicator={false}
                numColumns={2} // Ojo si lo cambio debo reiniciar el app
                renderItem={({ item }) => (
                    <PokemonCard
                        {...item}
                    />
                )}

                // Infinite Scroll
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.2}
                // Footer
                ListFooterComponent={(
                    <ActivityIndicator
                        style={{ height: 120 }}
                        size={60}
                        color="pink"
                    />
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});