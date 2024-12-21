import { Injectable } from '../../../src/container/decorators/injectable.decorator';
import { TestChildService } from './test-child.service';

@Injectable()
export class TestParentService
{
  constructor(readonly child: TestChildService) {};
}
