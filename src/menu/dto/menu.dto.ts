import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    type_id: number;
    @ApiHideProperty()
    slug: string;
    @ApiProperty()
    menu_belong_id: number;
    @ApiProperty()
    route: string;
    @ApiProperty()
    status: number;
}

export class UpdateMenuDto {
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    type_id: number;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    route: string;
    @ApiProperty()
    status: number;
}

export class MenuTypeDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    language_code: string;
}