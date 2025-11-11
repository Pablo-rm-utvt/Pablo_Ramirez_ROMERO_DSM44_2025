import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNav } from "./StackNav";
import { PokemonNavigator } from "./PokemonNavigator";
import { TareaNavigator } from "./TareaNavigator";
import { EmpleadoNavigator } from "./EmpleadoNavigator";
import { DrawerMenu } from "../components/DraweMenu";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { ExampleNavigator } from "./ExampleNavigator";
import { CharactersNavigator } from "./CharactersNavigator";
import { ClinicaNavigator } from "./ClinicaNavigator";

export type RootDrawerNavigator = {
  StackNav: undefined;
  PokemonNavigator: undefined;
  TareaNavigator: undefined;
  EmpleadoNavigator: undefined;
  ClinicaNavigator: undefined;
  ImagePickerScreen: undefined;
  UserNavigator: undefined;
  ExampleNavigator: undefined;
  SettingsScreen: undefined;
  CharactersNavigator: undefined;


};

const Navigator = () => {
  const Drawer = createDrawerNavigator<RootDrawerNavigator>();
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="PokemonNavigator"
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerPosition: "left",
        drawerStyle: {
          backgroundColor: "white",
          width: width * 0.7,
        },
      }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen
        name="EmpleadoNavigator"
        component={EmpleadoNavigator}
        options={{
          title: 'Empleados'
        }}
      />
      <Drawer.Screen name="ExampleNavigator" component={ExampleNavigator} />
      <Drawer.Screen name="PokemonNavigator" component={PokemonNavigator} />
      <Drawer.Screen name="ImagePickerScreen" component={ImagePickerScreen} />
      <Drawer.Screen name="CharactersNavigator" component={CharactersNavigator} />
      <Drawer.Screen 
        name="ClinicaNavigator" 
        component={ClinicaNavigator}
        options={{
          title: 'Clínica'
        }}
      />
    </Drawer.Navigator>
  );
};

export const DrawerNavigator = () => {
  // Elimina la validación de login, entra directo al Drawer principal
  return <Navigator />;
};
