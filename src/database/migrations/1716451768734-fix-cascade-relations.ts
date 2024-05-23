import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCascadeRelations1716451768734 implements MigrationInterface {
  name = 'FixCascadeRelations1716451768734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_1056dbee4616479f7d562c562df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD CONSTRAINT \`FK_1056dbee4616479f7d562c562df\` FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_1056dbee4616479f7d562c562df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD CONSTRAINT \`FK_1056dbee4616479f7d562c562df\` FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
