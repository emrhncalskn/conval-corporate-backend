import { ApiProperty } from "@nestjs/swagger";

export class CreateGeneralDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    img: string;
}