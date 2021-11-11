import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableBalanceConstruction1636589800928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'balance_construction',
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
                        name: 'month',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'amount',
                        type: 'numeric',
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
        await queryRunner.dropTable('balance_construction');
    }

}
