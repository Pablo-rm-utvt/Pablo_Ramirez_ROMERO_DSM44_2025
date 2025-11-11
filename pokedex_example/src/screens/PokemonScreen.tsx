import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/PokemonNavigator';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useTypeColorPokemon } from '../hooks/useTypeColorPokemon';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { PokemonDetail } from '../components/PokemonDetail';

interface Props extends StackScreenProps<RootStackParams, "PokemonScreen"> { };

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { id, name, picture, url } = route.params;

    const { color, isLoading } = useTypeColorPokemon(id);

    const { pokemon, isLoadingPokemon } = usePokemonDetail(url);

    return (
        <View
            style={{ flex: 1 }}
        >
            <View>
                <View
                    style={{
                        ...style.leftContainer,
                        backgroundColor: (isLoading) ? 'gray' : (color.length > 1) ? color[1] : color[0]
                    }}
                />
                <View
                    style={{
                        ...style.rigthContainer,
                        backgroundColor: (isLoading) ? 'pink' : color[0]
                    }}
                />
            </View>
            {/* Header */}
            <View
                style={style.headerContainer}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={style.backBtn}
                >
                    <View>
                        <Text
                            style={style.row}
                        >
                            ←
                        </Text>
                        <Text
                            style={style.pokemonName}
                        >
                            {name} {`\n#${id}`}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Image
                    source={require("../../assets/pokeball-light.png")}
                    style={style.pokeball}
                />
                <Image
                    source={{ uri: picture }}
                    style={style.pokemon}
                />
            </View>
            {/*Detail*/}
            {
                (isLoadingPokemon)
                    ? (
                        <View>
                            <ActivityIndicator
                                color="black"
                                size={60}
                                style={{ height: 100 }}
                            />
                        </View>
                    )
                    :
                    <PokemonDetail
                        pokemon={pokemon}
                    />
            }
        </View>
    );
}

const style = StyleSheet.create({
    leftContainer: {
        position: "absolute",
        left: 0,
        height: 370,
        width: "50%",
        backgroundColor: "gray",
        borderBottomLeftRadius: 1000,
        //borderTopLeftRadius: 1000,
    },
    rigthContainer: {
        position: "absolute",
        right: 0,
        height: 370,
        width: "50%",
        backgroundColor: "pink",
        //borderBottomRightRadius: 1000,
        borderTopRightRadius: 1000,
    },
    headerContainer: {
        alignItems: "center",
        height: 370,
        zIndex: 999,
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backBtn: {
        position: "absolute",
        left: -10,
        top: -30
    },
    row: {
        color: "white",
        fontSize: 70,
        top: 20
    },
    pokemonName: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
        left: 20
    },
    pokeball: {
        height: 300,
        opacity: 0.7,
        width: 300,
        position: "absolute",
        top: 30
    },
    pokemon: {
        top: 60,
        height: 220,
        width: 220,
        position: "absolute"
    },
});