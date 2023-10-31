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
import { Language } from 'src/language/entities/language.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageConfig, PageComponent, Component, ComponentFile, ComponentType, Language, Permissions, Users])],
  controllers: [PageController],
  providers: [PageService, JwtService]
})
export class PageModule { }
