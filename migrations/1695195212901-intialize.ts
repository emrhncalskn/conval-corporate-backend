import { MigrationInterface, QueryRunner } from "typeorm";

export class Intialize1695195212901 implements MigrationInterface {
    name = 'Intialize1695195212901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blogs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`author_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`excerpt\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`img\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`meta_description\` varchar(255) NOT NULL, \`meta_keywords\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`featured\` int NOT NULL, \`favorites\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`author_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`excerpt\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`meta_description\` varchar(255) NOT NULL, \`meta_keywords\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`textimage\` varchar(255) NOT NULL, \`breadimage\` varchar(255) NOT NULL, \`titlesmall\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NOT NULL, \`func_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`functions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`desc\` varchar(255) NOT NULL, \`api\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sidebars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`img\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sliders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`stitle\` varchar(255) NOT NULL, \`stext\` varchar(255) NOT NULL, \`simg\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`iname\` varchar(255) NOT NULL, \`itype\` varchar(255) NOT NULL, \`iurl\` varchar(255) NOT NULL, \`ialt\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`user_role\` int NOT NULL, \`img\` varchar(255) NULL, \`img_type\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_permissions_roles\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_permissions_functions\` FOREIGN KEY (\`func_id\`) REFERENCES \`functions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_permissions_functions\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_permissions_roles\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`sliders\``);
        await queryRunner.query(`DROP TABLE \`sidebars\``);
        await queryRunner.query(`DROP TABLE \`functions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`pages\``);
        await queryRunner.query(`DROP TABLE \`blogs\``);
    }

}
