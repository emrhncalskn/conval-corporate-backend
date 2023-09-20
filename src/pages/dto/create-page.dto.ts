import { ApiProperty } from "@nestjs/swagger";

export class CreatePageDto {
    author_id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    excerpt: string;
    @ApiProperty()
    body: string;
    @ApiProperty()
    image: string;
    slug: string;
    @ApiProperty()
    meta_description: string;
    @ApiProperty()
    meta_keywords: string;
    status: number;
    @ApiProperty()
    textimage: string;
    @ApiProperty()
    breadimage: string;
    @ApiProperty()
    titlesmall: string;
}