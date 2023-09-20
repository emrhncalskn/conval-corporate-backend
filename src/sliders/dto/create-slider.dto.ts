import { ApiProperty } from "@nestjs/swagger";

export class CreateSliderDto {
    @ApiProperty()
    stitle: string;
    @ApiProperty()
    stext: string;
    @ApiProperty()
    simg: string;
    slug: string;
}