import { MigrationInterface, QueryRunner } from "typeorm";

export class PageBackgroundImageAdded1699516110365 implements MigrationInterface {
    name = 'PageBackgroundImageAdded1699516110365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`background_image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`background_image\``);
    }

}
