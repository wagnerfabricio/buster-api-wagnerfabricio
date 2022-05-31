import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class initialCommit1654007020572 implements MigrationInterface {
  name = "initialCommit1654007020572";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, "dvdId" uuid, CONSTRAINT "REL_2ef78912e491650c3c3e0cfa7b" UNIQUE ("dvdId"), CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "paid" boolean NOT NULL DEFAULT true, "total" double precision NOT NULL DEFAULT '0', "userId" uuid NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order_dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "subtotal" double precision NOT NULL DEFAULT '0', "orderId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_c126b3aaadd7037e30f1103c9aa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "UQ_378ec7a5f866f33ebfdef5ae2a4" UNIQUE ("name"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart_dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "subtotal" double precision NOT NULL DEFAULT '0', "cartId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_b364c310aefb1f56d5e63f052e8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL DEFAULT '0', "userId" uuid NOT NULL, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_2ef78912e491650c3c3e0cfa7bd" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_dvd" ADD CONSTRAINT "FK_fa8be242f0f1b357c2170da4fd0" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_dvd" ADD CONSTRAINT "FK_185affad2157357e5b21333fcb4" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvd" ADD CONSTRAINT "FK_ee4cc49ad202a770a3b86f3fcfb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvd" ADD CONSTRAINT "FK_fbcbf6b7d97c3377a7a0e3e368b" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `
                          INSERT INTO "users" ("email", "password", "isAdm", "name")
                          VALUES ('${process.env.ADMIN_EMAIL}', '${hashSync(
        process.env.ADMIN_PASSWORD,
        10
      )}', true, 'kenzinho')
                        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvd" DROP CONSTRAINT "FK_fbcbf6b7d97c3377a7a0e3e368b"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvd" DROP CONSTRAINT "FK_ee4cc49ad202a770a3b86f3fcfb"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_dvd" DROP CONSTRAINT "FK_185affad2157357e5b21333fcb4"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_dvd" DROP CONSTRAINT "FK_fa8be242f0f1b357c2170da4fd0"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_2ef78912e491650c3c3e0cfa7bd"`
    );
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "cart_dvd"`);
    await queryRunner.query(`DROP TABLE "dvd"`);
    await queryRunner.query(`DROP TABLE "order_dvd"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "stock"`);
  }
}
