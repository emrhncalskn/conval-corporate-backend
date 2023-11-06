import { MigrationInterface, QueryRunner } from "typeorm";

export class File1699295848001 implements MigrationInterface {
    name = 'File1699295848001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`alt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`image_url\` \`image_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`info\` \`info\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`excerpt\` \`excerpt\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`body\` \`body\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_description\` \`meta_description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`reference\` CHANGE \`image_url\` \`image_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`address\` \`address\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`phone_numbers\` \`phone_numbers\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`emails\` \`emails\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`testimonial\` CHANGE \`content\` \`content\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong_id\` \`menu_belong_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` DROP FOREIGN KEY \`fk_mt_language_code\``);
        await queryRunner.query(`ALTER TABLE \`menu_type\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` DROP FOREIGN KEY \`fk_g_language_code\``);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`title\` \`title\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_language_code\``);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` DROP FOREIGN KEY \`fk_s_language_code\``);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` ADD CONSTRAINT \`fk_mt_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`generals\` ADD CONSTRAINT \`fk_g_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sliders\` ADD CONSTRAINT \`fk_s_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sliders\` DROP FOREIGN KEY \`fk_s_language_code\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_language_code\``);
        await queryRunner.query(`ALTER TABLE \`generals\` DROP FOREIGN KEY \`fk_g_language_code\``);
        await queryRunner.query(`ALTER TABLE \`menu_type\` DROP FOREIGN KEY \`fk_mt_language_code\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sliders\` ADD CONSTRAINT \`fk_s_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`title\` \`title\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` ADD CONSTRAINT \`fk_g_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` CHANGE \`language_code\` \`language_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu_type\` ADD CONSTRAINT \`fk_mt_language_code\` FOREIGN KEY (\`language_code\`) REFERENCES \`language\`(\`code\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong_id\` \`menu_belong_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`testimonial\` CHANGE \`content\` \`content\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`emails\` \`emails\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`phone_numbers\` \`phone_numbers\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`address\` \`address\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reference\` CHANGE \`image_url\` \`image_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_description\` \`meta_description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`body\` \`body\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`excerpt\` \`excerpt\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`info\` \`info\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`image_url\` \`image_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`alt\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`name\``);
    }

}
