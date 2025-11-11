import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { CharacterCard } from "../components/CharacterCard";
import { useCharactersPaginated } from "../hooks/useCharactersPaginated";



export const Home = () => {

    const { characters, isLoading, loadCharacters } = useCharactersPaginated();

    console.log("Loading:", isLoading);
    console.log("Characters array:", characters);


    return (

        <View
            style={style.root}

        >
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}


                //header

                ListHeaderComponent={(
                    <View>
                        <Text style={{

                            fontSize: 40,
                            marginHorizontal: 10,
                            marginTop: 20,
                            marginBottom: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: "center",
                            fontWeight: 'bold',
                            color: "white"


                        }}
                        >
                            Rick & Morty {"\n"}

                        </Text>
                    </View>


                )}



                //body
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <CharacterCard {...item} />
                )}


                //infinite scroll
                onEndReached={loadCharacters}
                onEndReachedThreshold={0.2}


                //Foonter
                ListFooterComponent={(


                    <Image
                        source={require("../../assets/dance.gif")}
                        style={{ width: 60, height: 60, margin: 29, alignSelf: "center" }}

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
        alignItems: "center",
        backgroundColor: "#000000ff",
        alignContent: "center",


    }
});

