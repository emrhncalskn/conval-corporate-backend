import { MigrationInterface, QueryRunner } from "typeorm";

export class PageConfigCss1698133389448 implements MigrationInterface {
    name = 'PageConfigCss1698133389448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_config\` CHANGE \`col_size\` \`css\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD \`css\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_config\` DROP COLUMN \`css\``);
        await queryRunner.query(`ALTER TABLE \`page_config\` ADD \`css\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_config\` DROP COLUMN \`css\``);
        await queryRunner.query(`ALTER TABLE \`page_config\` ADD \`css\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`component\` DROP COLUMN \`css\``);
        await queryRunner.query(`ALTER TABLE \`page_config\` CHANGE \`css\` \`col_size\` int NOT NULL`);
    }

}
