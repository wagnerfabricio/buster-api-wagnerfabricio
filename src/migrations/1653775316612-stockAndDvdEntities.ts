import { MigrationInterface, QueryRunner } from "typeorm";

export class stockAndDvdEntities1653775316612 implements MigrationInterface {
    name = 'stockAndDvdEntities1653775316612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockId" uuid, CONSTRAINT "REL_a68c996998e86e22dc2580918c" UNIQUE ("stockId"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
