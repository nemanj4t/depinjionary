import { Injectable } from '../../../src/container/decorators/injectable.decorator';

@Injectable()
export class TestService
{
  constructor(readonly value: number) {};
}
