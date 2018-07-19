export class AddShippingRequest {
    address: string;
    addressName: string;
    description: string;
    isDefault: boolean;
    name: string;
    phone: string;
    postal: string;
    villageId: number;
}

export class AddShippingResponse {
    message: string;
    status: number;
}

export class GetShippingResponse {
    address: string;
    addressId: number;
    addressName: string;
    cityId: number;
    cityName: string;
    countryId: number;
    countryName: string;
    description: string;
    districtId: number;
    districtName: string;
    isDefault: true;
    name: string;
    phone: string;
    postal: string;
    rajaOngkirId: number;
    regionId: number;
    regionName: string;
    villageId: number;
    villageName: string;
}

export class SetDefault {
    addressId: number;
}

