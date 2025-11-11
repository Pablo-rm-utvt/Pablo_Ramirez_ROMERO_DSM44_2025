import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { appTheme } from '../../themes/appTheme';
import { useUserApi } from '../../hooks/useUserApi';
import { UserCard } from '../../components/UserCard';
import { UserResponse } from '../../interfaces/userInterfaces';
import { BtnTouch } from '../../components/BtnTouch';

export const HomeUser = () => {

    const { isLoading, loadUsers, listUser } = useUserApi();

    const focused = useIsFocused();

    const navigation = useNavigation<any>();

    const create: UserResponse = {
        id_user: 0,
        username: "",
        password: "",
        email: "",
        image: "",
        update: "",
    }

    useEffect(() => {
        (!isLoading) && loadUsers();
    }, [focused])

    return (
        <View
            style={appTheme.marginGlobal}
        >
            <FlatList
                data={Object.values(listUser)}
                keyExtractor={(item) => "#" + item.id_user}
                ListHeaderComponent={(
                    <View
                        style={appTheme.container}
                    >
                        <Text
                            style={appTheme.title}
                        >
                            Lista de Usuarios
                        </Text>
                        <BtnTouch
                            titulo='Crear usuario'
                            color='violet'
                            action={() => navigation.navigate("FormUser", { ...create })}
                        />
                    </View>
                )}
                refreshControl={(
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={loadUsers}
                        colors={["pink", "violet", "black"]}
                        progressBackgroundColor="black"
                    />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                    />
                )}
            />
        </View>
    );
}