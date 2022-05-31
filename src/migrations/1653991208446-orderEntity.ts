import { MigrationInterface, QueryRunner } from "typeorm";

export class orderEntity1653991208446 implements MigrationInterface {
    name = 'orderEntity1653991208446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "paid" boolean NOT NULL DEFAULT true, "total" double precision NOT NULL DEFAULT '0', "userId" uuid NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "subtotal" double precision NOT NULL DEFAULT '0', "orderId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_c126b3aaadd7037e30f1103c9aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_dvd" ADD CONSTRAINT "FK_fa8be242f0f1b357c2170da4fd0" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_dvd" ADD CONSTRAINT "FK_185affad2157357e5b21333fcb4" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_dvd" DROP CONSTRAINT "FK_185affad2157357e5b21333fcb4"`);
        await queryRunner.query(`ALTER TABLE "order_dvd" DROP CONSTRAINT "FK_fa8be242f0f1b357c2170da4fd0"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP TABLE "order_dvd"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
