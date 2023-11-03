import { ApiProperty } from "@nestjs/swagger";

export class CreateApplicationDto {
    @ApiProperty()
    position_id: number;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    info: string;
    @ApiProperty()
    file_id: number;
}