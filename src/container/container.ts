import { Resolved } from './dto/resolved.dto';
import { Provider } from './dto/provider.dto';
import { Token } from './types/token.type';
import { ResolverFactory } from './resolvers/resolver.factory';
import { Type } from './enums/type.enum';

export class Container {
  private dependencies: Map<Token, Resolved> = new Map<Token, Resolved>();
  private providers: Map<Token, Provider> = new Map<Token, Provider>();

  constructor(providers: Provider[]) {
    providers.forEach((provider) => {
      this.providers.set(provider.provide, provider)
    })
  }

  async resolve<T>(token: Token): Promise<T> {
    const resolveType: Type = this.getResolutionType(token);

    switch (resolveType) {
      case Type.TRANSIENT:
        return this.resolveAsTransient<T>(token);
      case Type.SINGLETON:
      default:
        return this.resolveAsSingleton<T>(token);
    }
  }

  private async resolveAsSingleton<T>(token: Token): Promise<T> {
    let dependency: Resolved | undefined = this.dependencies.get(token);

    if (dependency) {
      return dependency.resolution as T;
    }

    dependency = await this.getResolved<T>(token);

    this.dependencies.set(token, dependency);

    return dependency.resolution;
  }

  private async resolveAsTransient<T>(token: Token): Promise<T> {
    const dependency = await this.getResolved<T>(token);

    return dependency.resolution;
  }

  private async getResolved<T>(token: Token): Promise<Resolved<T>>
  {
    const provider = this.providers.get(token);

    if (!provider) {
      throw new Error('Dependency is not registered');
    }

    const resolver = ResolverFactory.byProvider(provider);

    const dependency = await resolver.resolve<T>(provider, token);

    if (!dependency) {
      throw new Error('Dependency is not resolvable');
    }

    return dependency;
  }

  private getResolutionType(token: Token): Type {
    let type: Type;

    try {
      type = Reflect.getMetadata('type', token);
    } catch(error) {
      type = Type.SINGLETON;
    }

    return type;
  }
}
