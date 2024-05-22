import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorBookTables1716388428190 implements MigrationInterface {
  name = 'AddAuthorBookTables1716388428190';

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
    await queryRunner.query(`CREATE TABLE \`authors\`
(
    \`id\`         int          NOT NULL AUTO_INCREMENT,
    \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    \`name\`       varchar(255) NOT NULL,
    \`bio\`        varchar(255) NOT NULL,
    \`birth_date\` date         NOT NULL,
    PRIMARY KEY (\`id\`)
) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`books\`
(
    \`id\`           int          NOT NULL AUTO_INCREMENT,
    \`created_at\`   timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    \`updated_at\`   timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    \`title\`        varchar(255) NOT NULL,
    \`isbn\`         varchar(255) NOT NULL,
    \`published_at\` date         NOT NULL,
    \`author_id\`    int          NOT NULL,
    PRIMARY KEY (\`id\`)
) ENGINE = InnoDB`);
    await queryRunner.query(`ALTER TABLE \`books\`
    ADD CONSTRAINT \`FK_1056dbee4616479f7d562c562df\` FOREIGN KEY (\`author_id\`) REFERENCES \`authors\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_1056dbee4616479f7d562c562df\``,
    );
    await queryRunner.query(`DROP TABLE \`books\``);
    await queryRunner.query(`DROP TABLE \`authors\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
