export class MyStore {

    address: string;
    cityId: number;
    cityName: string;
    countryId: number;
    countryName: string;
    description: string;
    districtId: number;
    districtName: string;
    mBpartnerStoreId: number;
    name: string;
    postal: string;
    regionId: number;
    regionName: string;
    storeCategoryId: number;
    villageId: number;
    villageName: string;

    constructor() { }
}

export class OpenClose {
    dateStart: any;
    dateEnd: any;
    isOffDay: string;
    mBpartnerStoreId: number;
}
