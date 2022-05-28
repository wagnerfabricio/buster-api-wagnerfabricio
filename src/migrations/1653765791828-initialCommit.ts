import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCommit1653765791828 implements MigrationInterface {
  name = "initialCommit1653765791828";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `
              INSERT INTO "users" ("email", "password", "isAdm", "name")
              VALUES ('${process.env.ADMIN_EMAIL}', '${hashSync(
        process.env.ADMIN_PASSWORD,
        10
      )}', true, '${process.env.ADMIN_NAME}')
            `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
