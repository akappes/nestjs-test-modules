import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateUserTable1595358085805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'client_id',
                        type: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createIndex('users', new TableIndex({
            name: "users_client_id_index",
            columnNames: ["client_id"]
        }));

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["client_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "clients",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("client_id") !== -1);
        await queryRunner.dropForeignKey('users', foreignKey);
        await queryRunner.dropColumn('users', "client_id");
        await queryRunner.dropIndex('users', "users_client_id_index");
        await queryRunner.dropTable('users');
    }

}
