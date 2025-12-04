import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PokemonNavigator } from "./PokemonNavigator";
import { DrawerMenu } from "../components/DraweMenu";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { CharactersNavigator } from "./CharactersNavigator";
import { ClinicaNavigator } from "./ClinicaNavigator";
import { EmpleadoNavigator } from "./EmpleadoNavigator";
import { SensorScreen } from "../screens/sensor/SensorScreen";
import { SensorData } from "../screens/sensor/SensorData";
import { QrScannerScreen } from "../screens/QrScannerScreen";
import { LocationScreen } from "../screens/LocationScreen";
import { ipEmpleado } from "../screens/empleados/ipEmpleado";

export type RootDrawerNavigator = {
  ipEmpleado: undefined;
  SensorScreen: undefined;
  SensorData: undefined;
  PokemonNavigator: undefined;
  ClinicaNavigator: undefined;
  EmpleadoNavigator: undefined;
  ImagePickerScreen: undefined;
  ExampleNavigator: undefined;
  CharactersNavigator: undefined;
  LocationScreen: undefined;
  QrScannerScreen: undefined;

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
        name="QrScannerScreen"
        component={QrScannerScreen}
        options={{
          title: 'QR Scanner'
        }}
      />

      <Drawer.Screen name="LocationScreen" component={LocationScreen} />

      <Drawer.Screen name="ipEmpleado" component={ipEmpleado} />
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
      <Drawer.Screen
        name="EmpleadoNavigator"
        component={EmpleadoNavigator}

      />
    </Drawer.Navigator>
  );
};

export const DrawerNavigator = () => {
  return <Navigator />;
};
