import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRecipes1727301606071 implements MigrationInterface {
    name = 'CreateTableRecipes1727301606071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`recipes\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`recipes\``);
    }

}
