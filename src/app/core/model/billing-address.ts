export class BillingAddress {
    name: string;
    address: string;
    addressName: string;
    postal: string;
    villageId: number;
    phone: string;
    addressType: string;

    // untuk get
    addressId: number;
    districtId: number;
    cityId: number;
    regionId: number;
    countryId: number;
    // postal: number;
    villageName: string;
    districtName: string;
    cityName: string;
    regionName: string;
    countryName: string;

    // akhir dari get

    message?: string;
    status?: string;
}
