import { MigrationInterface, QueryRunner } from "typeorm";

export class Cv1699016470746 implements MigrationInterface {
    name = 'Cv1699016470746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` text NOT NULL, \`type_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`is_active\` int NOT NULL, \`image_url\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application\` (\`id\` int NOT NULL AUTO_INCREMENT, \`position_id\` int NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`info\` text NULL, \`file_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`lat\` varchar(255) NOT NULL, \`long\` varchar(255) NOT NULL, \`address\` text NULL, \`phone_numbers\` text NULL, \`emails\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`country_name\` varchar(255) NOT NULL, \`country_code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reference\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`order\` varchar(255) NOT NULL, \`image_url\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`excerpt\` \`excerpt\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`body\` \`body\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_description\` \`meta_description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL`);
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
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`fk_f_type_id\` FOREIGN KEY (\`type_id\`) REFERENCES \`file_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`fk_app_file_id\` FOREIGN KEY (\`file_id\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`fk_app_position_id\` FOREIGN KEY (\`position_id\`) REFERENCES \`position\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`fk_app_position_id\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`fk_app_file_id\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`fk_f_type_id\``);
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
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`meta_description\` \`meta_description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`body\` \`body\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`excerpt\` \`excerpt\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`reference\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`DROP TABLE \`application\``);
        await queryRunner.query(`DROP TABLE \`position\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`file_type\``);
    }

}
