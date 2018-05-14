import { Action } from '@ngrx/store';

export const UPGRADETOSELLER = 'UPGRADETOSELLER';
export const GETSTOREPROFILE = 'GETSTOREPROFILE';
export const OPENCLOSESTORE = 'OPENCLOSESTORE';
export const UPDATESTOREDESC = 'UPDATESTOREDESC';
export const UPDATESTOREADDRESS = 'UPDATESTOREADDRESS';
export const GETPROVINCE = 'GETPROVINCE';
export const GETPROVINCESUCCESS = 'GETPROVINCESUCCESS';
export const GETCITY = 'GETCITY';
export const GETCITYSUCCESS = 'GETCITYSUCCESS';
export const GETDISTRICT = 'GETDISTRICT';
export const GETVILLAGE = 'GETVILLAGE';

export class UpgradeToSeller implements Action {
  readonly type = UPGRADETOSELLER;
  constructor(public status: any) { }
}
export class GetStoreProfile implements Action {
  readonly type = GETSTOREPROFILE;
  constructor(public profile: any) { }
}
export class OpenCloseStore implements Action {
  readonly type = OPENCLOSESTORE;
  constructor(public status: any) { }
}
export class UpdateStoreDesc implements Action {
  readonly type = UPDATESTOREDESC;
  constructor(public status: any) { }
}
export class UpdateStoreAddress implements Action {
  readonly type = UPDATESTOREADDRESS;
  constructor(public status: any) { }
}
export class GetProvince implements Action {
  readonly type = GETPROVINCE;
  constructor(public province: any) { }
}
export class GetProvinceSuccess implements Action {
  readonly type = GETPROVINCESUCCESS;
  constructor(public province: any) { }
}
export class GetCity implements Action {
  readonly type = GETCITY;
  constructor(public city: any) { }
}
export class GetCitySuccess implements Action {
  readonly type = GETCITYSUCCESS;
  constructor(public city: any) { }
}
export class GetDistrict implements Action {
  readonly type = GETDISTRICT;
  constructor(public district: any) { }
}
export class GetVillage implements Action {
  readonly type = GETVILLAGE;
  constructor(public village: any) { }
}


export type StoreAction = UpgradeToSeller
| GetStoreProfile
| OpenCloseStore
| UpdateStoreDesc
| UpdateStoreAddress
| GetProvince
| GetProvinceSuccess
| GetCity
| GetCitySuccess
| GetDistrict
| GetVillage;
