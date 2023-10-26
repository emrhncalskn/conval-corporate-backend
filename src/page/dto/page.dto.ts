import { ApiProperty } from "@nestjs/swagger";

export class PageDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    slug: string;
    @ApiProperty({ default: [{ component_id: 0, value: 'string', index: 0 }] })
    content: string;
    @ApiProperty()
    config_id: number;
}

export class UpdatePageDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    slug: string;
    @ApiProperty({ default: [{ component_id: 0, value: 'string', index: 0 }] })
    content: string;
    @ApiProperty()
    config_id: number;
}

export class PageConfigDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    css: string;
}

export class PageComponentDto {
    @ApiProperty()
    page_id: number;
    @ApiProperty()
    component_id: number;
    @ApiProperty()
    value: string;
    @ApiProperty()
    css: string;
    @ApiProperty()
    index: number;
}