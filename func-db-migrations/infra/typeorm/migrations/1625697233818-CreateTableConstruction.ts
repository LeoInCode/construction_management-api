import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableConstruction1625697233818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'construction_config',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'user_id',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'responsible',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'client',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'display_name',
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
            'construction_config',
            new TableForeignKey({
                name: 'construction_config_FK_user_config',
                columnNames: ['user_id'],
                referencedTableName: 'user_config',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('construction_config', 'construction_config_FK_user_config');
        await queryRunner.dropTable('construction_config');
    }

}
