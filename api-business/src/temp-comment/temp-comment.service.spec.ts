import { Test, TestingModule } from '@nestjs/testing';
import { TempCommentService } from './temp-comment.service';

describe('TempCommentService', () => {
  let service: TempCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempCommentService],
    }).compile();

    service = module.get<TempCommentService>(TempCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
