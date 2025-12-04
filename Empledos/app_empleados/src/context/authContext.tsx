import React, { createContext, ReactNode, useState } from "react";
export interface configIpProps {
    apiIp: string;
    setApi: (ip: string) => void;
}

const defaultValue: configIpProps = {
    apiIp: "http://localhost:3000",
    setApi: () => { },
};

export const ConfigIp = createContext<configIpProps>(defaultValue);


export const ConfigIpProvedor = ({ children }: { children: ReactNode }) => {
    const [apiIp, setApi] = useState("http://localhost:3000");

    return (<ConfigIp.Provider value={{ apiIp, setApi }}>
        {children}
    </ConfigIp.Provider>
    );
};

