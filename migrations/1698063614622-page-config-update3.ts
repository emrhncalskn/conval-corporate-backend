import { MigrationInterface, QueryRunner } from "typeorm";

export class PageConfigUpdate31698063614622 implements MigrationInterface {
    name = 'PageConfigUpdate31698063614622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL DEFAULT 'NULL'`);
    }

}
