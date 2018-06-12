export class FilterM {
    filter: string;
    data: FilterData[];
}

export class FilterData {
    filterCount: number;
    filterName: string;
    filterId: string;
}

export class FilterCity {
    dataCount: number;
    pageCount: number;
    data: FilterCityData[];
}

export class FilterCityData {
    cityId: number;
    cityName: string;
}