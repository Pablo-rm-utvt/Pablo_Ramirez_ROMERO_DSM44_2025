import { useEffect, useState } from "react";
import { sensorApi } from "../api/sensorApi";
import { SensorDataResponse, Today, Yesterday, BeforeYesterday } from "../interfaces/sensorInterface";

interface TypeData {
    min: number,
    max: number,
    labels: string[],
    values: number[],
}

interface UseSensorData {
    isLoading: boolean;
    loadData: () => void;
    data: SensorDataResponse;
    today: TypeData;
    yesterday: TypeData;
    beforeYesterday: TypeData;
}

export const useSensorData = (): UseSensorData => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<SensorDataResponse>({} as SensorDataResponse);
    const [today, setToday] = useState<TypeData>({} as TypeData);
    const [yesterday, setYesterday] = useState<TypeData>({} as TypeData);
    const [beforeYesterday, setBeforeYesterday] = useState<TypeData>({} as TypeData);

    const url: string = "http://10.45.20.13:3000/api/sensor/data";

    const loadData = async () => {
        setIsLoading(true);
        const response = await sensorApi.get<SensorDataResponse>(url);
        setData(response.data);
        chartData("today", data.today);
        chartData("yesterday", data.yesterday);
        chartData("beforeYesterday", data.beforeYesterday);
        setIsLoading(false);
    }

    const chartData = (type: string, data: any) => {
        switch (type) {
            case "today":
                (data != undefined) && ((data: Today) => {
                    const labels = data.lastToday.map((document) => {
                        let fecha = new Date(document.fecha);
                        return fecha.toLocaleString("es-Mx", { hour: "numeric", minute: "numeric", hour12: true })
                    });
                    const values = data.lastToday.map((document) => {
                        return document.temperatura_c
                    });
                    setToday({
                        min: data.minToday,
                        max: data.maxToday,
                        labels,
                        values
                    });
                })(data);
                break;
            case "yesterday":
                (data != undefined) && ((data: Yesterday) => {
                    const labels = data.lastYesterday.map((document) => {
                        let fecha = new Date(document.fecha);
                        return fecha.toLocaleString("es-Mx", { hour: "numeric", minute: "numeric", hour12: true })
                    });
                    const values = data.lastYesterday.map((document) => {
                        return document.temperatura_c
                    });
                    setYesterday({
                        min: data.minYesterday,
                        max: data.maxYesterday,
                        labels,
                        values
                    });
                })(data);
                break;
            case "beforeYesterday":
                (data != undefined) && ((data: BeforeYesterday) => {
                    const labels = data.lastBeforeYesterday.map((document) => {
                        let fecha = new Date(document.fecha);
                        return fecha.toLocaleString("es-Mx", { hour: "numeric", minute: "numeric", hour12: true })
                    });
                    const values = data.lastBeforeYesterday.map((document) => {
                        return document.temperatura_c
                    });
                    setBeforeYesterday({
                        min: data.minBeforeYesterday,
                        max: data.maxBeforeYesterday,
                        labels,
                        values
                    });
                })(data);
                break;
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return { isLoading, loadData, data, today, yesterday, beforeYesterday };

}