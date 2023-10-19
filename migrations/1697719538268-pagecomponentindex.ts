import { MigrationInterface, QueryRunner } from "typeorm";

export class Pagecomponentindex1697719538268 implements MigrationInterface {
    name = 'Pagecomponentindex1697719538268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_component\` ADD \`index\` int NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` ADD CONSTRAINT \`fk_pages_extra_author_id\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_m_menu_belong_id\` FOREIGN KEY (\`menu_belong_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` DROP FOREIGN KEY \`fk_p_config_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_m_menu_belong_id\``);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` DROP FOREIGN KEY \`fk_pages_extra_author_id\``);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`simg\` \`simg\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sliders\` CHANGE \`stext\` \`stext\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` CHANGE \`config_id\` \`config_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD CONSTRAINT \`fk_p_config_id\` FOREIGN KEY (\`config_id\`) REFERENCES \`page_config\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`page_component\` DROP COLUMN \`index\``);
    }

}
