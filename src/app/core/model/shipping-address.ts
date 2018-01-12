export class ShippingAddress {
  // ini untuk post yah
  name: string;
  address: string;
  addressName: string;
  postal: string;
  // villageId: string;
  villageId: number;
  phone: string;
  addressType: string;
  // ini akhir dari untuk post yah

  // ini untuk get
  addressId: number;
  districtId: number;
  cityId: number;
  regionId: number;
  villageName: string;
  districtName: string;
  cityName: string;
  regionName: string;
  countryName: string;
  // akhir dari get

}
