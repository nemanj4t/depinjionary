import { ContainerInterface } from '../../../src/container/container.interface'
import { ContainerResolver } from '../../../src/container/container-resolver'
import { Provider } from '../../../src/container/dto/provider.dto';
import { TestService } from './test.service';

describe('[RESOLVER TEST] use-factory', () => {
  it('TestService should be resolved via factory method', async () => {
    const numberFiveToken = 'numberFive';
    const someStringToken = 'someString';

    const providers: Provider[] = [
      {
        provide: numberFiveToken,
        useValue: 5,
      },
      {
        provide: someStringToken,
        useValue: 'someString',
      },
      {
        provide: TestService,
        injectTokens: [numberFiveToken, someStringToken],
        useFactory: (numberValue: number, stringValue: string) => {
          return new TestService(numberValue, stringValue);
        }
      }
    ]

    const container: ContainerInterface = ContainerResolver.init(providers); 
    const testService = await container.resolve<TestService>(TestService);

    expect(testService.numberValue).toBe(5);
    expect(testService.stringValue).toBe('someString');
  });
});