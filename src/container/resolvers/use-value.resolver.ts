import { Provider } from "../dto/provider.dto";
import { ResolverInterface } from "./resolver.interface";
import { Resolved } from "../dto/resolved.dto";
import { Token } from "../types/token.type";

export class UseValueResolver implements ResolverInterface {
  shouldResolve(provider: Provider): boolean {
    return !!provider.useValue;
  }

  async resolve<T>(provider: Provider<T>, token: Token): Promise<Resolved<T>> {
    return {
      provide: token,
      resolution: provider.useValue!,
    };
  }
}
