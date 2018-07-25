import { ThumborSizingEnum } from '@belisada/core/services/thumbor/thumbor.sizing.enum';

export class ThumborOptions {
  width: number;
  height: number;
  fitting?: ThumborSizingEnum;
  filter?: Filter;
}

export class Filter {
  fill?: string;
}
