import { ApiProperty } from "@nestjs/swagger";

export class PermissionDto {
    @ApiProperty()
    role_id: number;
    @ApiProperty()
    func_id: number;
}