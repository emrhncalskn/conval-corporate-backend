import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

class MenuDto {
    @ApiProperty({ type: 'number' })
    id: number;
}

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
    @ApiProperty({ type: [MenuDto] })
    page_belongs: MenuDto[];
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
    @ApiProperty({ type: [MenuDto] })
    page_belongs: MenuDto[];
    @ApiProperty()

    @ApiProperty()
    route: string;
    @ApiProperty()
    status: number;
}