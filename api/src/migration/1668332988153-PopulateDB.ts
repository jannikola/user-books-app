import { MigrationInterface, QueryRunner } from "typeorm";
import { readFileSync } from "fs";

export class PopulateDB1668332988153 implements MigrationInterface {
    private populateDataScriptPath = "src/db/import-data.sql";
    private truncateDataScriptPath = "src/db/truncate-data.sql";

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const script = readFileSync(this.populateDataScriptPath);
            await queryRunner.query(`${script}`);
        } catch (e) {
            console.info("Something went wrong on PopulateDB1668332988153 migration: UP");
            console.error(e);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            const script = readFileSync(this.truncateDataScriptPath);
            await queryRunner.query(`${script}`);
        } catch (e) {
            console.info("Something went wrong on PopulateDB1668332988153 migration: DOWN");
            console.error(e);
        }
    }

}
