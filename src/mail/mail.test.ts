import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
  let controller: MailController;
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService,MailerService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
