import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1716377918008 implements MigrationInterface {
  name = 'AddUserTable1716377918008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`users\`
(
    \`id\`         int          NOT NULL AUTO_INCREMENT,
    \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    \`email\`      varchar(255) NOT NULL,
    \`password\`   varchar(255) NOT NULL,
    PRIMARY KEY (\`id\`)
) ENGINE = InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
