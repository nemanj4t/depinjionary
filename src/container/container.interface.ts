import { Token } from "./types/token.type";

export interface ContainerInterface {
  resolve<T>(token: Token): Promise<T>;
}