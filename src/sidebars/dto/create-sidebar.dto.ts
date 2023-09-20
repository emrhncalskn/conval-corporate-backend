import { ApiProperty } from "@nestjs/swagger";

export class CreateSidebarDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    img: string;
}