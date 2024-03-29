import { ApiProperty } from "@nestjs/swagger";

export class ComponentDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    type_id: number;
    @ApiProperty()
    css: string;
}

export class PageComponentIndexDto {
    @ApiProperty()
    component_id: number;
    @ApiProperty()
    index: number;
}

export class ComponentTypeDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    input_type: string;
}

export class ComponentFileDto {
    @ApiProperty()
    component_id: number;
    @ApiProperty()
    file_id: number;
}