import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTablePermissionsCostruction1630546008400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'permissions_construction',
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
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'profile_id',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'position',
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
            'permissions_construction',
            new TableForeignKey({
                name: 'permissions_construction_FK_construction_config',
                columnNames: ['construction_id'],
                referencedTableName: 'construction_config',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissions_construction', 'permissions_construction_FK_construction_config');
        await queryRunner.dropTable('permissions_construction');
    }

}
