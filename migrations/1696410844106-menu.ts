import { MigrationInterface, QueryRunner } from "typeorm";

export class Menu1696410844106 implements MigrationInterface {
    name = 'Menu1696410844106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`type_id\` int NOT NULL, \`slug\` varchar(255) NOT NULL, \`menu_belong\` int NULL, \`route\` text NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_c2e1e533406870d3b045a99275\` (\`menu_belong\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`generals\` ADD \`button\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` ADD \`href\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_menu_type_id\` FOREIGN KEY (\`type_id\`) REFERENCES \`menu_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`fk_menu_belong\` FOREIGN KEY (\`menu_belong\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_menu_belong\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`fk_menu_type_id\``);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img_type\` \`img_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generals\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`img\` \`img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`generals\` DROP COLUMN \`href\``);
        await queryRunner.query(`ALTER TABLE \`generals\` DROP COLUMN \`button\``);
        await queryRunner.query(`DROP TABLE \`menu_type\``);
        await queryRunner.query(`DROP INDEX \`REL_c2e1e533406870d3b045a99275\` ON \`menu\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
    }

}
