import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorBookTables1716319351935 implements MigrationInterface {
  name = 'AddAuthorBookTables1716319351935';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`CREATE TABLE \`author-books\`
(
    \`id\`         int          NOT NULL AUTO_INCREMENT,
    \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    \`author_id\`  int          NOT NULL,
    \`book_id\`    int          NOT NULL,
    UNIQUE INDEX \`IDX_0acdf365f2e0b2ac47e6715dc0\` (\`author_id\`, \`book_id\`),
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
    \`author_id\`    date         NOT NULL,
    PRIMARY KEY (\`id\`)
) ENGINE = InnoDB`);
    await queryRunner.query(
      `ALTER TABLE \`author-books\` ADD CONSTRAINT \`FK_d014d2f9c4f9bf4c9a6eb030a8d\` FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`author-books\` ADD CONSTRAINT \`FK_e350019f2ce84a1efc13f6785ce\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`author-books\` DROP FOREIGN KEY \`FK_e350019f2ce84a1efc13f6785ce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`author-books\` DROP FOREIGN KEY \`FK_d014d2f9c4f9bf4c9a6eb030a8d\``,
    );
    await queryRunner.query(`DROP TABLE \`books\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0acdf365f2e0b2ac47e6715dc0\` ON \`author-books\``,
    );
    await queryRunner.query(`DROP TABLE \`author-books\``);
    await queryRunner.query(`DROP TABLE \`authors\``);
  }
}
