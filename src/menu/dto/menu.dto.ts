import { ApiProperty } from "@nestjs/swagger";

export class MenuDto {
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