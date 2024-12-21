import { Injectable } from '../../../src/container/decorators/injectable.decorator';

@Injectable()
export class TestService
{
  constructor(readonly numberValue: number, readonly stringValue: string) {};
}
