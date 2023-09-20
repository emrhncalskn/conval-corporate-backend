import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto {
    id: number;
    author_id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    excerpt: string;
    @ApiProperty()
    body: string;
    @ApiProperty()
    img: string;
    slug: string;
    @ApiProperty()
    meta_description: string;
    @ApiProperty()
    meta_keywords: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    featured: number;
    @ApiProperty()
    favorites: number;
}