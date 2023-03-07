import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewColumnInUserMigration1678181278334 implements MigrationInterface {
    name = 'addNewColumnInUserMigration1678181278334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_users" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_users" DROP COLUMN "age"`);
    }

}
