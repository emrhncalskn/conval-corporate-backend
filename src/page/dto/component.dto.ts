import { ApiProperty } from "@nestjs/swagger";

export class ComponentDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    type_id: number;
}

export class ComponentTypeDto {
    @ApiProperty()
    name: string;
}

export class ComponentFileDto {
    @ApiProperty()
    component_id: number;
    @ApiProperty()
    file_id: number;
}