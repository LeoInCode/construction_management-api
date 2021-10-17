import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableActivity1626221537777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'activity',
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
                        name: 'stage_id',
                        type: 'integer',
                    },
                    {
                        name: 'activity_name',
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
            'activity',
            new TableForeignKey({
                name: 'activity_FK_construction_config',
                columnNames: ['construction_id'],
                referencedTableName: 'construction_config',
                referencedColumnNames: ['id']
            })
        )

        await queryRunner.createForeignKey(
            'activity',
            new TableForeignKey({
                name: 'activity_FK_stage',
                columnNames: ['stage_id'],
                referencedTableName: 'stage',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('activity', 'activity_FK_construction_config');
        await queryRunner.dropForeignKey('activity', 'activity_FK_stage');
        await queryRunner.dropTable('activity');
    }

}
