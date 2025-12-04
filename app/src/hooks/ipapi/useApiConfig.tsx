import { useContext } from "react";
import { ConfigIp } from "../../context/authContext";

export const useApiConfig = () => {

    return useContext(ConfigIp);

};
