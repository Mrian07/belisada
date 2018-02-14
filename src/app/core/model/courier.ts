export class Courier {
    name: string;
    shipperId: number;
    isActive: string;
    shipper: Array<string>;
}

export class CourierShipper {
    name: string;
    used: string;
    shipperId: number;
    mBpartnerStoreId: number;
    mShipperStoreId: number;
    mBpartnerId: number;
    shipper: Array<string>;
}
