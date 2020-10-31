import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class orphanageVisits1603567767212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orphanages_visits',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'instructions',
                    type: 'text',
                },
                {
                    name: 'openning_hours',
                    type: 'varchar',
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'orphanage_visits',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages_visits');
    }

}
