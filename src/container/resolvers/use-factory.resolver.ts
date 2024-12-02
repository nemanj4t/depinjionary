import { Provider } from "../dto/provider.dto";
import { ResolverInterface } from "./resolver.interface";
import { Resolved } from "../dto/resolved.dto";
import { ContainerResolver } from "../container-resolver";
import { Token } from "../types/token.type";

export class UseFactoryResolver implements ResolverInterface {
  shouldResolve(provider: Provider): boolean {
    return !!(provider.useFactory);
  }

  async resolve<T>(provider: Provider<T>, token: Token): Promise<Resolved<T>> {
    const injectedTokens = provider.injectTokens ?? [];
    const resolutions = injectedTokens.map(token => ContainerResolver.get().resolve(token));

    return {
      provide: token,
      resolution: await provider.useFactory!(...await Promise.all(resolutions)),
    };
  }
}
