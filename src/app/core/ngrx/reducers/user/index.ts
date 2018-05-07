import * as actions from '../../actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface Profile { profile: any; }
const ProfileDefault = { profile: null };
export interface SignUpBuyer { signupbuyer: any; }
const SignUpBuyerDefault = { signupbuyer: null };
export interface SignUpSeller { signupseller: any; }
const SignUpSellerDefault = { signupseller: null };
export interface IpAddress { ipaddress: any; }
const IpAddressDefault = { ipaddress: null };
export interface NewsLetter { newsletter: any; }
const NewsLetterDefault = { newsletter: null };

export const ProfileAdapter = createEntityAdapter<Profile>();
export const initialProfile: Profile = ProfileAdapter.getInitialState(ProfileDefault);
export const SignUpBuyerAdapter = createEntityAdapter<SignUpBuyer>();
export const initialSignUpBuyer: SignUpBuyer = SignUpBuyerAdapter.getInitialState(SignUpBuyerDefault);
export const SignUpSellerAdapter = createEntityAdapter<SignUpSeller>();
export const initialSignUpSeller: SignUpSeller = SignUpSellerAdapter.getInitialState(SignUpSellerDefault);
export const IpAddressAdapter = createEntityAdapter<IpAddress>();
export const initialIpAddress: IpAddress = IpAddressAdapter.getInitialState(IpAddressDefault);
export const NewsLetterAdapter = createEntityAdapter<NewsLetter>();
export const initialNewsLetter: NewsLetter = NewsLetterAdapter.getInitialState(NewsLetterDefault);

export function ProfileReducer(
state: Profile = initialProfile,
action: actions.UserAction) {
switch (action.type) {

        case actions.GETPROFILE : {
            return action.status;
        }
        case actions.GETPROFILESUCCESS : {
            return action.profile;
        }
        case actions.UPDATEPROFILE : {
            return action.status;
        }
        case actions.UPDATEPROFILESUCCESS : {
        return action.status;
    }
        default: return [];
    }
}
export function SignUpBuyerReducer(
    state: SignUpBuyer = initialSignUpBuyer,
    action: actions.UserAction) {
    switch (action.type) {

      case actions.SIGNUPBUYER : {
          return action.status;
      }
      case actions.SIGNUPBUYERSUCCESS : {
        return action.status;
      }
      default: return [];
    }
  }

export function SignUpSellerReducer(
state: SignUpSeller = initialSignUpSeller,
action: actions.UserAction) {
switch (action.type) {

    case actions.SIGNUPSELLER : {
        return action.status;
    }
    default: return [];
}
}
export function IpAddressReducer(
state: IpAddress = initialIpAddress,
action: actions.UserAction) {
switch (action.type) {

    case actions.IPADDRESS : {
        return action.status;
    }
    default: return [];
}
}
export function NewsLetterReducer(
    state: NewsLetter = initialNewsLetter,
    action: actions.UserAction) {
    switch (action.type) {

        case actions.NEWSLETTER : {
            return action.status;
        }
        default: return [];
    }
    }
  export const ProfileState = createFeatureSelector<Profile>('profile');
  export const SignUpBuyerState = createFeatureSelector<SignUpBuyer>('signupbuyer');
  export const SignUpSellerState = createFeatureSelector<SignUpBuyer>('signupseller');
  export const IpAddressState = createFeatureSelector<IpAddress>('ipaddress');
  export const NewsLetterState = createFeatureSelector<NewsLetter>('newsletter');
