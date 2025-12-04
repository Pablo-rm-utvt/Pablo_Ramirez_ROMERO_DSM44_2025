import { useState, useEffect, useRef } from "react";
import { sensorApi } from "../../api/sensorApi";
import { NewSensorList, Welcome, Datum } from "../../interfaces/sensorInterface";

interface UseSensorPaginated {
    estaCargando: boolean;
    loadSensor: () => void;
    simpleSensorList: NewSensorList[];
}

export const useSensorPaginated = (): UseSensorPaginated => {

    const [estaCargando, setEstaCargando] = useState<boolean>(false);
    const [simpleSensorList, setSimpleSensorList] = useState<NewSensorList[]>([]);
    const urlSiguiente = useRef<string | null>("http://192.168.151.243:3000/api/sensor/paginate/");

    const loadSensor = async () => {
        setEstaCargando(true);
        const response = await sensorApi.get<Welcome>(urlSiguiente.current || "");
        urlSiguiente.current = response.data.links.next || null;
        mapSensorList(response.data.data || []);
    }

    const mapSensorList = (sensorList: Datum[]) => {
        const newSensorList: NewSensorList[] = sensorList.map((sensor) => ({
            id: sensor._id,
            estado: sensor.estado,
            temperatura_c: sensor.temperatura_c,
            distacia_cm: sensor.distacia_cm,
            fecha: sensor.fecha,
        }));

        setSimpleSensorList((prevList) => {
            const merged = [...prevList, ...newSensorList];
            const unique = merged.filter(
                (item, index, self) => index === self.findIndex(t => t.id === item.id)
            );
            return unique;
        });
    }

    useEffect(() => {
        loadSensor();
    }, []);

    return { estaCargando, loadSensor, simpleSensorList };

}