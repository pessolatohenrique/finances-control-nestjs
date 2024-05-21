import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1716333543598 implements MigrationInterface {
    name = 'Initial1716333543598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_earning\` (\`id\` varchar(36) NOT NULL, \`earningId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`value\` int NOT NULL, \`transaction_date\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`earnings\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_earning\` ADD CONSTRAINT \`FK_f513c0ba89fc9d7166d1a838b83\` FOREIGN KEY (\`earningId\`) REFERENCES \`earnings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_earning\` ADD CONSTRAINT \`FK_ecf22f6e96e132200bb4f3f1945\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_earning\` DROP FOREIGN KEY \`FK_ecf22f6e96e132200bb4f3f1945\``);
        await queryRunner.query(`ALTER TABLE \`user_earning\` DROP FOREIGN KEY \`FK_f513c0ba89fc9d7166d1a838b83\``);
        await queryRunner.query(`DROP TABLE \`earnings\``);
        await queryRunner.query(`DROP TABLE \`user_earning\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
