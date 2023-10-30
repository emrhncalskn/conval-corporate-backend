import { MigrationInterface, QueryRunner } from "typeorm";

export class LangUpdate1698670275816 implements MigrationInterface {
    name = 'LangUpdate1698670275816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu_type\` CHANGE \`lang\` \`language_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`language\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`language\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`language\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` ADD \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` DROP COLUMN \`language_code\``);
        await queryRunner.query(`ALTER TABLE \`menu_type\` ADD \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD PRIMARY KEY (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD UNIQUE INDEX \`ui_code\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` ADD CONSTRAINT \`fk_mt_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`generals\` ADD CONSTRAINT \`fk_g_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`generals\` DROP FOREIGN KEY \`fk_g_language_code\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_language_code\``);
        await queryRunner.query(`ALTER TABLE \`menu_type\` DROP FOREIGN KEY \`fk_mt_language_code\``);
        await queryRunner.query(`DROP INDEX \`ui_code\` ON \`language\``);
        await queryRunner.query(`ALTER TABLE \`language\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` DROP COLUMN \`language_code\``);
        await queryRunner.query(`ALTER TABLE \`menu_type\` ADD \`language_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` DROP COLUMN \`language_code\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`language_code\``);
        await queryRunner.query(`ALTER TABLE \`language\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`language\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` CHANGE \`language_code\` \`lang\` varchar(255) NOT NULL`);
    }

}
