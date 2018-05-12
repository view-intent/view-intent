// mobx ----------------------
// import { extras } from "mobx";
// extras.isolateGlobalState();
import * as mobx from "mobx";
// mobx.extras.shareGlobalState();
// mobx.configure({
// 	isolateGlobalState: true,
// });
export * from "mobx";
// serializer.ts -------------------
// import { serialize, classToClass, classToClassFromExist, classToPlain, classToPlainFromExist, ClassTransformer, Exclude,  } from "class-transformer";
// export { serialize, deserialize, Serializer, SerializerOptions } from "serializer.ts/Serializer";
// export { Skip, Type  } from "serializer.ts/Decorators";
// import { serialize, deserialize, deserializeArray, plainToClass, plainToClassFromExist } from "class-transformer";
export * from "class-transformer";

// local ---------------------------
export * from "./root-store";
export * from "./store-collection";
export * from "./store";
export * from "./store-persist";
export * from "./fetch-injection";
