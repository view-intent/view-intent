"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const store_1 = require("./store");
const main_1 = require("./main");
const class_transformer_1 = require("class-transformer");
const utility_collection_1 = require("utility-collection");
const generic_1 = require("./generic");
const fetch_injection_1 = require("./fetch-injection");
class PaginatedList extends generic_1.Generic {
    // ---------------
    constructor(name, collection, idFieldName) {
        super(collection);
        // @observable private pageInfo: IPageInfo = null;
        this.pageMapIds = {};
        this.pageMapInfo = {};
        this.pageUrlTemplate = null;
        this.count = -1;
        this.skip = 0;
        this.rowsByPage = 100000; // Rows or PageSize
        this.page = 1;
        this.pageCount = 0;
        this.pageUrlTemplateDisposer = null;
        this.name = name;
        this.collection = collection;
        this.idFieldName = idFieldName;
        // console.error("when pageUrlTEmplate change need to set page to 1");
    }
    // computed -------------------------------------------------
    get pageCollectionIds() {
        if (this.pageMapIds[this.page] !== undefined && this.pageMapIds[this.page] !== null) {
            return this.pageMapIds[this.page];
        }
        else {
            return [];
        }
    }
    get pageCollection() {
        return this.pageCollectionIds.map((id) => {
            const item = this.collection.getItem(id);
            if (item !== undefined && item !== null) {
                return item;
            }
            else {
                return null;
            }
        });
    }
    get infiniteCollectionIds() {
        let returnIds = [];
        for (let p = 1; p <= this.page; p++) {
            if (this.pageMapIds[p] !== undefined && this.pageMapIds[p] !== null) {
                returnIds = returnIds.concat(this.pageMapIds[p]);
            }
        }
        return returnIds;
    }
    get infiniteCollection() {
        return this.infiniteCollectionIds.map((id) => {
            const item = this.collection.getItem(id);
            if (item !== undefined && item !== null) {
                return item;
            }
            else {
                return null;
            }
        });
    }
    // actions -------------------------------------------------
    setPage(pageNumber) {
        if (utility_collection_1.Is.nullOrUndefined(this.pageMapInfo[pageNumber])) {
            this.pageMapInfo[this.page] = {
                page: this.page,
            };
        }
        this.page = pageNumber;
        this.update();
    }
    nextPage() {
        if (this.page < this.pageCount) {
            this.loadPage(this.page + 1);
            this.setPage(this.page);
        }
    }
    prevPage() {
        if (this.page > 1) {
            this.loadPage(this.page - 1);
            this.setPage(this.page - 1);
        }
    }
    loadPage(pageNumber) {
        if (!utility_collection_1.Is.nullOrUndefined(this.pageInfo)) {
            if (!utility_collection_1.Is.empty(this.pageInfo.pageUrlTemplate)) {
                const loadUrl = this.pageInfo.pageUrlTemplate.toLowerCase().replace("{{page}}", pageNumber.toString());
                fetch_injection_1.FetchInjection.getFetchAction()(loadUrl);
            }
        }
    }
    get pageInfo() {
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
    setItem(item) {
        this.collection.setItem(item);
        this.update();
    }
    getItem(id) {
        return this.collection.getItem(id.toString());
    }
    removeItem(id) {
        const item = this.getItem(id);
        if (item !== undefined && item !== null) {
            this.collection.removeItem(id.toString());
            return true;
        }
        else {
            return false; // remove success
        }
    }
    removeItems(ids) {
        ids.forEach((id) => {
            this.removeItem(id);
        });
    }
    // @action public setItems(items: TStore[], page: number = -1, rowsByPage: number = -1, pageCount: number = -1, count: number = -1): void {
    setItems(items) {
        const hasItems = !utility_collection_1.Is.nullOrUndefined(items);
        const pageIds = [];
        if (hasItems) {
            items.forEach((item) => {
                this.setItem(item);
                pageIds.push(item[this.idFieldName]);
            });
        }
        this.update();
    }
    setPaginatedList(paginatedList) {
        if (!utility_collection_1.Is.nullOrUndefined(this.pageUrlTemplate)) {
            if (paginatedList.pageUrlTemplate.toLowerCase() !== this.pageUrlTemplate.toLowerCase()) {
                this.invalidateList();
            }
        }
        const hasItems = !utility_collection_1.Is.nullOrUndefined(paginatedList.items);
        const pageIds = [];
        if (hasItems) {
            paginatedList.items.forEach((item) => {
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
            if (!utility_collection_1.Is.nullOrUndefined(paginatedList.pageUrlTemplate)) {
                if (!utility_collection_1.Is.nullOrUndefined(this.pageInfo)) {
                    if (this.pageInfo.pageUrlTemplate.toLowerCase() !== paginatedList.pageUrlTemplate.toLowerCase()) {
                        this.setPage(1);
                    }
                }
            }
        }
        if (paginatedList.rowsByPage > -1) {
            this.rowsByPage = paginatedList.rowsByPage;
        }
        if (paginatedList.pageCount > -1) {
            this.pageCount = paginatedList.pageCount;
        }
        if (paginatedList.count > -1) {
            this.count = paginatedList.count;
        }
        if (paginatedList.skip > -1) {
            this.skip = paginatedList.skip;
        }
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
    invalidateList() {
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
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], PaginatedList.prototype, "pageMapIds", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], PaginatedList.prototype, "pageMapInfo", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], PaginatedList.prototype, "pageUrlTemplate", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PaginatedList.prototype, "count", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PaginatedList.prototype, "skip", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PaginatedList.prototype, "rowsByPage", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PaginatedList.prototype, "page", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PaginatedList.prototype, "pageCount", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], PaginatedList.prototype, "pageCollectionIds", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], PaginatedList.prototype, "pageCollection", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], PaginatedList.prototype, "infiniteCollectionIds", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], PaginatedList.prototype, "infiniteCollection", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "setPage", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "nextPage", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "prevPage", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "loadPage", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], PaginatedList.prototype, "pageInfo", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "setItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "getItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "removeItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "removeItems", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "setItems", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "setPaginatedList", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaginatedList.prototype, "invalidateList", null);
exports.PaginatedList = PaginatedList;
class Collection extends store_1.Store {
    constructor(rootStore, type, idFieldName = "id") {
        super(rootStore);
        this.paginatedLists = {};
        this.items = {};
        this.type = null;
        this.type = type;
        this.idFieldName = idFieldName;
    }
    get defaultCollection() {
        return this.paginatedLists["default"];
    }
    getPaginatedList(name) {
        this.ensurePaginatedList(name);
        return this.paginatedLists[name];
    }
    setItem(item, root) {
        if (item !== null && item !== undefined) {
            this.items[item[this.idFieldName].toString()] = new this.type(this);
            class_transformer_1.plainToClassFromExist(this.items[item[this.idFieldName].toString()], item, { enableCircularCheck: true });
            // this.items[item[this.idFieldName].toString()] = t;
            // console.log("----");
            // console.log(this.items[item[this.idFieldName].toString()]);
            this.update();
        }
    }
    getItem(id) {
        return this.items[id.toString()];
    }
    removeItem(id) {
        const item = this.getItem(id);
        if (item !== undefined && item !== null) {
            delete this.items[id.toString()];
            this.update();
            return true;
        }
        else {
            this.update();
            return false; // remove success
        }
    }
    removeItems(ids) {
        ids.forEach((id) => {
            this.removeItem(id);
        });
    }
    collectGarbage() {
        let ids = [];
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
    ensurePaginatedList(name, create = true) {
        if (utility_collection_1.Is.nullOrUndefined(this.paginatedLists[name])) {
            if (create) {
                this.paginatedLists[name] = new PaginatedList(name, this, this.idFieldName);
                this.update();
                return true;
            }
            return false;
        }
        else {
            // this.update();
            return true;
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Collection.prototype, "paginatedLists", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Collection.prototype, "items", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Collection.prototype, "defaultCollection", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", PaginatedList)
], Collection.prototype, "getPaginatedList", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, main_1.RootStore]),
    __metadata("design:returntype", void 0)
], Collection.prototype, "setItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], Collection.prototype, "getItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Collection.prototype, "removeItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], Collection.prototype, "removeItems", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Collection.prototype, "collectGarbage", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Boolean)
], Collection.prototype, "ensurePaginatedList", null);
exports.Collection = Collection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2J4L3N0b3JlLWNvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrQkFBdUY7QUFDdkYsbUNBQWdDO0FBQ2hDLGlDQUFtQztBQUNuQyx5REFBc0Y7QUFDdEYsMkRBQW9EO0FBQ3BELHVDQUFvQztBQUNwQyx1REFBZ0U7QUFzQ2hFLG1CQUF5RCxTQUFRLGlCQUFPO0lBY3RFLGtCQUFrQjtJQUNsQixZQUFZLElBQVksRUFBRSxVQUE4QixFQUFFLFdBQW1CO1FBQzNFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQVpwQixrREFBa0Q7UUFDL0IsZUFBVSxHQUErQyxFQUFFLENBQUM7UUFDNUQsZ0JBQVcsR0FBbUMsRUFBRSxDQUFDO1FBQ2pELG9CQUFlLEdBQWtCLElBQUksQ0FBQztRQUN0QyxVQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixlQUFVLEdBQVcsTUFBTSxDQUFDLENBQUMsbUJBQW1CO1FBQ2hELFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUNsQyw0QkFBdUIsR0FBUSxJQUFJLENBQUM7UUFJMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0Isc0VBQXNFO0lBQ3hFLENBQUM7SUFDRCw2REFBNkQ7SUFDbkQsSUFBVyxpQkFBaUI7UUFDcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25GLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7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SUFDaEIsQ0FBQztJQUNjLG1CQUFtQixDQUFDLElBQVksRUFBRSxTQUFrQixJQUFJO1FBQ3JFLElBQUksdUJBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2pELElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsaUJBQWlCO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0Y7QUE1RWE7SUFBWCxpQkFBVTs7a0RBQXdFO0FBQ3ZFO0lBQVgsaUJBQVU7O3lDQUE4QztBQVEvQztJQUFULGVBQVE7OzttREFFUjtBQUNPO0lBQVAsYUFBTTs7O29DQUF3QyxhQUFhO2tEQUczRDtBQUNPO0lBQVAsYUFBTTs7NkNBQWtDLGdCQUFTOzt5Q0FTakQ7QUFDTztJQUFQLGFBQU07Ozs7eUNBRU47QUFDTztJQUFQLGFBQU07Ozs7NENBVU47QUFDTztJQUFQLGFBQU07O3FDQUF5QixLQUFLOzs2Q0FJcEM7QUFDTztJQUFQLGFBQU07Ozs7Z0RBaUJOO0FBQ087SUFBUCxhQUFNOzs7O3FEQVlOO0FBNUVILGdDQTZFQyIsImZpbGUiOiJtb2J4L3N0b3JlLWNvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3Rpb24sIG9ic2VydmFibGUsIGNvbXB1dGVkLCBvYnNlcnZlLCBPYnNlcnZhYmxlTWFwLCBpbnRlcmNlcHQgfSBmcm9tIFwibW9ieFwiO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCIuL3N0b3JlXCI7XHJcbmltcG9ydCB7IFJvb3RTdG9yZSB9IGZyb20gXCIuL21haW5cIjtcclxuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzLCBjbGFzc1RvQ2xhc3MsIHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xyXG5pbXBvcnQgeyBJcywgUmVmbGVjdGlvbiB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgR2VuZXJpYyB9IGZyb20gXCIuL2dlbmVyaWNcIjtcclxuaW1wb3J0IHsgRmV0Y2hBY3Rpb24sIEZldGNoSW5qZWN0aW9uIH0gZnJvbSBcIi4vZmV0Y2gtaW5qZWN0aW9uXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2luYXRlZExpc3RQYXJhbWV0ZXI8VD4ge1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICByb3dzQnlQYWdlOiBudW1iZXI7XHJcbiAgY291bnQ6IG51bWJlcjtcclxuICBza2lwOiBudW1iZXI7XHJcbiAgcGFnZUNvdW50OiBudW1iZXI7XHJcbiAgcHJldlBhZ2U6IG51bWJlcjtcclxuICBuZXh0UGFnZTogbnVtYmVyO1xyXG4gIC8vIGl0ZW1zXHJcbiAgaXRlbXM6IFRbXTtcclxuICAvLyBwYWdlVXJsXHJcbiAgcGFnZVVybDogc3RyaW5nO1xyXG4gIG5leHRQYWdlVXJsOiBzdHJpbmc7XHJcbiAgcHJldlBhZ2VVcmw6IHN0cmluZztcclxuICBwYWdlVXJsVGVtcGxhdGU6IHN0cmluZztcclxuICAvLyBuZWlnaGJvciAtLS0tXHJcbiAgbmVpZ2hib3JQYWdlc0NvdW50PzogbnVtYmVyO1xyXG4gIG5leHRQYWdlcz86IG51bWJlcltdO1xyXG4gIHByZXZQYWdlcz86IG51bWJlcltdO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VJbmZvIHtcclxuICBwYWdlOiBudW1iZXI7XHJcbiAgcm93c0J5UGFnZT86IG51bWJlcjsgLy8gZ2VyYWxcclxuICAvLyBjb3VudDogbnVtYmVyOyAvLyBnZXJhbFxyXG4gIHNraXA/OiBudW1iZXI7IC8vIGdlcmFsXHJcbiAgLy8gcGFnZUNvdW50OiBudW1iZXI7IC8vIGdlcmFsXHJcbiAgcHJldlBhZ2U/OiBudW1iZXI7XHJcbiAgbmV4dFBhZ2U/OiBudW1iZXI7XHJcbiAgcGFnZVVybD86IHN0cmluZztcclxuICBuZXh0UGFnZVVybD86IHN0cmluZztcclxuICBwcmV2UGFnZVVybD86IHN0cmluZztcclxuICBwYWdlVXJsVGVtcGxhdGU/OiBzdHJpbmc7IC8vIGdlcmFsXHJcbiAgLy8gbmVpZ2hib3IgLS0tLVxyXG4gIG5laWdoYm9yUGFnZXNDb3VudD86IG51bWJlcjtcclxuICBuZXh0UGFnZXM/OiBudW1iZXJbXTtcclxuICBwcmV2UGFnZXM/OiBudW1iZXJbXTtcclxufVxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdGVkTGlzdDxUU3RvcmUgZXh0ZW5kcyBTdG9yZTxUU3RvcmU+PiBleHRlbmRzIEdlbmVyaWMge1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7IC8vIHRoZSBuYW1lIG9mIHRoZSBjb2xsZWN0aW9ucyAoRXguOiBmYXZvcml0ZVJlc3RhdXJhbnRlcywgKVxyXG4gIHB1YmxpYyBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uPFRTdG9yZT47XHJcbiAgcHVibGljIGlkRmllbGROYW1lOiBzdHJpbmc7XHJcbiAgLy8gQG9ic2VydmFibGUgcHJpdmF0ZSBwYWdlSW5mbzogSVBhZ2VJbmZvID0gbnVsbDtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgcGFnZU1hcElkczogeyBbcGFnZTogbnVtYmVyXTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiB9ID0ge307XHJcbiAgQG9ic2VydmFibGUgcHVibGljIHBhZ2VNYXBJbmZvOiB7IFtwYWdlOiBudW1iZXJdOiBJUGFnZUluZm87IH0gPSB7fTtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgcGFnZVVybFRlbXBsYXRlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgY291bnQ6IG51bWJlciA9IC0xO1xyXG4gIEBvYnNlcnZhYmxlIHByaXZhdGUgc2tpcDogbnVtYmVyID0gMDtcclxuICBAb2JzZXJ2YWJsZSBwcml2YXRlIHJvd3NCeVBhZ2U6IG51bWJlciA9IDEwMDAwMDsgLy8gUm93cyBvciBQYWdlU2l6ZVxyXG4gIEBvYnNlcnZhYmxlIHByaXZhdGUgcGFnZTogbnVtYmVyID0gMTtcclxuICBAb2JzZXJ2YWJsZSBwcml2YXRlIHBhZ2VDb3VudDogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIHBhZ2VVcmxUZW1wbGF0ZURpc3Bvc2VyOiBhbnkgPSBudWxsO1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY29sbGVjdGlvbjogQ29sbGVjdGlvbjxUU3RvcmU+LCBpZEZpZWxkTmFtZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcihjb2xsZWN0aW9uKTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xyXG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkRmllbGROYW1lO1xyXG4gICAgLy8gY29uc29sZS5lcnJvcihcIndoZW4gcGFnZVVybFRFbXBsYXRlIGNoYW5nZSBuZWVkIHRvIHNldCBwYWdlIHRvIDFcIik7XHJcbiAgfVxyXG4gIC8vIGNvbXB1dGVkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBAY29tcHV0ZWQgcHVibGljIGdldCBwYWdlQ29sbGVjdGlvbklkcygpOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHtcclxuICAgIGlmICh0aGlzLnBhZ2VNYXBJZHNbdGhpcy5wYWdlXSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucGFnZU1hcElkc1t0aGlzLnBhZ2VdICE9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhZ2VNYXBJZHNbdGhpcy5wYWdlXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcbiAgQGNvbXB1dGVkIHB1YmxpYyBnZXQgcGFnZUNvbGxlY3Rpb24oKTogQXJyYXk8VFN0b3JlIHwgbnVsbD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb25JZHMubWFwKChpZCkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtOiBUU3RvcmUgfCBudWxsID0gdGhpcy5jb2xsZWN0aW9uLmdldEl0ZW0oaWQpO1xyXG4gICAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0gIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIEBjb21wdXRlZCBwdWJsaWMgZ2V0IGluZmluaXRlQ29sbGVjdGlvbklkcygpOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHtcclxuICAgIGxldCByZXR1cm5JZHM6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcclxuICAgIGZvciAobGV0IHAgPSAxOyBwIDw9IHRoaXMucGFnZTsgcCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLnBhZ2VNYXBJZHNbcF0gIT09IHVuZGVmaW5lZCAmJiB0aGlzLnBhZ2VNYXBJZHNbcF0gIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm5JZHMgPSByZXR1cm5JZHMuY29uY2F0KHRoaXMucGFnZU1hcElkc1twXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5JZHM7XHJcbiAgfVxyXG4gIEBjb21wdXRlZCBwdWJsaWMgZ2V0IGluZmluaXRlQ29sbGVjdGlvbigpOiBBcnJheTxUU3RvcmUgfCBudWxsPiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmZpbml0ZUNvbGxlY3Rpb25JZHMubWFwKChpZCkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5jb2xsZWN0aW9uLmdldEl0ZW0oaWQpO1xyXG4gICAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0gIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8vIGFjdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIEBhY3Rpb24gcHVibGljIHNldFBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoSXMubnVsbE9yVW5kZWZpbmVkKHRoaXMucGFnZU1hcEluZm9bcGFnZU51bWJlcl0pKSB7XHJcbiAgICAgIHRoaXMucGFnZU1hcEluZm9bdGhpcy5wYWdlXSA9IHtcclxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlTnVtYmVyO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgbmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYWdlIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgdGhpcy5sb2FkUGFnZSh0aGlzLnBhZ2UgKyAxKTtcclxuICAgICAgdGhpcy5zZXRQYWdlKHRoaXMucGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHByZXZQYWdlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFnZSA+IDEpIHtcclxuICAgICAgdGhpcy5sb2FkUGFnZSh0aGlzLnBhZ2UgLSAxKTtcclxuICAgICAgdGhpcy5zZXRQYWdlKHRoaXMucGFnZSAtIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuICBAYWN0aW9uIHB1YmxpYyBsb2FkUGFnZShwYWdlTnVtYmVyOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICghSXMubnVsbE9yVW5kZWZpbmVkKHRoaXMucGFnZUluZm8pKSB7XHJcbiAgICAgIGlmICghSXMuZW1wdHkodGhpcy5wYWdlSW5mby5wYWdlVXJsVGVtcGxhdGUpKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZFVybDogc3RyaW5nID0gdGhpcy5wYWdlSW5mby5wYWdlVXJsVGVtcGxhdGUhLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcInt7cGFnZX19XCIsIHBhZ2VOdW1iZXIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgRmV0Y2hJbmplY3Rpb24uZ2V0RmV0Y2hBY3Rpb24oKShsb2FkVXJsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIHB1YmxpYyBnZXQgcGFnZUluZm8oKTogSVBhZ2VJbmZvIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2VNYXBJbmZvW3RoaXMucGFnZV07XHJcbiAgfVxyXG4gIC8vIEBhY3Rpb24gcHVibGljIHNldEN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlOiBudW1iZXIsIHJvd3NCeVBhZ2U6IG51bWJlciA9IC0xLCBwYWdlQ291bnQ6IG51bWJlciA9IC0xKTogdm9pZCB7XHJcbiAgLy8gXHRpZiAocm93c0J5UGFnZSA+IC0xICYmIHJvd3NCeVBhZ2UgIT09IG51bGwpIHtcclxuICAvLyBcdFx0dGhpcy5yb3dzQnlQYWdlID0gcm93c0J5UGFnZTtcclxuICAvLyBcdH1cclxuICAvLyBcdGlmIChwYWdlQ291bnQgPiAtMSAmJiBwYWdlQ291bnQgIT09IG51bGwpIHtcclxuICAvLyBcdFx0dGhpcy5wYWdlQ291bnQgPSBwYWdlQ291bnQ7XHJcbiAgLy8gXHR9XHJcbiAgLy8gXHR0aGlzLnNraXAgPSAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMucm93c0J5UGFnZTtcclxuICAvLyBcdHRoaXMucGFnZSA9IGN1cnJlbnRQYWdlO1xyXG4gIC8vIH1cclxuICAvLyBpdGVtcyBjb250cm9sbGVyXHJcbiAgQGFjdGlvbiBwdWJsaWMgc2V0SXRlbShpdGVtOiBUU3RvcmUpIHtcclxuICAgIHRoaXMuY29sbGVjdGlvbi5zZXRJdGVtKGl0ZW0pO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgZ2V0SXRlbShpZDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmdldEl0ZW0oaWQudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHJlbW92ZUl0ZW0oaWQ6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XHJcbiAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0gIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5jb2xsZWN0aW9uLnJlbW92ZUl0ZW0oaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlOyAvLyByZW1vdmUgc3VjY2Vzc1xyXG4gICAgfVxyXG4gIH1cclxuICBAYWN0aW9uIHB1YmxpYyByZW1vdmVJdGVtcyhpZHM6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pOiB2b2lkIHtcclxuICAgIGlkcy5mb3JFYWNoKChpZDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMucmVtb3ZlSXRlbShpZCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLy8gQGFjdGlvbiBwdWJsaWMgc2V0SXRlbXMoaXRlbXM6IFRTdG9yZVtdLCBwYWdlOiBudW1iZXIgPSAtMSwgcm93c0J5UGFnZTogbnVtYmVyID0gLTEsIHBhZ2VDb3VudDogbnVtYmVyID0gLTEsIGNvdW50OiBudW1iZXIgPSAtMSk6IHZvaWQge1xyXG4gIEBhY3Rpb24gcHVibGljIHNldEl0ZW1zKGl0ZW1zOiBUU3RvcmVbXSk6IHZvaWQge1xyXG4gICAgY29uc3QgaGFzSXRlbXM6IGJvb2xlYW4gPSAhSXMubnVsbE9yVW5kZWZpbmVkKGl0ZW1zKTtcclxuICAgIGNvbnN0IHBhZ2VJZHM6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcclxuICAgIGlmIChoYXNJdGVtcykge1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBUU3RvcmUpID0+IHtcclxuICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgcGFnZUlkcy5wdXNoKGl0ZW1bdGhpcy5pZEZpZWxkTmFtZV0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHNldFBhZ2luYXRlZExpc3QocGFnaW5hdGVkTGlzdDogSVBhZ2luYXRlZExpc3RQYXJhbWV0ZXI8VFN0b3JlPik6IHZvaWQge1xyXG4gICAgaWYgKCFJcy5udWxsT3JVbmRlZmluZWQodGhpcy5wYWdlVXJsVGVtcGxhdGUpKSB7XHJcbiAgICAgIGlmIChwYWdpbmF0ZWRMaXN0LnBhZ2VVcmxUZW1wbGF0ZS50b0xvd2VyQ2FzZSgpICE9PSB0aGlzLnBhZ2VVcmxUZW1wbGF0ZSEudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZUxpc3QoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgaGFzSXRlbXM6IGJvb2xlYW4gPSAhSXMubnVsbE9yVW5kZWZpbmVkKHBhZ2luYXRlZExpc3QuaXRlbXMpO1xyXG4gICAgY29uc3QgcGFnZUlkczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IFtdO1xyXG4gICAgaWYgKGhhc0l0ZW1zKSB7XHJcbiAgICAgIHBhZ2luYXRlZExpc3QuaXRlbXMuZm9yRWFjaCgoaXRlbTogVFN0b3JlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIHBhZ2VJZHMucHVzaChpdGVtW3RoaXMuaWRGaWVsZE5hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAocGFnaW5hdGVkTGlzdC5wYWdlID4gLTEpIHtcclxuICAgICAgaWYgKHBhZ2luYXRlZExpc3QucGFnZSA+IDEpIHtcclxuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdpbmF0ZWRMaXN0LnBhZ2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wYWdlTWFwSWRzW3BhZ2luYXRlZExpc3QucGFnZV0gPSBwYWdlSWRzO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhZ2luYXRlZExpc3QucGFnZSA9PT0gMSkge1xyXG4gICAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZChwYWdpbmF0ZWRMaXN0LnBhZ2VVcmxUZW1wbGF0ZSkpIHtcclxuICAgICAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZCh0aGlzLnBhZ2VJbmZvKSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMucGFnZUluZm8ucGFnZVVybFRlbXBsYXRlIS50b0xvd2VyQ2FzZSgpICE9PSBwYWdpbmF0ZWRMaXN0LnBhZ2VVcmxUZW1wbGF0ZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZSgxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYWdpbmF0ZWRMaXN0LnJvd3NCeVBhZ2UgPiAtMSkgeyB0aGlzLnJvd3NCeVBhZ2UgPSBwYWdpbmF0ZWRMaXN0LnJvd3NCeVBhZ2U7IH1cclxuICAgIGlmIChwYWdpbmF0ZWRMaXN0LnBhZ2VDb3VudCA+IC0xKSB7IHRoaXMucGFnZUNvdW50ID0gcGFnaW5hdGVkTGlzdC5wYWdlQ291bnQ7IH1cclxuICAgIGlmIChwYWdpbmF0ZWRMaXN0LmNvdW50ID4gLTEpIHsgdGhpcy5jb3VudCA9IHBhZ2luYXRlZExpc3QuY291bnQ7IH1cclxuICAgIGlmIChwYWdpbmF0ZWRMaXN0LnNraXAgPiAtMSkgeyB0aGlzLnNraXAgPSBwYWdpbmF0ZWRMaXN0LnNraXA7IH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnBhZ2VNYXBJbmZvW3BhZ2luYXRlZExpc3QucGFnZV0gPSB7XHJcbiAgICAgIG5leHRQYWdlOiBwYWdpbmF0ZWRMaXN0Lm5leHRQYWdlLFxyXG4gICAgICBwcmV2UGFnZTogcGFnaW5hdGVkTGlzdC5wcmV2UGFnZSxcclxuICAgICAgcm93c0J5UGFnZTogcGFnaW5hdGVkTGlzdC5yb3dzQnlQYWdlLFxyXG4gICAgICBuZXh0UGFnZVVybDogcGFnaW5hdGVkTGlzdC5uZXh0UGFnZVVybCxcclxuICAgICAgcHJldlBhZ2VVcmw6IHBhZ2luYXRlZExpc3QucHJldlBhZ2VVcmwsXHJcbiAgICAgIHBhZ2U6IHBhZ2luYXRlZExpc3QucGFnZSxcclxuICAgICAgcGFnZVVybDogcGFnaW5hdGVkTGlzdC5wYWdlVXJsLFxyXG4gICAgICBwYWdlVXJsVGVtcGxhdGU6IHBhZ2luYXRlZExpc3QucGFnZVVybFRlbXBsYXRlLFxyXG4gICAgICBza2lwOiBwYWdpbmF0ZWRMaXN0LnNraXAsXHJcbiAgICB9O1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgaW52YWxpZGF0ZUxpc3QoKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnBhZ2VNYXBJZHMpIHtcclxuICAgICAgaWYgKHRoaXMucGFnZU1hcElkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgLy8gdGhpcy5wYWdlTWFwSWRzW2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucGFnZU1hcElkc1trZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnBhZ2VNYXBJbmZvKSB7XHJcbiAgICAgIGlmICh0aGlzLnBhZ2VNYXBJbmZvLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAvLyB0aGlzLnBhZ2VNYXBJbmZvW2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucGFnZU1hcEluZm9ba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbGxlY3Rpb248VFN0b3JlIGV4dGVuZHMgU3RvcmU8VFN0b3JlPj4gZXh0ZW5kcyBTdG9yZTxUU3RvcmU+IHtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgcGFnaW5hdGVkTGlzdHM6IHsgW25hbWU6IHN0cmluZ106IFBhZ2luYXRlZExpc3Q8VFN0b3JlPjsgfSA9IHt9O1xyXG4gIEBvYnNlcnZhYmxlIHB1YmxpYyBpdGVtczogeyBbaWQ6IHN0cmluZ106IFRTdG9yZTsgfSA9IHt9O1xyXG4gIHByaXZhdGUgdHlwZTogdHlwZW9mIFN0b3JlIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBpZEZpZWxkTmFtZTogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKHJvb3RTdG9yZTogUm9vdFN0b3JlIHwgdW5kZWZpbmVkLCB0eXBlOiB0eXBlb2YgU3RvcmUsIGlkRmllbGROYW1lOiBcImlkXCIgfCBcIm5hbWVcIiB8IFwic3RyaW5nXCIgfCBzdHJpbmcgPSBcImlkXCIpIHtcclxuICAgIHN1cGVyKHJvb3RTdG9yZSk7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkRmllbGROYW1lO1xyXG4gIH1cclxuICBAY29tcHV0ZWQgcHVibGljIGdldCBkZWZhdWx0Q29sbGVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2luYXRlZExpc3RzW1wiZGVmYXVsdFwiXTtcclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgZ2V0UGFnaW5hdGVkTGlzdChuYW1lOiBzdHJpbmcpOiBQYWdpbmF0ZWRMaXN0PFRTdG9yZT4ge1xyXG4gICAgdGhpcy5lbnN1cmVQYWdpbmF0ZWRMaXN0KG5hbWUpO1xyXG4gICAgcmV0dXJuIHRoaXMucGFnaW5hdGVkTGlzdHNbbmFtZV07XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHNldEl0ZW0oaXRlbTogYW55LCByb290PzogUm9vdFN0b3JlKSB7XHJcbiAgICBpZiAoaXRlbSAhPT0gbnVsbCAmJiBpdGVtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pdGVtc1tpdGVtW3RoaXMuaWRGaWVsZE5hbWVdLnRvU3RyaW5nKCldID0gbmV3ICh0aGlzLnR5cGUgYXMgYW55KSh0aGlzKTtcclxuICAgICAgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KHRoaXMuaXRlbXNbaXRlbVt0aGlzLmlkRmllbGROYW1lXS50b1N0cmluZygpXSwgaXRlbSwgeyBlbmFibGVDaXJjdWxhckNoZWNrOiB0cnVlIH0pO1xyXG4gICAgICAvLyB0aGlzLml0ZW1zW2l0ZW1bdGhpcy5pZEZpZWxkTmFtZV0udG9TdHJpbmcoKV0gPSB0O1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS1cIik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaXRlbXNbaXRlbVt0aGlzLmlkRmllbGROYW1lXS50b1N0cmluZygpXSk7XHJcbiAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIGdldEl0ZW0oaWQ6IHN0cmluZyB8IG51bWJlcik6IFRTdG9yZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtc1tpZC50b1N0cmluZygpXTtcclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgcmVtb3ZlSXRlbShpZDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcclxuICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQgJiYgaXRlbSAhPT0gbnVsbCkge1xyXG4gICAgICBkZWxldGUgdGhpcy5pdGVtc1tpZC50b1N0cmluZygpXTtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7IC8vIHJlbW92ZSBzdWNjZXNzXHJcbiAgICB9XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHJlbW92ZUl0ZW1zKGlkczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPik6IHZvaWQge1xyXG4gICAgaWRzLmZvckVhY2goKGlkOiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5yZW1vdmVJdGVtKGlkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBAYWN0aW9uIHB1YmxpYyBjb2xsZWN0R2FyYmFnZSgpOiB2b2lkIHtcclxuICAgIGxldCBpZHM6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLnBhZ2luYXRlZExpc3RzKSB7XHJcbiAgICAgIGlmICh0aGlzLnBhZ2luYXRlZExpc3RzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGVkTGlzdCA9IHRoaXMucGFnaW5hdGVkTGlzdHNbbmFtZV07XHJcbiAgICAgICAgaWRzID0gaWRzLmNvbmNhdChwYWdpbmF0ZWRMaXN0LnBhZ2VDb2xsZWN0aW9uSWRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLml0ZW1zKSB7XHJcbiAgICAgIGlmICh0aGlzLml0ZW1zLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2lkXTtcclxuICAgICAgICBpZiAoaWRzLmluZGV4T2YoaWQpID09PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIGVuc3VyZVBhZ2luYXRlZExpc3QobmFtZTogc3RyaW5nLCBjcmVhdGU6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoSXMubnVsbE9yVW5kZWZpbmVkKHRoaXMucGFnaW5hdGVkTGlzdHNbbmFtZV0pKSB7XHJcbiAgICAgIGlmIChjcmVhdGUpIHtcclxuICAgICAgICB0aGlzLnBhZ2luYXRlZExpc3RzW25hbWVdID0gbmV3IFBhZ2luYXRlZExpc3QobmFtZSwgdGhpcywgdGhpcy5pZEZpZWxkTmFtZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
