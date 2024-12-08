import { Container } from './container';
import { ContainerInterface } from './container.interface';
import { Provider } from './dto/provider.dto';

export class ContainerResolver {
  private static container?: Container = undefined;

  static init(providers: Provider[]): ContainerInterface {
    this.container = new Container(providers);

    return this.container;
  }

  static get(): ContainerInterface {
    if (!this.container) {
      throw Error('Container not initialized');
    }

    return this.container;
  }
}
