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
                        name: 'profile_id',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'permissions_profile_id',
                        type: 'text',
                        default: null
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('construction_config');
    }
}
