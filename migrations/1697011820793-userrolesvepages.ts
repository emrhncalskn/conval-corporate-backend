import { MigrationInterface, QueryRunner } from "typeorm";

export class Userrolesvepages1697011820793 implements MigrationInterface {
    name = 'Userrolesvepages1697011820793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_permissions_functions\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_permissions_roles\``);
        await queryRunner.query(`DROP INDEX \`fk_menu_belong\` ON \`menu\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_role\` \`role_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong\` \`menu_belong\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`page_belongs\` \`page_belongs\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role_id\` \`role_id\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_menu_belong\` FOREIGN KEY (\`menu_belong\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`fk_users_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`fk_permissions_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_permissions_func_id\` FOREIGN KEY (\`func_id\`) REFERENCES \`functions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_permissions_func_id\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`fk_permissions_role_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`fk_users_role_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_menu_belong\``);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`titlesmall\` \`titlesmall\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`breadimage\` \`breadimage\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`textimage\` \`textimage\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`meta_keywords\` \`meta_keywords\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`meta_description\` \`meta_description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`image\` \`image\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`body\` \`body\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`excerpt\` \`excerpt\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`title\` \`title\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pages_extra\` CHANGE \`author_id\` \`author_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role_id\` \`role_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`page_belongs\` \`page_belongs\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong\` \`menu_belong\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role_id\` \`user_role\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`fk_menu_belong\` ON \`menu\` (\`menu_belong\`)`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_permissions_roles\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_permissions_functions\` FOREIGN KEY (\`func_id\`) REFERENCES \`functions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
