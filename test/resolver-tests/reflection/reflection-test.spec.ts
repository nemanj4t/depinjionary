import { ContainerInterface } from '../../../src/container/container.interface'
import { ContainerResolver } from '../../../src/container/container-resolver'
import { Provider } from '../../../src/container/dto/provider.dto';
import { TestParentService } from './test-parent.service';
import { TestChildService } from './test-child.service';

describe('[RESOLVER TEST] reflection', () => {
  it('Value of parent`s child should be 5', async () => {
    const providers: Provider[] = [
      {
        provide: TestParentService,
      },
      {
        provide: TestChildService,
        useFactory: () => new TestChildService(5),
      }
    ]

    const container: ContainerInterface = ContainerResolver.init(providers); 
    const parentService = await container.resolve<TestParentService>(TestParentService);

    expect(parentService.child.value).toBe(5);
  });
});