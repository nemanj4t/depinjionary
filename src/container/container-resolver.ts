import { Container } from './container';
import { Provider } from './dto/provider.dto';

export class ContainerResolver {
  private static container?: Container = undefined;

  static init(providers: Provider[]): Container {
    this.container = new Container(providers);

    return this.container;
  }

  static get(): Container {
    if (!this.container) {
      throw Error('Container not initialized');
    }

    return this.container;
  }
}
