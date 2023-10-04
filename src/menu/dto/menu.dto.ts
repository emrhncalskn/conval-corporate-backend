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
    menu_belong: number;
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
    menu_belong: number;
    @ApiProperty()
    route: string;
    @ApiProperty()
    status: number;
}