import { ApiProperty } from "@nestjs/swagger";

class TitleDto {
    @ApiProperty()
    title1: string;
    @ApiProperty()
    title2: string;
    @ApiProperty()
    title3: string;
}

class ExcerptDto {
    @ApiProperty()
    excerpt1: string;
    @ApiProperty()
    excerpt2: string;
    @ApiProperty()
    excerpt3: string;
}

class BodyDto {
    @ApiProperty()
    body1: string;
    @ApiProperty()
    body2: string;
    @ApiProperty()
    body3: string;
}

class ImageDto {
    @ApiProperty()
    image1: string;
    @ApiProperty()
    image2: string;
    @ApiProperty()
    image3: string;
}

class MetaDescriptionDto {
    @ApiProperty()
    meta_description1: string;
    @ApiProperty()
    meta_description2: string;
    @ApiProperty()
    meta_description3: string;
}

class MetaKeywordsDto {
    @ApiProperty()
    meta_keywords1: string;
    @ApiProperty()
    meta_keywords2: string;
    @ApiProperty()
    meta_keywords3: string;
}

class TextImageDto {
    @ApiProperty()
    textimage1: string;
    @ApiProperty()
    textimage2: string;
    @ApiProperty()
    textimage3: string;
}

class BreadImageDto {
    @ApiProperty()
    breadimage1: string;
    @ApiProperty()
    breadimage2: string;
    @ApiProperty()
    breadimage3: string;
}

class TitleSmallDto {
    @ApiProperty()
    titlesmall1: string;
    @ApiProperty()
    titlesmall2: string;
    @ApiProperty()
    titlesmall3: string;
}

export class PageExtraDto {
    @ApiProperty({ type: [TitleDto] })
    title: TitleDto[];
    @ApiProperty({ type: [ExcerptDto] })
    excerpt: ExcerptDto[];
    @ApiProperty({ type: [BodyDto] })
    body: BodyDto[];
    @ApiProperty({ type: [ImageDto] })
    image: ImageDto[];
    @ApiProperty({ type: [MetaDescriptionDto] })
    meta_description: MetaDescriptionDto[];
    @ApiProperty({ type: [MetaKeywordsDto] })
    meta_keywords: MetaKeywordsDto[];
    @ApiProperty({ type: [TextImageDto] })
    textimage: TextImageDto[];
    @ApiProperty({ type: [BreadImageDto] })
    breadimage: BreadImageDto[];
    @ApiProperty({ type: [TitleSmallDto] })
    titlesmall: TitleSmallDto[];
    @ApiProperty()
    slug: string;
    @ApiProperty()
    status: number;
    author_id: number;
}