import { Test, TestingModule } from '@nestjs/testing';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';

describe('CareersController', () => {
  let careersController: CareersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CareersController],
      providers: [CareersService],
    }).compile();

    careersController = app.get<CareersController>(CareersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(careersController.getHello()).toBe('Hello World!');
    });
  });
});
