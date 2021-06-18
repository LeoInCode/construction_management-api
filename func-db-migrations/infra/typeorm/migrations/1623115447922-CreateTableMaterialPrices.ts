import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableMaterialPrices1623115447922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'material_price',
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
                        type: 'number',
                        isNullable: false
                    },
                    {
                        name: 'display_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'unit_price',
                        type: 'numeric',
                        isNullable: false
                    },
                    {
                        name: 'quantity',
                        type: 'numeric',
                        default: 0
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
        await queryRunner.dropTable('material_price');
    }

}
