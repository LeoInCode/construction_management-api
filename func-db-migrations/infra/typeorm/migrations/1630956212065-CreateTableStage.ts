import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableStage1630956212065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'stage',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'construction_id',
                        type: 'integer'
                    },
                    {
                        name: 'stage_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'creation_date',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'last_update',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'stage',
            new TableForeignKey({
                name: 'stage_FK_construction_config',
                columnNames: ['construction_id'],
                referencedTableName: 'construction_config',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stage', 'stage_FK_construction_config');
        await queryRunner.dropTable('stage');
    }

}
