import { MigrationInterface, QueryRunner } from "typeorm";

export class cascadeDelete1653912828705 implements MigrationInterface {
    name = 'cascadeDelete1653912828705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvd" DROP CONSTRAINT "FK_ee4cc49ad202a770a3b86f3fcfb"`);
        await queryRunner.query(`ALTER TABLE "cart_dvd" ADD CONSTRAINT "FK_ee4cc49ad202a770a3b86f3fcfb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvd" DROP CONSTRAINT "FK_ee4cc49ad202a770a3b86f3fcfb"`);
        await queryRunner.query(`ALTER TABLE "cart_dvd" ADD CONSTRAINT "FK_ee4cc49ad202a770a3b86f3fcfb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
