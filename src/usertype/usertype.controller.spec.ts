import { Test, TestingModule } from '@nestjs/testing';
import { UsertypeController } from './usertype.controller';

describe('UsertypeController', () => {
  let controller: UsertypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertypeController],
    }).compile();

    controller = module.get<UsertypeController>(UsertypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
