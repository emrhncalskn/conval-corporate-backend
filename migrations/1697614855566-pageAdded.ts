import { MigrationInterface, QueryRunner } from "typeorm";

export class PageAdded1697614855566 implements MigrationInterface {
    name = 'PageAdded1697614855566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`page_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`col_size\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`page\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`config_id\` int NULL, UNIQUE INDEX \`REL_0e0670df51889d78ece66ef38b\` (\`config_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`page_component\` (\`id\` int NOT NULL AUTO_INCREMENT, \`page_id\` int NOT NULL, \`component_id\` int NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`component_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`component\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`type_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`component_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`component_id\` int NOT NULL, \`file_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` DROP FOREIGN KEY \`fk_pages_extra_author_id\``);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`author_id\` \`author_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`title\` \`title\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`excerpt\` \`excerpt\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`body\` \`body\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`image\` \`image\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`meta_description\` \`meta_description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`textimage\` \`textimage\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`breadimage\` \`breadimage\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`titlesmall\` \`titlesmall\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`title\` \`title\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`excerpt\` \`excerpt\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`body\` \`body\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`image\` \`image\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`meta_description\` \`meta_description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`textimage\` \`textimage\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`titlesmall\` \`titlesmall\` text NULL`);
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
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong_id\` \`menu_belong_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`page_belongs\` \`page_belongs\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` ADD CONSTRAINT \`fk_pages_extra_author_id\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page_component\` ADD CONSTRAINT \`fk_pc_page_id\` FOREIGN KEY (\`page_id\`) REFERENCES \`page\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page_component\` ADD CONSTRAINT \`fk_pc_component_id\` FOREIGN KEY (\`component_id\`) REFERENCES \`component\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD CONSTRAINT \`fk_c_type_id\` FOREIGN KEY (\`type_id\`) REFERENCES \`component_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component_file\` ADD CONSTRAINT \`fk_cf_component_id\` FOREIGN KEY (\`component_id\`) REFERENCES \`component\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component_file\` ADD CONSTRAINT \`fk_cf_file_id\` FOREIGN KEY (\`file_id\`) REFERENCES \`component\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`component_file\` DROP FOREIGN KEY \`fk_cf_file_id\``);
        await queryRunner.query(`ALTER TABLE \`component_file\` DROP FOREIGN KEY \`fk_cf_component_id\``);
        await queryRunner.query(`ALTER TABLE \`component\` DROP FOREIGN KEY \`fk_c_type_id\``);
        await queryRunner.query(`ALTER TABLE \`page_component\` DROP FOREIGN KEY \`fk_pc_component_id\``);
        await queryRunner.query(`ALTER TABLE \`page_component\` DROP FOREIGN KEY \`fk_pc_page_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` DROP FOREIGN KEY \`fk_pages_extra_author_id\``);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`page_belongs\` \`page_belongs\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong_id\` \`menu_belong_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`titlesmall\` \`titlesmall\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`textimage\` \`textimage\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`meta_description\` \`meta_description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`image\` \`image\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`body\` \`body\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`excerpt\` \`excerpt\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages\` CHANGE \`title\` \`title\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`titlesmall\` \`titlesmall\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`breadimage\` \`breadimage\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`textimage\` \`textimage\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`meta_keywords\` \`meta_keywords\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`meta_description\` \`meta_description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`image\` \`image\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`body\` \`body\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`excerpt\` \`excerpt\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`title\` \`title\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`author_id\` \`author_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` ADD CONSTRAINT \`fk_pages_extra_author_id\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`component_file\``);
        await queryRunner.query(`DROP TABLE \`component\``);
        await queryRunner.query(`DROP TABLE \`component_type\``);
        await queryRunner.query(`DROP TABLE \`page_component\``);
        await queryRunner.query(`DROP INDEX \`REL_0e0670df51889d78ece66ef38b\` ON \`page\``);
        await queryRunner.query(`DROP TABLE \`page\``);
        await queryRunner.query(`DROP TABLE \`page_config\``);
    }

}
