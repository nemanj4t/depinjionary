import { Injectable } from '../../../src/container/decorators/injectable.decorator';

@Injectable()
export class TestChildService
{
  constructor(readonly value: number) {};
}
