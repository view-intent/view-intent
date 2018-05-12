"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// mobx.extras.shareGlobalState();
// mobx.configure({
// 	isolateGlobalState: true,
// });
__export(require("mobx"));
// serializer.ts -------------------
// import { serialize, classToClass, classToClassFromExist, classToPlain, classToPlainFromExist, ClassTransformer, Exclude,  } from "class-transformer";
// export { serialize, deserialize, Serializer, SerializerOptions } from "serializer.ts/Serializer";
// export { Skip, Type  } from "serializer.ts/Decorators";
// import { serialize, deserialize, deserializeArray, plainToClass, plainToClassFromExist } from "class-transformer";
__export(require("class-transformer"));
// local ---------------------------
__export(require("./root-store"));
__export(require("./store-collection"));
__export(require("./store"));
__export(require("./fetch-injection"));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2J4L21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSxrQ0FBa0M7QUFDbEMsbUJBQW1CO0FBQ25CLDZCQUE2QjtBQUM3QixNQUFNO0FBQ04sMEJBQXFCO0FBQ3JCLG9DQUFvQztBQUNwQyx3SkFBd0o7QUFDeEosb0dBQW9HO0FBQ3BHLDBEQUEwRDtBQUMxRCxxSEFBcUg7QUFDckgsdUNBQWtDO0FBRWxDLG9DQUFvQztBQUNwQyxrQ0FBNkI7QUFDN0Isd0NBQW1DO0FBQ25DLDZCQUF3QjtBQUV4Qix1Q0FBa0MiLCJmaWxlIjoibW9ieC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbW9ieCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIGltcG9ydCB7IGV4dHJhcyB9IGZyb20gXCJtb2J4XCI7XHJcbi8vIGV4dHJhcy5pc29sYXRlR2xvYmFsU3RhdGUoKTtcclxuaW1wb3J0ICogYXMgbW9ieCBmcm9tIFwibW9ieFwiO1xyXG4vLyBtb2J4LmV4dHJhcy5zaGFyZUdsb2JhbFN0YXRlKCk7XHJcbi8vIG1vYnguY29uZmlndXJlKHtcclxuLy8gXHRpc29sYXRlR2xvYmFsU3RhdGU6IHRydWUsXHJcbi8vIH0pO1xyXG5leHBvcnQgKiBmcm9tIFwibW9ieFwiO1xyXG4vLyBzZXJpYWxpemVyLnRzIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gaW1wb3J0IHsgc2VyaWFsaXplLCBjbGFzc1RvQ2xhc3MsIGNsYXNzVG9DbGFzc0Zyb21FeGlzdCwgY2xhc3NUb1BsYWluLCBjbGFzc1RvUGxhaW5Gcm9tRXhpc3QsIENsYXNzVHJhbnNmb3JtZXIsIEV4Y2x1ZGUsICB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xyXG4vLyBleHBvcnQgeyBzZXJpYWxpemUsIGRlc2VyaWFsaXplLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyT3B0aW9ucyB9IGZyb20gXCJzZXJpYWxpemVyLnRzL1NlcmlhbGl6ZXJcIjtcclxuLy8gZXhwb3J0IHsgU2tpcCwgVHlwZSAgfSBmcm9tIFwic2VyaWFsaXplci50cy9EZWNvcmF0b3JzXCI7XHJcbi8vIGltcG9ydCB7IHNlcmlhbGl6ZSwgZGVzZXJpYWxpemUsIGRlc2VyaWFsaXplQXJyYXksIHBsYWluVG9DbGFzcywgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0IH0gZnJvbSBcImNsYXNzLXRyYW5zZm9ybWVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xyXG5cclxuLy8gbG9jYWwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCAqIGZyb20gXCIuL3Jvb3Qtc3RvcmVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc3RvcmUtY29sbGVjdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zdG9yZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zdG9yZS1wZXJzaXN0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2ZldGNoLWluamVjdGlvblwiO1xyXG4iXX0=
