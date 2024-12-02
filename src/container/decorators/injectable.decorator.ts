import { Type } from "../enums/type.enum";

export function Injectable(options = { type: Type.SINGLETON }) {
  return function (target: any) {
    Reflect.defineMetadata('injectable', true, target);
    Reflect.defineMetadata('type', options.type, target);
  };
}
