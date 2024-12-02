import { Token } from "../types/token.type"

export interface Resolved<T = any> {
  provide: Token;
  resolution: T;
}
