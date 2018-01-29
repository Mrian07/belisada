export class Filter {
    filter: string;
    filterAlias: string;
    filterEn: string;
    data: FilterDetail[];
    selectedFilterCategory: number[];
    selectedFilterBrand: number[];
}

export class FilterDetail {
    value: string;
    valueAlias: string;
    valueId: number;
    count: number;
    min: number;
    max: number;
}

export class FilterParams {
    cat: number[];
    brand: number[];
    from: number;
    to: number;
}
