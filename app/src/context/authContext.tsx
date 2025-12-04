import React, { createContext, ReactNode, useState } from "react";
export interface configIpProps {
    apiIp: string;
    setApi: (ip: string) => void;
}
export const ConfigIp = createContext({} as configIpProps);


export const ConfigIpProvedor = ({ children }: { children: ReactNode }) => {
    const [apiIp, setApi] = useState("http://localhost:3000");

    return (<ConfigIp.Provider value={{ apiIp, setApi }}>
        {children}
    </ConfigIp.Provider>
    );
};

