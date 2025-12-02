import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface UseLocation {
    location: Location.LocationObject | null;
    error: string | null;
}

export const useLocation = (): UseLocation => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setError("permiso de ubicación denegado");
                return;
            }

            const loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            setLocation(loc);

        })();
    }, []);

    return { location, error };
}
