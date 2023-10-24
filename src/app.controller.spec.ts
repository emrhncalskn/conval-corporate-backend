import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfirmMessages } from '../constants/messages.constants';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,ConfigService,Connection],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health-check', () => {
    it('should return : ' + ConfirmMessages.HEALTH_CHECK_CONFIRM(), () => {
      expect(appController.healthCheck).toBe(ConfirmMessages.HEALTH_CHECK());
    });
  });
});
