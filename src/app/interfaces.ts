
interface IBaseInterface {
    id: string;
    name: string;
}

interface IHasColor extends IBaseInterface {
    color?: string;
}

/**
 * Lists have multiple items
 * Items can belong to multiple lists and multiple categories
 * Lists have a default color
 * Categories have an optional default color
 * If an Item color is not set, it defaults to the category color
 * If the category color is not set, it defaults to the list color
 */

export interface IList extends IHasColor {
    itemIds?: string[];
    completedItemIds?: string[];
}

export interface ICategory extends IHasColor { }

export interface IListItem extends IHasColor {
    categoryIds?: string[];
}

export interface IAppData {
    lists: IList[];
    categories: ICategory[];
    items: IListItem[];
}