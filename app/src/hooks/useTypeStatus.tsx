import { useState, useEffect } from "react";
import { sensorApi } from "../api/sensorApi";
import { Datum, Estado } from "../interfaces/sensorInterface";

export interface TypeStatus {
    estado: string;
    color: string;
}

interface UseTypeColorStatus {
    isLoading: boolean;
    color: string;
}

export const useTypeColorStatus = (_id: string | number): UseTypeColorStatus => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [color, setColor] = useState<string>("");

    const tipo: TypeStatus[] = [
        { estado: 'Inactivo', color: '#fa0000ff' },
        { estado: 'Activo', color: '#00ff37ff' },
    ];

    const getColorType = (estado: Estado) => {
        const found = tipo.find((element) => element.estado === estado);
        setColor(found ? found.color : "defaultColor");
    };

    const loadType = async () => {

        const response = await sensorApi.get<Datum>(
            `http://192.168.100.12:3000/api/sensor/${_id}`
        );

        getColorType(response.data.estado);

        setIsLoading(false);

    };

    useEffect(() => {
        loadType();
    }, []);

    return { isLoading, color };
};
