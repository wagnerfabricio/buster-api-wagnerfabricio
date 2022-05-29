import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export class initialCommit1653845440172 implements MigrationInterface {
  name = "initialCommit1653845440172";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockId" uuid NOT NULL, CONSTRAINT "UQ_378ec7a5f866f33ebfdef5ae2a4" UNIQUE ("name"), CONSTRAINT "REL_a68c996998e86e22dc2580918c" UNIQUE ("stockId"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart_dvds_dvd" ("cartId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_f600830824ddbc39d110580f273" PRIMARY KEY ("cartId", "dvdId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4439dbcdc1e1b8da68d5ff076" ON "cart_dvds_dvd" ("cartId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16dab9777b8de9e32efdd6a9a0" ON "cart_dvds_dvd" ("dvdId") `
    );
    await queryRunner.query(
      `ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvd" ADD CONSTRAINT "FK_e4439dbcdc1e1b8da68d5ff0762" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvd" ADD CONSTRAINT "FK_16dab9777b8de9e32efdd6a9a0d" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE CASCADE`
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
      `ALTER TABLE "cart_dvds_dvd" DROP CONSTRAINT "FK_16dab9777b8de9e32efdd6a9a0d"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvd" DROP CONSTRAINT "FK_e4439dbcdc1e1b8da68d5ff0762"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`
    );
    await queryRunner.query(
      `ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_16dab9777b8de9e32efdd6a9a0"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e4439dbcdc1e1b8da68d5ff076"`
    );
    await queryRunner.query(`DROP TABLE "cart_dvds_dvd"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "dvd"`);
    await queryRunner.query(`DROP TABLE "stock"`);
  }
}
