import { MigrationInterface, QueryRunner } from "typeorm";

export class PageImgDesc1698305420009 implements MigrationInterface {
    name = 'PageImgDesc1698305420009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`excerpt\` \`excerpt\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`body\` \`body\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_description\` \`meta_description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`title\` \`title\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong_id\` \`menu_belong_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong_id\` \`menu_belong_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`title\` \`title\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_description\` \`meta_description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`body\` \`body\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`excerpt\` \`excerpt\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`description\``);
    }

}
