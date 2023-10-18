import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PageConfig } from './entities/page_config.entity';
import { PageComponent } from './entities/page_component.entity';
import { Component } from './entities/component.entity';
import { ComponentFile } from './entities/component_file.entity';
import { ComponentType } from './entities/component_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageConfig, PageComponent, Component, ComponentFile, ComponentType])],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule { }
