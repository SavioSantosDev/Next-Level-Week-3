import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class orphanage1603567734097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true, // Chave única de cada usuário
                    isGenerated: true,
                    generationStrategy: 'increment',    // Vai ser gerada automaticamente com autoincrement
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfazer o que fizemos no método up
        await queryRunner.dropTable('orphanages');
    }

}
