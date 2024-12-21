import { ContainerInterface } from '../../../src/container/container.interface'
import { ContainerResolver } from '../../../src/container/container-resolver'
import { Provider } from '../../../src/container/dto/provider.dto';
import { TestInterface } from './test.interface';
import { TestService } from './test.service';

describe('[RESOLVER TEST] use-class', () => {
  it('TestService should be bound to TestInterface', async () => {
    const providers: Provider[] = [
      {
        provide: TestInterface,
        useClass: TestService,
      },
      {
        provide: TestService,
        useFactory: () => new TestService(5)
      }
    ]

    const container: ContainerInterface = ContainerResolver.init(providers); 
    const testService = await container.resolve<TestInterface>(TestInterface);

    expect(testService.value).toBe(5);
  });
});
