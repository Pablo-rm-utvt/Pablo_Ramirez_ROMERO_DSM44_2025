import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { EmpleadoNavigator } from "./EmpleadoNavigator";
import { IpEmpleado } from "../screens/empleados/ipEmpleado";
import { DrawerMenu } from "../components/DraweMenu";
import { ConfigIpProvedor } from "../context/authContext";

export type RootDrawerNavigator = {
  IpEmpleado: undefined;
  EmpleadoNavigator: undefined;
};

const Navigator = () => {
  const Drawer = createDrawerNavigator<RootDrawerNavigator>();
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="IpEmpleado"
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
        name="IpEmpleado"
        component={IpEmpleado}
        options={{
          title: 'Ingresar Ip'
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
  return (
    <ConfigIpProvedor>
      <Navigator />
    </ConfigIpProvedor>
  );
};
