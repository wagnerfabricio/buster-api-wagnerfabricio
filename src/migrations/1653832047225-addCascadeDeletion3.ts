import { MigrationInterface, QueryRunner } from "typeorm";

export class addCascadeDeletion31653832047225 implements MigrationInterface {
    name = 'addCascadeDeletion31653832047225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_2ef78912e491650c3c3e0cfa7bd"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "UQ_2ef78912e491650c3c3e0cfa7bd"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "UQ_2ef78912e491650c3c3e0cfa7bd" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_2ef78912e491650c3c3e0cfa7bd" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
