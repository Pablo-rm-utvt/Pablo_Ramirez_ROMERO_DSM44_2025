import { useState, useEffect, useRef } from "react";
import { sensorApi } from "../api/sensorApi";
import { NewSensorList, SensorList, Result } from "../interfaces/sensorInterface";

interface UseSensorPaginated {
    isLoading: boolean;
    loadSensor: () => void;
    simpleSensorList: NewSensorList[];
}

export const useSensorPaginated = (): UseSensorPaginated => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [simpleSensorList, setSimpleSensorList] = useState<NewSensorList[]>([]);
    const nextPageUrl = useRef("http://10.45.20.13:3000/api/sensor/paginate/");

    const loadSensor = async () => {
        setIsLoading(true);
        const respose = await sensorApi.get<SensorList>(nextPageUrl.current);
        nextPageUrl.current = respose.data.next;
        mapSensorList(respose.data.results)

    }
    // const loadSensor = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await sensorApi.get<SensorList>(nextPageUrl.current);
    //         const data = response.data;

    //         // Algunos backends devuelven { results: [] }, otros { data: [] } o simplemente []
    //         const results = Array.isArray(data)
    //             ? data
    //             : data.results || data.results || [];

    //         if (!Array.isArray(results)) {
    //             console.warn("La respuesta del backend no tiene una lista válida:", data);
    //             setIsLoading(false);
    //             return;
    //         }

    //         nextPageUrl.current = data.next;
    //         mapSensorList(results);
    //     } catch (error) {
    //         console.error("Error cargando sensores:", error);
    //         setIsLoading(false);
    //     }
    // };


    const mapSensorList = (Sensorlist: Result[]) => {
        const newSensorList: NewSensorList[] = Sensorlist.map(({ url, name }) => {

            const urlParts = url.split("/");
            const id = urlParts[urlParts.length - 1];
            return { id, url, name };
        });

        setSimpleSensorList((prevList) => [...prevList, ...newSensorList]);

        setIsLoading(false);
    }

    // const mapSensorList = (Sensorlist: any[]) => {
    //     const newSensorList: NewSensorList[] = Sensorlist.map((sensor) => {
    //         const id = sensor._id || sensor.id;
    //         const url = sensor.url || `${nextPageUrl.current}${id}`;
    //         return { id, url };
    //     });

    //     setSimpleSensorList((prevList) => [...prevList, ...newSensorList]);
    //     setIsLoading(false);
    // };


    useEffect(() => {
        loadSensor();
    }, []);

    return { isLoading, loadSensor, simpleSensorList };

}