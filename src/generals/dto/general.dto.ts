import { ApiProperty } from "@nestjs/swagger";

export class GeneralDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    img: string;
}