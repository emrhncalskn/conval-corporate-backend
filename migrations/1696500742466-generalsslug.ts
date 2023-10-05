import { MigrationInterface, QueryRunner } from "typeorm";

export class Generalsslug1696500742466 implements MigrationInterface {
    name = 'Generalsslug1696500742466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`generals\` ADD \`slug\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_menu_belong\``);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong\` \`menu_belong\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_menu_belong\` FOREIGN KEY (\`menu_belong\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_menu_belong\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`href\` \`href\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`button\` \`button\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`route\` \`route\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_belong\` \`menu_belong\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_menu_belong\` FOREIGN KEY (\`menu_belong\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`generals\` DROP COLUMN \`slug\``);
    }

}
