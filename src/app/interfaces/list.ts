export interface IList {
    name: string;
    id: string;
    categoryIds?: string[];
    itemIds?: string[];
}


export interface IListItem {
    name: string;
    id: string;
    color?: string;
}
