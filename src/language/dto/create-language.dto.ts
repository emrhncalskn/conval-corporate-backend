import { ApiProperty } from "@nestjs/swagger";

export class CreateLanguageDto {
    @ApiProperty()
    code: string;
    @ApiProperty()
    name: string;
}
