import { useState, useEffect, useRef } from "react";
import { sensorApi } from "../api/sensorApi";
import { NewSensorList, Welcome, Datum } from "../interfaces/sensorInterface";

interface UseSensorPaginated {
    isLoading: boolean;
    loadSensor: () => void;
    simpleSensorList: NewSensorList[];
}

export const useSensorPaginated = (): UseSensorPaginated => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [simpleSensorList, setSimpleSensorList] = useState<NewSensorList[]>([]);
    const nextPageUrl = useRef<string | null>("http://10.45.20.13:3000/api/sensor/paginate/");

    const loadSensor = async () => {
        setIsLoading(true);
        const response = await sensorApi.get<Welcome>(nextPageUrl.current || "");
        nextPageUrl.current = response?.data?.links?.next || null;
        mapSensorList(response?.data?.data || []);
    }

    const mapSensorList = (sensorList: Datum[]) => {
        const newSensorList: NewSensorList[] = sensorList.map((sensor) => ({
            id: sensor._id,
            estado: sensor.estado,
            temperatura_c: sensor.temperatura_c,
        }));

        setSimpleSensorList((prevList) => [...prevList, ...newSensorList]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadSensor();
    }, []);

    return { isLoading, loadSensor, simpleSensorList };

}