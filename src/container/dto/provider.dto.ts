import { Constructable } from "../types/constructable.type";
import { Token } from "../types/token.type";

export interface Provider<T = any> {
  provide: Token;
  useClass?: Constructable<T>;
  useValue?: T;
  injectTokens?: Token[];
  useFactory?: (...args: any[]) => T;
}
