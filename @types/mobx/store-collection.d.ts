import { Store } from "./store";
import { RootStore } from "./main";
import { Generic } from "./generic";
export interface IPaginatedListParameter<T> {
    page: number;
    rowsByPage: number;
    count: number;
    skip: number;
    pageCount: number;
    prevPage: number;
    nextPage: number;
    items: T[];
    pageUrl: string;
    nextPageUrl: string;
    prevPageUrl: string;
    pageUrlTemplate: string;
    neighborPagesCount?: number;
    nextPages?: number[];
    prevPages?: number[];
}
export interface IPageInfo {
    page: number;
    rowsByPage?: number;
    skip?: number;
    prevPage?: number;
    nextPage?: number;
    pageUrl?: string;
    nextPageUrl?: string;
    prevPageUrl?: string;
    pageUrlTemplate?: string;
    neighborPagesCount?: number;
    nextPages?: number[];
    prevPages?: number[];
}
export declare class PaginatedList<TStore extends Store<TStore>> extends Generic {
    name: string;
    collection: Collection<TStore>;
    idFieldName: string;
    pageMapIds: {
        [page: number]: Array<string | number>;
    };
    pageMapInfo: {
        [page: number]: IPageInfo;
    };
    pageUrlTemplate: string | null;
    count: number;
    private skip;
    private rowsByPage;
    private page;
    private pageCount;
    private pageUrlTemplateDisposer;
    constructor(name: string, collection: Collection<TStore>, idFieldName: string);
    readonly pageCollectionIds: Array<string | number>;
    readonly pageCollection: Array<TStore | null>;
    readonly infiniteCollectionIds: Array<string | number>;
    readonly infiniteCollection: Array<TStore | null>;
    setPage(pageNumber: number): void;
    nextPage(): void;
    prevPage(): void;
    loadPage(pageNumber: number): void;
    readonly pageInfo: IPageInfo;
    setItem(item: TStore): void;
    getItem(id: string | number): TStore;
    removeItem(id: string | number): boolean;
    removeItems(ids: Array<string | number>): void;
    setItems(items: TStore[]): void;
    setPaginatedList(paginatedList: IPaginatedListParameter<TStore>): void;
    invalidateList(): void;
}
export declare abstract class Collection<TStore extends Store<TStore>> extends Store<TStore> {
    paginatedLists: {
        [name: string]: PaginatedList<TStore>;
    };
    items: {
        [id: string]: TStore;
    };
    private type;
    private idFieldName;
    constructor(rootStore: RootStore | undefined, type: typeof Store, idFieldName?: "id" | "name" | "string" | string);
    readonly defaultCollection: PaginatedList<TStore>;
    getPaginatedList(name: string): PaginatedList<TStore>;
    setItem(item: any, root?: RootStore): void;
    getItem(id: string | number): TStore;
    removeItem(id: string | number): boolean;
    removeItems(ids: Array<string | number>): void;
    collectGarbage(): void;
    ensurePaginatedList(name: string, create?: boolean): boolean;
}
