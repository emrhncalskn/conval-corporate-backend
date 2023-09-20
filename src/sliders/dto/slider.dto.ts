import { ApiProperty } from "@nestjs/swagger";

export class SetSliderDto {
    @ApiProperty()
    stitle: string;
    @ApiProperty()
    stext: string;
    @ApiProperty()
    simg: string;
    slug: string;
}