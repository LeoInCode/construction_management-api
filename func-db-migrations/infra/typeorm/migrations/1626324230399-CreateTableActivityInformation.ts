import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableActivityInformation1626324230399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'information_activity',
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
                        name: 'activity_id',
                        type: 'integer'
                    },
                    {
                        name: 'responsible',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'creation_date',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'deadline',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description_img',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'progress',
                        type: 'numeric',
                        default: 0,
                    },
                    {
                        name: 'result',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'result_img',
                        type: 'varchar',
                        isNullable: true,
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'information_activity',
            new TableForeignKey({
                name: 'information_activity_FK_construction_config',
                columnNames: ['construction_id'],
                referencedTableName: 'construction_config',
                referencedColumnNames: ['id']
            })
        )

        await queryRunner.createForeignKey(
            'information_activity',
            new TableForeignKey({
                name: 'information_activity_FK_activity',
                columnNames: ['activity_id'],
                referencedTableName: 'activity',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('information_activity', 'information_activity_FK_construction_config');
        await queryRunner.dropForeignKey('information_activity', 'information_activity_FK_activity');
        await queryRunner.dropTable('information_activity');
    }

}
