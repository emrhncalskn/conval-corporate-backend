import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionFkChanged1697013346555 implements MigrationInterface {
    name = 'PermissionFkChanged1697013346555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`fk_menu_belong\` ON \`menu\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong\` \`menu_belong\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`page_belongs\` \`page_belongs\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL`);
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
        await queryRunner.query(`CREATE INDEX \`fk_permissions_role_id\` ON \`permissions\` (\`role_id\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_permissions_func_id\` ON \`permissions\` (\`func_id\`)`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_menu_belong\` FOREIGN KEY (\`menu_belong\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`fk_permissions_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`fk_permissions_func_id\` FOREIGN KEY (\`func_id\`) REFERENCES \`functions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`fk_permissions_func_id\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`fk_permissions_role_id\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_menu_belong\``);
        await queryRunner.query(`DROP INDEX \`fk_permissions_func_id\` ON \`permissions\``);
        await queryRunner.query(`DROP INDEX \`fk_permissions_role_id\` ON \`permissions\``);
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
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`page_belongs\` \`page_belongs\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong\` \`menu_belong\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`fk_menu_belong\` ON \`menu\` (\`menu_belong\`)`);
    }

}
