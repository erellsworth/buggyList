
export interface IBaseData {
    id: string;
    name: string;
}

interface IHasColor extends IBaseData {
    color?: string;
}

/**
 * Lists have multiple items
 * Items can belong to multiple lists
 * Lists have a default color
 */

export interface IList extends IHasColor {
    itemIds: string[];
    completedItemIds: string[];
    showCompletedItems: boolean;
    quantities?: { [key: string]: number };
    notes?: { [key: string]: string };
}

export interface IListItem extends IHasColor {
    quantity?: number;
}

export interface IAppData {
    lists: IList[];
    items: IListItem[];
}

export type dataKey = 'lists' | 'items';

export interface IWeatherData {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ]
};
export interface IWeather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: IWeatherData;
    hourly: IWeatherData[];
}
