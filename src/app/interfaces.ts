
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
}

export interface IListItem extends IHasColor {
    quantity?: number;
}

export interface IAppData {
    lists: IList[];
    items: IListItem[];
}

export type dataKey = 'lists' | 'items';