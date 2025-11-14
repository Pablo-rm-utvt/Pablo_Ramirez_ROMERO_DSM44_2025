import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PokemonNavigator } from "./PokemonNavigator";
import { EmpleadoNavigator } from "./EmpleadoNavigator";
import { DrawerMenu } from "../components/DraweMenu";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { ExampleNavigator } from "./ExampleNavigator";
import { CharactersNavigator } from "./CharactersNavigator";
import { ClinicaNavigator } from "./ClinicaNavigator";
import { SensorScreen } from "../screens/sensor/SensorScreen";
import { SensorData } from "../screens/sensor/SensorData";

export type RootDrawerNavigator = {
  SensorScreen: undefined;
  SensorData: undefined;
  PokemonNavigator: undefined;
  EmpleadoNavigator: undefined;
  ClinicaNavigator: undefined;
  ImagePickerScreen: undefined;
  ExampleNavigator: undefined;
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
      <Drawer.Screen name="SensorData" component={SensorData} />
      <Drawer.Screen name="PokemonNavigator" component={PokemonNavigator} />
      <Drawer.Screen name="ImagePickerScreen" component={ImagePickerScreen} />
      <Drawer.Screen name="CharactersNavigator" component={CharactersNavigator} />
      <Drawer.Screen name="SensorScreen" component={SensorScreen} />
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
