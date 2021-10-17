import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableManpowerPrice1624234536917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'manpower_price',
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
                        name: 'occupation',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'service',
                        type: 'varchar',
                        isNullable: true
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
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('manpower_price');
    }

}
