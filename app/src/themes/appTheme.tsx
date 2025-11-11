import { StyleSheet } from "react-native";

export const appTheme = StyleSheet.create({
    marginGlobal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    textInput: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "bold",
        height: 50,
        width: 280,
        margin: 5,
        borderWidth: 5,
        borderColor: "violet",
        color: "black"
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "violet"
    },
    menuContainer: {
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10
    },
    menuBtn: {
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: 180,
        justifyContent: "center",
        borderColor: "violet"
    },
    textBtn: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    }
});