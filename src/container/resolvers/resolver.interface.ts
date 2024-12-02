import { Provider } from "../dto/provider.dto";
import { Resolved } from "../dto/resolved.dto";
import { Token } from "../types/token.type";

export interface ResolverInterface {
  resolve:<T>(provider: Provider, token: Token) => Promise<Resolved<T>>;
  shouldResolve: (provider: Provider) => boolean;
}
