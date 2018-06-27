import { Store } from "./store";
import { RootStore } from "./root-store";
import { plainToClass, classToClass, plainToClassFromExist } from "class-transformer";
import { Is, Reflection } from "utility-collection";
import { Generic } from "./generic";
// import { FetchAction, FetchInjection } from "./fetch-injection";
export interface IPaginatedListParameter<T> {
  page: number;
  rowsByPage: number;
  count: number;
  skip: number;
  pageCount: number;
  prevPage: number;
  nextPage: number;
  // items
  items: T[];
  // pageUrl
  pageUrl: string;
  nextPageUrl: string;
  prevPageUrl: string;
  pageUrlTemplate: string;
  // neighbor ----
  neighborPagesCount?: number;
  nextPages?: number[];
  prevPages?: number[];
}
export interface IPageInfo {
  page: number;
  rowsByPage?: number; // geral
  // count: number; // geral
  skip?: number; // geral
  // pageCount: number; // geral
  prevPage?: number;
  nextPage?: number;
  pageUrl?: string;
  nextPageUrl?: string;
  prevPageUrl?: string;
  pageUrlTemplate?: string; // geral
  // neighbor ----
  neighborPagesCount?: number;
  nextPages?: number[];
  prevPages?: number[];
}
export class PaginatedList<TStore extends Store<TStore>> extends Generic {
  public name: string; // the name of the collections (Ex.: favoriteRestaurants, )
  public collection: Collection<TStore>;
  public idFieldName: string;
  // public pageMapIds: Map<number, Array<string | number>> = new Map<number, Array<string | number>>();
  public pageMapIds: { [page: number]: Array<string | number> } = {}; // list with pages and ids
  public pageMapInfo: { [page: number]: IPageInfo } = {}; // map with the page info
  // public pageMapInfo: Map<number, IPageInfo> = new Map<number, IPageInfo>();
  public pageUrlTemplate: string | null = null;
  public count: number = -1;
  private skip: number = 0;
  private rowsByPage: number = 100000; // Rows or PageSize
  private page: number = 1;
  private pageCount: number = 0;
  private pageUrlTemplateDisposer: any = null;
  // ---------------
  constructor(name: string, collection: Collection<TStore>, idFieldName: string) {
    super(collection);
    this.name = name;
    this.collection = collection;
    this.idFieldName = idFieldName;
  }
  // computed -------------------------------------------------
  public get pageCollectionIds(): Array<string | number> {
    if (this.pageMapIds[this.page]) {
      return this.pageMapIds[this.page];
    } else {
      return [];
    }
  }
  public get pageCollection(): Array<TStore | null> {
    return this.pageCollectionIds.map((id) => {
      const item: TStore | undefined = this.collection.getItem(id);
      if (item !== undefined && item !== null) {
        return item;
      } else {
        return null;
      }
    });
  }
  public get infiniteCollectionIds(): Array<string | number> {
    let returnIds: Array<string | number> = [];
    for (let p = 1; p <= this.page; p++) {
      if (this.pageMapIds[p] !== undefined && this.pageMapIds[p] !== null) {
        returnIds = returnIds.concat(this.pageMapIds[p]);
      }
    }
    return returnIds;
  }
  public get infiniteCollection(): Array<TStore | null> {
    return this.infiniteCollectionIds.map((id) => {
      const item = this.collection.getItem(id);
      if (item !== undefined && item !== null) {
        return item;
      } else {
        return null;
      }
    });
  }
  // actions -------------------------------------------------
  public setPage(pageNumber: number): void {
    const old: IPageInfo | undefined = this.pageMapInfo[pageNumber];
    if (old === undefined || old === null) {
      this.pageMapInfo[pageNumber] = {
        page: pageNumber,
      };
    } else {
      old.page = pageNumber;
      this.pageMapInfo[pageNumber] = old;
    }
    // ----
    this.page = pageNumber;
    this.notify();
  }
  public nextPage(): void {
    if (this.page < this.pageCount) {
      this.loadPage(this.page + 1);
      this.setPage(this.page);
    }
    this.notify();
  }
  public prevPage(): void {
    if (this.page > 1) {
      this.loadPage(this.page - 1);
      this.setPage(this.page - 1);
    }
    this.notify();
  }
  public loadPage(pageNumber: number): void {
    if (!Is.nullOrUndefined(this.pageInfo)) {
      if (!Is.empty(this.pageInfo.pageUrlTemplate)) {
        const loadUrl: string = this.pageInfo.pageUrlTemplate!.toLowerCase().replace("{{page}}", pageNumber.toString());
        FetchInjection.getFetchAction()(loadUrl);
      }
    }
    this.notify();
  }
  public get pageInfo(): IPageInfo {
    return this.pageMapInfo[this.page] || { page: this.page };
    // return this.pageMapInfo[this.page];
  }
  // items controller
  public setItem(item: TStore) {
    this.collection.setItem(item);
    this.notify();
  }
  public getItem(id: string | number) {
    return this.collection.getItem(id.toString());
  }
  public removeItem(id: string | number) {
    const item = this.getItem(id);
    if (item !== undefined && item !== null) {
      this.collection.removeItem(id.toString());
      return true;
    } else {
      return false; // remove success
    }
  }
  public removeItems(ids: Array<string | number>): void {
    ids.forEach((id: number | string) => {
      this.removeItem(id);
    });
    this.notify();
  }
  public setItems(items: TStore[]): void {
    const hasItems: boolean = !Is.nullOrUndefined(items);
    const pageIds: Array<string | number> = [];
    if (hasItems) {
      items.forEach((item: TStore) => {
        this.setItem(item);
        pageIds.push(item[this.idFieldName]);
      });
    }
    this.notify();
  }
  public setPaginatedList(paginatedList: IPaginatedListParameter<TStore>): void {
    if (!Is.nullOrUndefined(this.pageUrlTemplate)) {
      if (paginatedList.pageUrlTemplate.toLowerCase() !== this.pageUrlTemplate!.toLowerCase()) {
        this.invalidateList();
      }
    }
    const hasItems: boolean = !Is.nullOrUndefined(paginatedList.items);
    const pageIds: Array<string | number> = [];
    if (hasItems) {
      paginatedList.items.forEach((item: TStore) => {
        this.setItem(item);
        pageIds.push(item[this.idFieldName]);
      });
    }
    if (paginatedList.page > -1) {
      if (paginatedList.page > 1) {
        this.page = paginatedList.page;
      }
      // this.pageMapIds.set(paginatedList.page, pageIds);
      this.pageMapIds[paginatedList.page] = pageIds;
    }
    if (paginatedList.page === 1) {
      if (!Is.nullOrUndefined(paginatedList.pageUrlTemplate)) {
        if (!Is.nullOrUndefined(this.pageInfo)) {
          if (this.pageInfo.pageUrlTemplate!.toLowerCase() !== paginatedList.pageUrlTemplate.toLowerCase()) {
            this.setPage(1);
          }
        }
      }
    }
    if (paginatedList.rowsByPage > -1) { this.rowsByPage = paginatedList.rowsByPage; }
    if (paginatedList.pageCount > -1) { this.pageCount = paginatedList.pageCount; }
    if (paginatedList.count > -1) { this.count = paginatedList.count; }
    if (paginatedList.skip > -1) { this.skip = paginatedList.skip; }

    // -------------------
    this.pageMapInfo[paginatedList.page] = {
    // this.pageMapInfo.set(paginatedList.page, {
      nextPage: paginatedList.nextPage,
      prevPage: paginatedList.prevPage,
      rowsByPage: paginatedList.rowsByPage,
      nextPageUrl: paginatedList.nextPageUrl,
      prevPageUrl: paginatedList.prevPageUrl,
      page: paginatedList.page,
      pageUrl: paginatedList.pageUrl,
      pageUrlTemplate: paginatedList.pageUrlTemplate,
      skip: paginatedList.skip,
    };
    this.notify();
  }
  public invalidateList(): void {
    console.warn("invalidade list need to be tested");
    // ----------
    for (const key in this.pageMapIds) {
      if (this.pageMapIds.hasOwnProperty(key)) {
        // this.pageMapIds[key] = undefined;
        delete this.pageMapIds[key];
      }
    }
    for (const key in this.pageMapInfo) {
      if (this.pageMapInfo.hasOwnProperty(key)) {
        // this.pageMapInfo[key] = undefined;
        delete this.pageMapInfo[key];
      }
    }
    // ------------
    this.notify();
  }
}
export abstract class Collection<TStore extends Store<TStore>> extends Store<TStore> {
  public paginatedLists: { [name: string]: PaginatedList<TStore>; } = {};
  // public paginatedLists: Map<string, PaginatedList<TStore>> = new Map<string, PaginatedList<TStore>>();
  public items: { [id: string]: TStore; } = {};
  // public items: Map<string, TStore> = new Map<string, TStore>();
  private type: typeof Store | null = null;
  private idFieldName: string;
  constructor(rootStore: RootStore | undefined, type: typeof Store, idFieldName: "id" | "name" | "string" | string = "id") {
    super(rootStore);
    this.type = type;
    this.idFieldName = idFieldName;
  }
  public get defaultCollection() {
    return this.paginatedLists["default"];
  }
  public getPaginatedList(name: string): PaginatedList<TStore> {
    this.ensurePaginatedList(name);
    return this.paginatedLists[name];
  }
  public setItem(item: any, root?: RootStore) {
    if (item !== null && item !== undefined) {
      this.items[item[this.idFieldName].toString()] = new (this.type as any)(this);
      plainToClassFromExist(this.items[item[this.idFieldName].toString()], item, { enableCircularCheck: true });
      this.notify();
    }
  }
  public getItem(id: string | number): TStore | undefined {
    // return this.items.get(id.toString());
    return this.items[id.toString()];
  }
  public removeItem(id: string | number) {
    const item = this.getItem(id);
    if (item !== undefined && item !== null) {
      // this.items.delete(id.toString());
      delete this.items[id.toString()];
      this.notify();
      return true;
    } else {
      this.notify();
      return false; // remove success
    }
  }
  public removeItems(ids: Array<string | number>): void {
    ids.forEach((id: number | string) => {
      this.removeItem(id);
    });
  }
  public collectGarbage(): void {
    let ids: Array<string | number> = [];
    for (const name in this.paginatedLists) {
      if (this.paginatedLists.hasOwnProperty(name)) {
        // const paginatedList = this.paginatedLists.get(name);
        const paginatedList = this.paginatedLists[name];
        if (paginatedList) {
          ids = ids.concat(paginatedList.pageCollectionIds);
        }
        // ids = ids.concat(paginatedList.pageCollectionIds);
      }
    }
    for (const id in this.items) {
      if (this.items.hasOwnProperty(id)) {
        const item = this.items[id];
        // const item = this.items.get(id);
        if (ids.indexOf(id) === -1) {
          this.removeItem(id);
        }
      }
    }
    this.notify();
  }
  public ensurePaginatedList(name: string, create: boolean = true): boolean {
    if (!this.paginatedLists[name]) {
      if (create) {
        // this.paginatedLists.set(name, new PaginatedList(name, this, this.idFieldName));
        this.paginatedLists[name] = new PaginatedList(name, this, this.idFieldName);
        this.notify();
        return true;
      }
      return false;
    } else {
      return true;
    }
  }
}
