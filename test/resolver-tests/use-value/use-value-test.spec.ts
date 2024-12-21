import { ContainerInterface } from '../../../src/container/container.interface'
import { ContainerResolver } from '../../../src/container/container-resolver'
import { Provider } from '../../../src/container/dto/provider.dto';

describe('[RESOLVER TEST] use-value', () => {
  it('Value of numberFive should be 5', async () => {
    const numberFiveToken = 'numberFive';

    const providers: Provider[] = [
      {
        provide: numberFiveToken,
        useValue: 5,
      },
    ]

    const container: ContainerInterface = ContainerResolver.init(providers); 
    const numberFive = await container.resolve(numberFiveToken);

    expect(numberFive).toBe(5);
  });
});