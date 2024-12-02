import { Provider } from "../dto/provider.dto";
import { ResolverInterface } from "./resolver.interface";
import { UseClassResolver } from "./use-class.resolver";
import { UseFactoryResolver } from "./use-factory.resolver";
import { UseReflectionResolver } from "./use-reflection.resolver";
import { UseValueResolver } from "./use-value.resolver";

export class ResolverFactory {
  static resolvers: ResolverInterface[] = [
    new UseReflectionResolver(),
    new UseFactoryResolver(),
    new UseClassResolver(),
    new UseValueResolver(),
  ];

  static byProvider(provider: Provider): ResolverInterface {
    const resolver = this.resolvers.find((resolver) => resolver.shouldResolve(provider));

    if (!resolver) {
      throw new Error('Unresolvable');
    }

    return resolver;
  }
}