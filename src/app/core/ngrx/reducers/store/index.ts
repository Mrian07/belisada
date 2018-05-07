import * as actions from '../../actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface ToSeller { toseller: any; }
const ToSellerDefault = { toseller: null };
export interface StoreProfile { storeprofile: any; }
const StoreProfileDefault = { storeprofile: null };
export interface OpenClosed { openclose: any; }
const OpenClosedDefault = { openclose: null };
export interface UpdateStoreDesc { Updatestoredesc: any; }
const UpdateStoreDescDefault = { Updatestoredesc: null };
export interface UpdateStoreAddress { updatestoredesc: any; }
const UpdateStoreAddressDefault = { updatestoredesc: null };
export interface Province { province: any; }
const ProvinceDefault = { province: null };
export interface City { city: any; }
const CityDefault = { city: null };
export interface District { district: any; }
const DistrictDefault = { district: null };
export interface Village { village: any; }
const VillageDefault = { village: null };

export const ToSellerAdapter = createEntityAdapter<ToSeller>();
export const StoreProfileAdapter = createEntityAdapter<StoreProfile>();
export const OpenClosedAdapter = createEntityAdapter<OpenClosed>();
export const UpdateStoreDescAdapter = createEntityAdapter<UpdateStoreDesc>();
export const UpdateStoreAddressAdapter = createEntityAdapter<UpdateStoreAddress>();
export const ProvinceAdapter = createEntityAdapter<Province>();
export const CityAdapter = createEntityAdapter<City>();
export const DistrictAdapter = createEntityAdapter<District>();
export const VillageAdapter = createEntityAdapter<Village>();

export const initialToSeller: ToSeller = ToSellerAdapter.getInitialState(ToSellerDefault);
export const initialStoreProfile: StoreProfile = StoreProfileAdapter.getInitialState(StoreProfileDefault);
export const initialOpenClosed: OpenClosed = StoreProfileAdapter.getInitialState(OpenClosedDefault);
export const initialUpdateStoreDesc: UpdateStoreDesc = UpdateStoreDescAdapter.getInitialState(UpdateStoreDescDefault);
export const initialUpdateStoreAddress: UpdateStoreAddress = UpdateStoreAddressAdapter.getInitialState(UpdateStoreAddressDefault);
export const initialProvince: Province = ProvinceAdapter.getInitialState(ProvinceDefault);
export const initialCity: City = CityAdapter.getInitialState(CityDefault);
export const initialDistrict: District = CityAdapter.getInitialState(DistrictDefault);
export const initialVillage: Village = VillageAdapter.getInitialState(VillageDefault);

export function ToSellerReducer(
  state: ToSeller = initialToSeller,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.UPGRADETOSELLER : {
        return action.status;
    }
    default: return [];
  }
}
export function StoreProfileReducer(
  state: StoreProfile = initialStoreProfile,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.GETSTOREPROFILE : {
        return action.profile;
    }
    default: return [];
  }
}
export function OpenClosedReducer(
  state: OpenClosed = initialOpenClosed,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.OPENCLOSESTORE : {
        return action.status;
    }
    default: return [];
  }
}
export function UpdateStoreDescReducer(
  state: UpdateStoreDesc = initialUpdateStoreDesc,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.UPDATESTOREDESC : {
        return action.status;
    }
    default: return [];
  }
}
export function UpdateStoreAddressReducer(
  state: UpdateStoreAddress = initialUpdateStoreAddress,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.UPDATESTOREADDRESS : {
        return action.status;
    }
    default: return [];
  }
}
export function ProvinceReducer(
  state: Province = initialProvince,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.GETPROVINCE : {
        return action.province;
    }
    case actions.GETPROVINCESUCCESS : {
      return action.province;
  }
    default: return [];
  }
}
export function CityReducer(
  state: City = initialCity,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.GETCITY : {
        return action.city;
    }
    case actions.GETCITYSUCCESS : {
      return action.city;
  }
    default: return [];
  }
}
export function DistrictReducer(
  state: District = initialDistrict,
  action: actions.StoreAction) {
  switch (action.type) {

    case actions.GETDISTRICT : {
        return action.district;
    }
    default: return [];
  }
}

export const ToSellerState = createFeatureSelector<ToSeller>('toseller');
export const StoreProfileState = createFeatureSelector<StoreProfile>('storeprofile');
export const OpenClosedState = createFeatureSelector<StoreProfile>('openclosed');
export const UpdateStoreDescState = createFeatureSelector<StoreProfile>('updatedesc');
export const UpdateStoreAddressState = createFeatureSelector<StoreProfile>('updateaddress');
export const ProvinceState = createFeatureSelector<Province>('province');
export const CityState = createFeatureSelector<City>('city');
export const DistrictState = createFeatureSelector<District>('district');
