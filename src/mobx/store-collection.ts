import { action, observable, computed, observe, ObservableMap, intercept } from "mobx";
import { Store } from "./store";
import { RootStore } from "./main";
import { plainToClass, classToClass, plainToClassFromExist } from "class-transformer";
import { Is, Reflection } from "utility-collection";
import { Generic } from "./generic";
import { FetchAction, FetchInjection } from "./fetch-injection";
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
  public name: string; // the name of the collections (Ex.: favoriteRestaurantes, )
  public collection: Collection<TStore>;
  public idFieldName: string;
  // @observable private pageInfo: IPageInfo = null;
  @observable public pageMapIds: { [page: number]: Array<string | number> } = {};
  @observable public pageMapInfo: { [page: number]: IPageInfo; } = {};
  @observable public pageUrlTemplate: string | null = null;
  @observable public count: number = -1;
  @observable private skip: number = 0;
  @observable private rowsByPage: number = 100000; // Rows or PageSize
  @observable private page: number = 1;
  @observable private pageCount: number = 0;
  private pageUrlTemplateDisposer: any = null;
  // ---------------
  constructor(name: string, collection: Collection<TStore>, idFieldName: string) {
    super(collection);
    this.name = name;
    this.collection = collection;
    this.idFieldName = idFieldName;
    // console.error("when pageUrlTEmplate change need to set page to 1");
  }
  // computed -------------------------------------------------
  @computed public get pageCollectionIds(): Array<string | number> {
    if (this.pageMapIds[this.page] !== undefined && this.pageMapIds[this.page] !== null) {
      return this.pageMapIds[this.page];
    } else {
      return [];
    }
  }
  @computed public get pageCollection(): Array<TStore | null> {
    return this.pageCollectionIds.map((id) => {
      const item: TStore | null = this.collection.getItem(id);
      if (item !== undefined && item !== null) {
        return item;
      } else {
        return null;
      }
    });
  }
  @computed public get infiniteCollectionIds(): Array<string | number> {
    let returnIds: Array<string | number> = [];
    for (let p = 1; p <= this.page; p++) {
      if (this.pageMapIds[p] !== undefined && this.pageMapIds[p] !== null) {
        returnIds = returnIds.concat(this.pageMapIds[p]);
      }
    }
    return returnIds;
  }
  @computed public get infiniteCollection(): Array<TStore | null> {
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
  @action public setPage(pageNumber: number): void {
    if (Is.nullOrUndefined(this.pageMapInfo[pageNumber])) {
      this.pageMapInfo[this.page] = {
        page: this.page,
      };
    }
    this.page = pageNumber;
    this.update();
  }
  @action public nextPage(): void {
    if (this.page < this.pageCount) {
      this.loadPage(this.page + 1);
      this.setPage(this.page);
    }
  }
  @action public prevPage(): void {
    if (this.page > 1) {
      this.loadPage(this.page - 1);
      this.setPage(this.page - 1);
    }
  }
  @action public loadPage(pageNumber: number): void {
    if (!Is.nullOrUndefined(this.pageInfo)) {
      if (!Is.empty(this.pageInfo.pageUrlTemplate)) {
        const loadUrl: string = this.pageInfo.pageUrlTemplate!.toLowerCase().replace("{{page}}", pageNumber.toString());
        FetchInjection.getFetchAction()(loadUrl);
      }
    }
  }

  @computed public get pageInfo(): IPageInfo {
    return this.pageMapInfo[this.page];
  }
  // @action public setCurrentPage(currentPage: number, rowsByPage: number = -1, pageCount: number = -1): void {
  // 	if (rowsByPage > -1 && rowsByPage !== null) {
  // 		this.rowsByPage = rowsByPage;
  // 	}
  // 	if (pageCount > -1 && pageCount !== null) {
  // 		this.pageCount = pageCount;
  // 	}
  // 	this.skip = (currentPage - 1) * this.rowsByPage;
  // 	this.page = currentPage;
  // }
  // items controller
  @action public setItem(item: TStore) {
    this.collection.setItem(item);
    this.update();
  }
  @action public getItem(id: string | number) {
    return this.collection.getItem(id.toString());
  }
  @action public removeItem(id: string | number) {
    const item = this.getItem(id);
    if (item !== undefined && item !== null) {
      this.collection.removeItem(id.toString());
      return true;
    } else {
      return false; // remove success
    }
  }
  @action public removeItems(ids: Array<string | number>): void {
    ids.forEach((id: number | string) => {
      this.removeItem(id);
    });
  }
  // @action public setItems(items: TStore[], page: number = -1, rowsByPage: number = -1, pageCount: number = -1, count: number = -1): void {
  @action public setItems(items: TStore[]): void {
    const hasItems: boolean = !Is.nullOrUndefined(items);
    const pageIds: Array<string | number> = [];
    if (hasItems) {
      items.forEach((item: TStore) => {
        this.setItem(item);
        pageIds.push(item[this.idFieldName]);
      });
    }
    this.update();
  }
  @action public setPaginatedList(paginatedList: IPaginatedListParameter<TStore>): void {
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
    this.update();
  }
  @action public invalidateList(): void {
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
    this.update();
  }
}
export abstract class Collection<TStore extends Store<TStore>> extends Store<TStore> {
  @observable public paginatedLists: { [name: string]: PaginatedList<TStore>; } = {};
  @observable public items: { [id: string]: TStore; } = {};
  private type: typeof Store | null = null;
  private idFieldName: string;
  constructor(rootStore: RootStore | undefined, type: typeof Store, idFieldName: "id" | "name" | "string" | string = "id") {
    super(rootStore);
    this.type = type;
    this.idFieldName = idFieldName;
  }
  @computed public get defaultCollection() {
    return this.paginatedLists["default"];
  }
  @action public getPaginatedList(name: string): PaginatedList<TStore> {
    this.ensurePaginatedList(name);
    return this.paginatedLists[name];
  }
  @action public setItem(item: any, root?: RootStore) {
    if (item !== null && item !== undefined) {
      this.items[item[this.idFieldName].toString()] = new (this.type as any)(this);
      plainToClassFromExist(this.items[item[this.idFieldName].toString()], item, { enableCircularCheck: true });
      // this.items[item[this.idFieldName].toString()] = t;
      // console.log("----");
      // console.log(this.items[item[this.idFieldName].toString()]);
      this.update();
    }
  }
  @action public getItem(id: string | number): TStore {
    return this.items[id.toString()];
  }
  @action public removeItem(id: string | number) {
    const item = this.getItem(id);
    if (item !== undefined && item !== null) {
      delete this.items[id.toString()];
      this.update();
      return true;
    } else {
      this.update();
      return false; // remove success
    }
  }
  @action public removeItems(ids: Array<string | number>): void {
    ids.forEach((id: number | string) => {
      this.removeItem(id);
    });
  }
  @action public collectGarbage(): void {
    let ids: Array<string | number> = [];
    for (const name in this.paginatedLists) {
      if (this.paginatedLists.hasOwnProperty(name)) {
        const paginatedList = this.paginatedLists[name];
        ids = ids.concat(paginatedList.pageCollectionIds);
      }
    }
    for (const id in this.items) {
      if (this.items.hasOwnProperty(id)) {
        const item = this.items[id];
        if (ids.indexOf(id) === -1) {
          this.removeItem(id);
        }
      }
    }
    this.update();
  }
  @action public ensurePaginatedList(name: string, create: boolean = true): boolean {
    if (Is.nullOrUndefined(this.paginatedLists[name])) {
      if (create) {
        this.paginatedLists[name] = new PaginatedList(name, this, this.idFieldName);
        this.update();
        return true;
      }
      return false;
    } else {
      // this.update();
      return true;
    }
  }
}
