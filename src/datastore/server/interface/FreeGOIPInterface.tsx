export interface FREE_GO_IP {
    ip: string;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    city: string;
    zip_code: string;
    time_zone: string;
    latitude: any;
    longitude: any;
    metro_code: number;
}

export interface GET_FREE_GO_IP {
    data: FREE_GO_IP;
}
