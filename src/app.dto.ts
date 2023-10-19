import { ApiProperty } from "@nestjs/swagger";

export class GeneralGetDto{
    @ApiProperty()
    body: [{ key: string, value: string }]
}