import { Test, TestingModule } from '@nestjs/testing';
import { TempCommentController } from './temp-comment.controller';

describe('TempCommentController', () => {
  let controller: TempCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempCommentController],
    }).compile();

    controller = module.get<TempCommentController>(TempCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
