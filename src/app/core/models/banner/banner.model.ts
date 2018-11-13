export class BannerResponse {
  status: number;
  message: string;
  data: BannerData;
}

export class BannerArrayResponse {
  status: number;
  message: string;
  data: BannerData[];
}

export class BannerData {
  name: string;
  description: string;
  imageUrl: string;
  height: number;
  width: number;
  url: string;
}

export class BannerMainResponse {
  status: number;
  message: string;
  data: BannerMainData;
}

export class BannerMainData {
  height: number;
  width: number;
  imageUrl: string;
  links: BannerMainLink[];
}

export class BannerMainLink {
  name: string;
  description: string;
  x: number;
  y: number;
  url: string;
}
