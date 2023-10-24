import { MigrationInterface, QueryRunner } from "typeorm";

export class PageComponentCss1698134926463 implements MigrationInterface {
    name = 'PageComponentCss1698134926463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_component\` ADD \`css\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_component\` DROP COLUMN \`css\``);
    }

}
