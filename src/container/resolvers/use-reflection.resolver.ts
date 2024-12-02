import { Provider } from "../dto/provider.dto";
import { ResolverInterface } from "./resolver.interface";
import { Resolved } from "../dto/resolved.dto";
import { Token } from "../types/token.type";
import { ContainerResolver } from "../container-resolver";
import { Constructable } from "../types/constructable.type";

export class UseReflectionResolver implements ResolverInterface {
  shouldResolve(provider: Provider): boolean {
    return (
      'function' === typeof provider.provide &&
      provider.injectTokens === undefined &&
      provider.useFactory === undefined &&
      provider.useClass === undefined &&
      provider.useValue === undefined
    );
  }

  async resolve<T>(provider: Provider<T>, token: Token): Promise<Resolved<T>> {
    if ('function' !== typeof provider.provide) {
      throw new Error('Dependency is not resolvable');
    }

    const isInjectable = Reflect.getMetadata('injectable', token);

    if (!isInjectable) {
      throw new Error('Dependency is not injectable: ' + provider.provide.name);
    }
    
    const paramTypes = Reflect.getMetadata('design:paramtypes', token) ?? [];

    const childrenDep = paramTypes.map((paramType: Token) => {
      return ContainerResolver.get().resolve(paramType);
    });

    const dependencies = await Promise.all(childrenDep);

    return {
      provide: provider.provide,
      resolution: new (provider.provide as Constructable)(...dependencies),
    };
  }
}
