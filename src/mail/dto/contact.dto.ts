import { ApiProperty } from "@nestjs/swagger";

export class ContactDto{
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    telephone_number: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    message: string;
}