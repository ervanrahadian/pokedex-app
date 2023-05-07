import api from "@utils/api";
import { GET_FREE_GO_IP } from "../interface/FreeGOIPInterface";

const URL = {
    freeGoIPBaseURL: "https://freegeoip.app/",
    freeGoIP: "json/",
};

export const getIPLocation = async (): Promise<GET_FREE_GO_IP> => {
    return (await api(URL.freeGoIPBaseURL)).get(URL.freeGoIP);
};
